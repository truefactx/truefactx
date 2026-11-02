import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || '';
    const serviceCategory = (formData.get('service_category') as string) || 'custom_production';
    const type = (formData.get('type') as string) || '';
    const applicationMethod = (formData.get('application_method') as string) || '';
    const projectType = (formData.get('project_type') as string) || '';
    const formatNeeded = (formData.get('format_needed') as string) || '';
    const dimensions = (formData.get('dimensions') as string) || '';
    const targetMaterial = (formData.get('target_material') as string) || '';
    const urgency = (formData.get('urgency') as string) || 'standard';
    const details = formData.get('details') as string;
    const file = formData.get('design_file') as File | null;

    let filename = null;

    if (file && file.size > 0) {
      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      // Save file
      const buffer = Buffer.from(await file.arrayBuffer());
      filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      await fs.writeFile(path.join(uploadDir, filename), buffer);
    }

    // Save order data to JSON
    const dataDir = path.join(process.cwd(), 'data');
    const ordersFile = path.join(dataDir, 'orders.json');
    
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    let orders = [];
    try {
      const existingData = await fs.readFile(ordersFile, 'utf-8');
      orders = JSON.parse(existingData);
    } catch (e) {
      // File doesn't exist or is empty
    }

    const newOrder = {
      id: Date.now().toString(),
      serviceCategory, // 'custom_production' | 'graphic_design' | 'digitizing'
      name,
      email,
      phone,
      type: type || projectType || 'General Request',
      applicationMethod: applicationMethod || formatNeeded || 'N/A',
      projectType,
      formatNeeded,
      dimensions,
      targetMaterial,
      urgency,
      details,
      file: filename ? `/uploads/${filename}` : null,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));

    return NextResponse.json({ success: true, orderId: newOrder.id });

  } catch (error: any) {
    console.error("Custom Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
