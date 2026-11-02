import os
import sys
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import imageio.v3 as iio
import imageio_ffmpeg

def make_vignette(width, height):
    y, x = np.ogrid[:height, :width]
    cx, cy = width / 2.0, height / 2.0
    dist = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
    vignette = np.clip(1.0 - (dist - 0.5) / 0.8, 0.0, 1.0)
    vignette = np.sin(vignette * math.pi / 2.0) ** 1.5
    vignette = 0.35 + 0.65 * vignette
    return vignette[:, :, np.newaxis].astype(np.float32)

def crop_and_zoom(img_pil, target_w, target_h, zoom, pan_x=0.0, pan_y=0.0):
    orig_w, orig_h = img_pil.size
    aspect = target_w / target_h

    if orig_w / orig_h > aspect:
        crop_h = orig_h
        crop_w = int(orig_h * aspect)
    else:
        crop_w = orig_w
        crop_h = int(orig_w / aspect)

    zw = crop_w / zoom
    zh = crop_h / zoom

    max_offset_x = (orig_w - zw) / 2.0
    max_offset_y = (orig_h - zh) / 2.0

    cx = orig_w / 2.0 + pan_x * max_offset_x * 0.7
    cy = orig_h / 2.0 + pan_y * max_offset_y * 0.7

    left = max(0, cx - zw / 2.0)
    top = max(0, cy - zh / 2.0)
    right = min(orig_w, left + zw)
    bottom = min(orig_h, top + zh)

    if right - left < zw:
        left = max(0, right - zw)
    if bottom - top < zh:
        top = max(0, bottom - zh)

    cropped = img_pil.crop((int(left), int(top), int(right), int(bottom)))
    return cropped.resize((target_w, target_h), Image.Resampling.BILINEAR)

def add_hud_stamp(frame_pil, text, subtext="", frame_num=0):
    draw = ImageDraw.Draw(frame_pil)
    w, h = frame_pil.size
    
    # Corner technical markers
    draw.line([(30, 30), (50, 30)], fill=(255, 255, 255), width=2)
    draw.line([(30, 30), (30, 50)], fill=(255, 255, 255), width=2)

    draw.line([(w - 30, 30), (w - 50, 30)], fill=(255, 255, 255), width=2)
    draw.line([(w - 30, 30), (w - 30, 50)], fill=(255, 255, 255), width=2)

    draw.line([(30, h - 30), (50, h - 30)], fill=(255, 255, 255), width=2)
    draw.line([(30, h - 30), (30, h - 50)], fill=(255, 255, 255), width=2)

    draw.line([(w - 30, h - 30), (w - 50, h - 30)], fill=(255, 255, 255), width=2)
    draw.line([(w - 30, h - 30), (w - 30, h - 50)], fill=(255, 255, 255), width=2)

    # Timecode & REC indicator in top right
    rec_pulse = int(127 + 127 * math.sin(frame_num * 0.2))
    draw.ellipse([(w - 180, 42), (w - 170, 52)], fill=(255, 50, 50, rec_pulse))
    draw.text((w - 160, 40), "REC  •  4K RAW", fill=(255, 255, 255))
    
    # Top left brand stamp
    draw.text((55, 40), "PANDGAEA NYC  //  LIVE PRODUCTION ARCHIVE", fill=(220, 220, 220))

    # Bottom main label
    if text:
        draw.text((50, h - 80), text, fill=(255, 255, 255))
    if subtext:
        draw.text((50, h - 60), subtext, fill=(180, 180, 180))

    return frame_pil

def smooth_step(edge0, edge1, x):
    t = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return 0.5 - 0.5 * math.cos(t * math.pi)

