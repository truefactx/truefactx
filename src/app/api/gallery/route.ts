import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    
    // Ensure directory exists
    try {
      await fs.access(galleryDir);
    } catch {
      await fs.mkdir(galleryDir, { recursive: true });
    }

    const files = await fs.readdir(galleryDir);
    
    // Filter to only images/videos (ignore hidden files like .DS_Store)
    const validFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|mp4|webm|mov)$/i)
    );

    // Return descending (newest first based on file modified time)
    const fileStats = await Promise.all(
      validFiles.map(async (file) => {
        const stats = await fs.stat(path.join(galleryDir, file));
        return {
          filename: file,
          url: `/gallery/${file}`,
          type: file.match(/\.(mp4|webm|mov)$/i) ? 'video' : 'image',
          mtime: stats.mtime.getTime()
        };
      })
    );

    fileStats.sort((a, b) => b.mtime - a.mtime);

    return NextResponse.json({ files: fileStats });
  } catch (error: any) {
    console.error("Gallery GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    
    // Ensure directory exists
    try {
      await fs.access(galleryDir);
    } catch {
      await fs.mkdir(galleryDir, { recursive: true });
    }

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeFilename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    await fs.writeFile(path.join(galleryDir, safeFilename), buffer);

    return NextResponse.json({ success: true, url: `/gallery/${safeFilename}` });

  } catch (error: any) {
    console.error("Gallery POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
