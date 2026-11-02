export default function MarqueeBanner() {
  const content = (
    <div className="flex flex-row flex-nowrap items-center flex-shrink-0 px-6">
      <span>FREE SHIPPING OVER $75</span>
      <img src="/images/new_logo_transparent.png" alt="" className="w-3.5 h-3.5 mx-4 inline-block drop-shadow" />
      <span className="text-amber-400 font-extrabold">TRUEFACTX ATELIER NYC</span>
      <img src="/images/new_logo_transparent.png" alt="" className="w-3.5 h-3.5 mx-4 inline-block drop-shadow" />
      <span>WATCH YOUR ORDER CREATED LIVE ON TIKTOK & YOUTUBE</span>
      <img src="/images/new_logo_transparent.png" alt="" className="w-3.5 h-3.5 mx-4 inline-block drop-shadow" />
      <span>GRAPHIC DESIGN & MACHINE DIGITIZING</span>
      <img src="/images/new_logo_transparent.png" alt="" className="w-3.5 h-3.5 mx-4 inline-block drop-shadow" />
      <span>HEAVYWEIGHT 450GSM FLEECE & RAW DENIM</span>
      <img src="/images/new_logo_transparent.png" alt="" className="w-3.5 h-3.5 mx-4 inline-block drop-shadow" />
    </div>
  );

  return (
    <div className="w-full bg-black text-white h-10 overflow-hidden border-b border-zinc-800 relative z-[60] select-none flex items-center">
      <div className="flex flex-row flex-nowrap w-max animate-marquee text-xs md:text-sm font-black tracking-[0.25em] uppercase whitespace-nowrap items-center">
        {content}
        {content}
      </div>
    </div>
  );
}