def composite_product_in_flight(bg_pil, prod_rgba, t_scene, enter_pt, exit_pt, base_dim=480, enter_rot=-20, exit_rot=15):
    # t_scene goes from 0.0 to 1.0 over the scene
    # Phase 1: Entrance (0.0 to 0.32)
    # Phase 2: Hover (0.32 to 0.78)
    # Phase 3: Exit (0.78 to 1.0)
    cx, cy = 640.0, 360.0

    if t_scene < 0.32:
        t_enter = smooth_step(0.0, 0.32, t_scene)
        # Elastic overshoot on scale
        scale_overshoot = 1.0 + 0.12 * math.sin(t_enter * math.pi)
        scale = (0.28 + 0.72 * t_enter) * scale_overshoot
        cur_x = enter_pt[0] + (cx - enter_pt[0]) * t_enter
        cur_y = enter_pt[1] + (cy - enter_pt[1]) * t_enter
        cur_angle = enter_rot * (1.0 - t_enter)
        alpha_mult = min(1.0, t_scene * 4.0)

    elif t_scene < 0.78:
        t_hover = (t_scene - 0.32) / 0.46
        # Gentle floating bobbing physics
        scale = 1.0 + 0.025 * math.sin(t_hover * math.pi * 2.0)
        cur_x = cx + 8.0 * math.sin(t_hover * math.pi)
        cur_y = cy - 14.0 * math.sin(t_hover * math.pi)
        cur_angle = 3.0 * math.sin(t_hover * math.pi * 2.0)
        alpha_mult = 1.0

    else:
        t_exit = smooth_step(0.78, 1.0, t_scene)
        scale = 1.0 + 0.35 * t_exit
        cur_x = cx + (exit_pt[0] - cx) * t_exit
        cur_y = cy + (exit_pt[1] - cy) * t_exit
        cur_angle = exit_rot * t_exit
        alpha_mult = max(0.0, 1.0 - t_exit * 1.5)

    # Compute target size keeping aspect ratio
    p_w, p_h = prod_rgba.size
    aspect = p_w / float(p_h)
    if aspect >= 1.0:
        dw = int(base_dim * scale)
        dh = int((base_dim / aspect) * scale)
    else:
        dh = int(base_dim * scale)
        dw = int((base_dim * aspect) * scale)

    if dw <= 4 or dh <= 4 or alpha_mult <= 0.01:
        return bg_pil

    resized = prod_rgba.resize((dw, dh), Image.Resampling.LANCZOS)
    if abs(cur_angle) > 0.1:
        resized = resized.rotate(cur_angle, resample=Image.Resampling.BILINEAR, expand=True)

    # Apply alpha multiplier
    if alpha_mult < 0.99:
        r_arr = np.array(resized, dtype=np.float32)
        r_arr[:, :, 3] *= alpha_mult
        resized = Image.fromarray(r_arr.astype(np.uint8), mode="RGBA")

    # Render ambient 3D soft floor/backdrop shadow
    shadow_w = resized.width
    shadow_h = resized.height
    shadow_alpha = int(140 * alpha_mult)
    shadow = Image.new("RGBA", (shadow_w, shadow_h), (0, 0, 0, shadow_alpha))
    shadow.putalpha(resized.split()[3])
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))

    px = int(cur_x - resized.width / 2)
    py = int(cur_y - resized.height / 2)

    # Paste shadow offset downwards
    shadow_offset_y = int(18 * scale)
    bg_pil.paste(shadow, (px, py + shadow_offset_y), mask=shadow)
    bg_pil.paste(resized, (px, py), mask=resized)
    return bg_pil

def render_freestyle_video():
    width = 1280
    height = 720
    fps = 24
    total_frames = 480  # Exactly 20.0 seconds

    out_file = os.path.abspath("pandgaea-v2/public/images/pandgaea_hero_freestyle.mp4")
    print(f"Target: {out_file} (20s @ 24fps = {total_frames} frames)")

    # 1. Load source assets
    print("Loading media assets...")
    logo_video_path = "pandgaea-v2/public/images/Panda_Yin_Yang_Logo_Hatching_Video.mp4"
    logo_frames = iio.imread(logo_video_path, index=None)

    img_design = Image.open("pandgaea-v2/public/images/bg_graphic_design.jpg").convert("RGB")
    img_digitizing = Image.open("pandgaea-v2/public/images/bg_digitizing.jpg").convert("RGB")
    img_laser = Image.open("pandgaea-v2/public/images/macro_laser_patch.jpg").convert("RGB")

    # Transparent products for flying sequence
    prod_hoodie = Image.open("pandgaea-v2/public/images/transparent_black hoodie white vinyl logo.png").convert("RGBA")
    prod_tee = Image.open("pandgaea-v2/public/images/transparent_white tee black logo..png").convert("RGBA")
    prod_hat = Image.open("pandgaea-v2/public/images/transparent_black dad hat.png").convert("RGBA")
    prod_patch = Image.open("pandgaea-v2/public/images/transparent_patch.png").convert("RGBA")

    # High-res transparent logo for finale reveal
    logo_trans_raw = Image.open("pandgaea-v2/public/images/new_logo_transparent.png").convert("RGBA")

    vignette = make_vignette(width, height)

    # Fonts for TRUEFACTX finale
    font_truefactx = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 54)
    font_subtext = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 15)

    # 2. Setup FFmpeg encoding pipe
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg_exe, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{width}x{height}',
        '-pix_fmt', 'rgb24',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'faster',
        '-crf', '19',
        '-movflags', '+faststart',
        out_file
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    # Sequence Breakdown (total 480 frames = 20.0s):
    # Scene 0 (0-45): Logo Hatching Intro (1.9s)
    # Scene 1 (45-90): Graphic Design Lab (1.9s)
    # Scene 2 (90-135): 3D Puff Embroidery Digitizing (1.9s)
    # Scene 3 (135-180): Laser Patch Sealing (1.9s)
    # Scene 4 (180-225): Product 1 Flying - Black Hoodie (1.9s)
    # Scene 5 (225-270): Product 2 Flying - White Yin-Yang Tee (1.9s)
    # Scene 6 (270-315): Product 3 Flying - Black Dad Hat (1.9s)
    # Scene 7 (315-360): Product 4 Flying - Chenille Patch (1.9s)
    # Scene 8 (360-480): FINALE: LOGO & TRUEFACTX FADE-IN & GLOW (5.0s)
    scenes = [
        {"name": "logo", "start": 0, "end": 45, "text": "01 // PANDGAEA EMBLEM", "sub": "YIN-YANG ARCHITECTURE • ORIGIN"},
        {"name": "design", "start": 45, "end": 90, "text": "02 // CREATIVE DESIGN LAB", "sub": "VECTOR PROOFS • BEZIER DRAFTING • PANTONE"},
        {"name": "digitizing", "start": 90, "end": 135, "text": "03 // PRECISION DIGITIZING", "sub": "3D PUFF STITCH • COMMERCIAL MULTI-NEEDLE"},
        {"name": "laser", "start": 135, "end": 180, "text": "04 // LASER CRAFTED PATCHES", "sub": "THERMAL MERROW SEALING • HIGH DENSITY TWILL"},
        {"name": "prod_hoodie", "start": 180, "end": 225, "text": "05 // ATELIER APPAREL IN MOTION", "sub": "450GSM HEAVYWEIGHT HOODIE • WHITE VINYL CREST"},
        {"name": "prod_tee", "start": 225, "end": 270, "text": "06 // ATELIER APPAREL IN MOTION", "sub": "280GSM VINTAGE DROP TEE • HIGH DENSITY LOGO"},
        {"name": "prod_hat", "start": 270, "end": 315, "text": "07 // ATELIER APPAREL IN MOTION", "sub": "6-PANEL STRUCTURED DAD HAT • CURVED BRIM & EYELETS"},
        {"name": "prod_patch", "start": 315, "end": 360, "text": "08 // ATELIER APPAREL IN MOTION", "sub": "CUSTOM MERROWED CHENILLE EMBLEM • HIGH STITCH COUNT"},
        {"name": "finale", "start": 360, "end": 480, "text": "", "sub": ""}
    ]

    def make_atelier_studio_bg(pulse_val=1.0):
        y, x = np.ogrid[:height, :width]
        dist = np.sqrt(((x - width / 2.0) / (width / 2.0)) ** 2 + ((y - height / 2.0) / (height / 2.0)) ** 2)
        glow = np.clip(1.0 - dist * 0.88, 0.0, 1.0) ** 2.2
        glow_arr = np.zeros((height, width, 3), dtype=np.float32)
        glow_arr[:, :, 0] = glow * 28 * pulse_val
        glow_arr[:, :, 1] = glow * 22 * pulse_val
        glow_arr[:, :, 2] = glow * 14 * pulse_val
        base_bg = np.ones((height, width, 3), dtype=np.float32) * 8.0
        return Image.fromarray(np.clip(base_bg + glow_arr, 0, 255).astype(np.uint8))

    def get_scene_frame(scene_idx, t_scene, f_global):
        if scene_idx == 0:
            vid_idx = int(t_scene * 85) % len(logo_frames)
            raw_frame = Image.fromarray(logo_frames[vid_idx])
            zoom = 1.0 + 0.16 * t_scene
            frame = crop_and_zoom(raw_frame, width, height, zoom, pan_x=0.0, pan_y=0.0)
            enhancer = ImageEnhance.Contrast(frame)
            return enhancer.enhance(1.2)

        elif scene_idx == 1:
            zoom = 1.1 + 0.12 * math.sin(t_scene * math.pi)
            pan_x = -0.15 + 0.3 * t_scene
            pan_y = 0.04 * math.cos(t_scene * math.pi)
            return crop_and_zoom(img_design, width, height, zoom, pan_x, pan_y)

        elif scene_idx == 2:
            zoom = 1.05 + 0.22 * t_scene
            pan_x = 0.08 * (1.0 - t_scene)
            pan_y = -0.05 * t_scene
            return crop_and_zoom(img_digitizing, width, height, zoom, pan_x, pan_y)

        elif scene_idx == 3:
            zoom = 1.02 + 0.15 * t_scene
            pan_x = 0.1 - 0.2 * t_scene
            pan_y = 0.02 * math.sin(t_scene * math.pi)
            return crop_and_zoom(img_laser, width, height, zoom, pan_x, pan_y)

        elif scene_idx == 4:
            # FLYING PRODUCT 1: Hoodie flies in from top-left, hovers, swoops down-right
            bg = make_atelier_studio_bg(1.0 + 0.05 * math.sin(t_scene * math.pi))
            enter_pt = (-350, -180)
            exit_pt = (1500, 750)
            return composite_product_in_flight(bg, prod_hoodie, t_scene, enter_pt, exit_pt, base_dim=470, enter_rot=-24, exit_rot=16)

        elif scene_idx == 5:
            # FLYING PRODUCT 2: White Tee flies in from bottom-right, hovers, swoops up-left
            bg = make_atelier_studio_bg(1.0 + 0.05 * math.sin(t_scene * math.pi))
            enter_pt = (1550, 800)
            exit_pt = (-300, -150)
            return composite_product_in_flight(bg, prod_tee, t_scene, enter_pt, exit_pt, base_dim=480, enter_rot=22, exit_rot=-16)

        elif scene_idx == 6:
            # FLYING PRODUCT 3: Dad Hat flies in from top-center, hovers, swoops right
            bg = make_atelier_studio_bg(1.0 + 0.05 * math.sin(t_scene * math.pi))
            enter_pt = (640, -380)
            exit_pt = (1650, 360)
            return composite_product_in_flight(bg, prod_hat, t_scene, enter_pt, exit_pt, base_dim=430, enter_rot=-18, exit_rot=20)

        elif scene_idx == 7:
            # FLYING PRODUCT 4: Chenille Patch flies in from bottom-center, zooms into focus, hovers
            bg = make_atelier_studio_bg(1.0 + 0.05 * math.sin(t_scene * math.pi))
            enter_pt = (640, 950)
            exit_pt = (640, -400)
            return composite_product_in_flight(bg, prod_patch, t_scene, enter_pt, exit_pt, base_dim=420, enter_rot=25, exit_rot=-12)

        elif scene_idx == 8:
            # FINALE: Cinematic dark ambient background with warm radial golden aura
            y, x = np.ogrid[:height, :width]
            dist = np.sqrt(((x - width / 2.0) / (width / 2.0)) ** 2 + ((y - height / 2.0) / (height / 2.0)) ** 2)
            glow = np.clip(1.0 - dist * 0.85, 0.0, 1.0) ** 2.2
            
            # Subtle breathing pulse on the aura
            pulse = 1.0 + 0.08 * math.sin(t_scene * math.pi * 3.0)
            
            glow_arr = np.zeros((height, width, 3), dtype=np.float32)
            glow_arr[:, :, 0] = glow * 45 * pulse  # Warm amber/gold
            glow_arr[:, :, 1] = glow * 35 * pulse
            glow_arr[:, :, 2] = glow * 18 * pulse
            
            base_bg = np.ones((height, width, 3), dtype=np.float32) * 8.0 # deep studio black
            frame_arr = np.clip(base_bg + glow_arr, 0, 255).astype(np.uint8)
            frame_pil = Image.fromarray(frame_arr)

            # Fade In Timings within Finale (local frames: 0 to 120)
            local_frame = f_global - 360
            
            # 1. Logo Fade-in: from local_frame 10 to 45
            logo_alpha = smooth_step(10, 45, local_frame)
            logo_scale = 0.88 + 0.12 * smooth_step(10, 65, local_frame)
            
            if logo_alpha > 0.001:
                cur_logo_size = int(220 * logo_scale)
                scaled_logo = logo_trans_raw.resize((cur_logo_size, cur_logo_size), Image.Resampling.LANCZOS)
                
                # Apply alpha
                scaled_arr = np.array(scaled_logo, dtype=np.float32)
                scaled_arr[:, :, 3] *= logo_alpha
                scaled_logo = Image.fromarray(scaled_arr.astype(np.uint8), mode="RGBA")
                
                logo_x = int((width - cur_logo_size) / 2)
                logo_y = int(height / 2 - cur_logo_size / 2 - 45)
                frame_pil.paste(scaled_logo, (logo_x, logo_y), scaled_logo)

            # 2. "TRUEFACTX" Word Fade-in: from local_frame 30 to 70
            text_alpha = smooth_step(30, 70, local_frame)
            if text_alpha > 0.001:
                text_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
                draw_text = ImageDraw.Draw(text_layer)
                
                text_str = "T R U E F A C T X"
                bbox = draw_text.textbbox((0, 0), text_str, font=font_truefactx)
                tw = bbox[2] - bbox[0]
                tx = int((width - tw) / 2)
                ty = int(height / 2 + 80)
                
                # Subtle glowing drop shadow for luxury feel
                shadow_color = (255, 180, 50, int(60 * text_alpha))
                draw_text.text((tx, ty + 2), text_str, fill=shadow_color, font=font_truefactx)
                
                # Main text
                main_color = (255, 255, 255, int(255 * text_alpha))
                draw_text.text((tx, ty), text_str, fill=main_color, font=font_truefactx)
                
                # Subtitle: from local_frame 50 to 85
                sub_alpha = smooth_step(50, 85, local_frame)
                if sub_alpha > 0.001:
                    sub_str = "NEW YORK ATELIER  •  LIVE WORKSHOP PRODUCTION"
                    sbbox = draw_text.textbbox((0, 0), sub_str, font=font_subtext)
                    sw = sbbox[2] - sbbox[0]
                    sx = int((width - sw) / 2)
                    draw_text.text((sx, ty + 68), sub_str, fill=(180, 180, 180, int(220 * sub_alpha)), font=font_subtext)

                # Light glint sweep across text from local_frame 70 to 110
                if 70 <= local_frame <= 110:
                    glint_t = (local_frame - 70) / 40.0
                    glint_x = int(tx - 50 + (tw + 100) * glint_t)
                    draw_text.line([(glint_x, ty - 10), (glint_x + 30, ty + 90)], fill=(255, 255, 255, int(80 * (1.0 - abs(glint_t - 0.5) * 2))), width=4)

                frame_pil = Image.alpha_composite(frame_pil.convert("RGBA"), text_layer).convert("RGB")

            return frame_pil

        return Image.new("RGB", (width, height), (0, 0, 0))

    print("Synthesizing frames with flying products and TRUEFACTX finale...")
    np.random.seed(42)

    for f in range(total_frames):
        # Determine current scene
        scene_idx = 0
        for i, sc in enumerate(scenes):
            if sc["start"] <= f < sc["end"]:
                scene_idx = i
                break
        cur_scene = scenes[scene_idx]
        local_f = f - cur_scene["start"]
        t_scene = local_f / float(cur_scene["end"] - cur_scene["start"])

        # Base frame for current scene
        img_cur = get_scene_frame(scene_idx, t_scene, f)

        # Transition handling (Cross-dissolve over 8 frames between scenes)
        trans_len = 8
        if local_f < trans_len and scene_idx > 0:
            prev_scene = scenes[scene_idx - 1]
            prev_local_f = (cur_scene["start"] - 1 - prev_scene["start"]) + (local_f / trans_len)
            prev_t = min(1.0, prev_local_f / float(prev_scene["end"] - prev_scene["start"]))
            img_prev = get_scene_frame(scene_idx - 1, prev_t, f)
            
            blend_alpha = local_f / float(trans_len)
            img_cur = Image.blend(img_prev, img_cur, blend_alpha)

            # Flash burst on cut point (only before finale)
            if scene_idx < 8:
                flash_intensity = max(0.0, 1.0 - (local_f / 3.0)) * 0.25
                if flash_intensity > 0:
                    flash_arr = np.ones((height, width, 3), dtype=np.float32) * (flash_intensity * 255)
                    cur_arr = np.array(img_cur, dtype=np.float32)
                    cur_arr = np.clip(cur_arr + flash_arr, 0, 255).astype(np.uint8)
                    img_cur = Image.fromarray(cur_arr)

        # Seamless loop cross-dissolve: end of Finale dissolves back into Scene 0
        loop_trans = 16
        if f >= (total_frames - loop_trans):
            loop_blend = (f - (total_frames - loop_trans)) / float(loop_trans)
            img_start = get_scene_frame(0, loop_blend * (loop_trans / 45.0), 0)
            img_cur = Image.blend(img_cur, img_start, loop_blend)

        # Apply technical HUD overlays (scenes 0 to 7)
        if scene_idx < 8:
            img_cur = add_hud_stamp(img_cur, cur_scene["text"], cur_scene["sub"], f)

        # Post-processing: Vignette + film grain
        arr = np.array(img_cur, dtype=np.float32)
        arr *= vignette

        # 35mm moving procedural film grain
        grain = np.random.normal(0, 5.5, (height, width, 1)).astype(np.float32)
        arr = np.clip(arr + grain, 0, 255).astype(np.uint8)

        # Write frame to ffmpeg
        proc.stdin.write(arr.tobytes())

        if f % 48 == 0 or f == total_frames - 1:
            pct = int((f / total_frames) * 100)
            print(f"Render progress: {f}/{total_frames} frames ({pct}%)")

    proc.stdin.close()
    proc.wait()
    print("Video encoding complete!")
    print(f"Output saved to: {out_file}")

if __name__ == "__main__":
    render_freestyle_video()
