import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Package, Calendar, Download, Palette, Cpu, Scissors, Phone, Mail, Home } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Prevent static caching of orders

export default async function AdminOrdersPage() {
  const dataDir = path.join(process.cwd(), 'data');
  const ordersFile = path.join(dataDir, 'orders.json');
  
  let orders: any[] = [];
  try {
    const existingData = await fs.readFile(ordersFile, 'utf-8');
    orders = JSON.parse(existingData);
    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    // File doesn't exist yet, orders is empty array
  }

  const getServiceBadge = (category: string) => {
    switch (category) {
      case 'graphic_design':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-200 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Palette className="w-3.5 h-3.5 text-amber-700" /> Graphic Design
          </span>
        );
      case 'digitizing':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-emerald-700" /> Digitizing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
            <Scissors className="w-3.5 h-3.5 text-zinc-700" /> Custom Apparel
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-black p-6 md:p-14">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-black text-white hover:bg-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Home className="w-3.5 h-3.5" /> Back to Home
              </Link>
              <Link
                href="/admin/gallery"
                className="inline-flex items-center gap-1.5 bg-zinc-200/80 hover:bg-zinc-300 text-zinc-800 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Gallery Admin
              </Link>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Quotes & Service Requests</h1>
            <p className="text-zinc-500 font-medium text-sm">
              Manage incoming Custom Apparel, Graphic Design, and Embroidery Digitizing orders.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-black text-white px-4 py-2 rounded-xl font-bold text-sm">
              {orders.length} Total Requests
            </span>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-zinc-200 shadow-sm">
            <Package className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Requests Yet</h2>
            <p className="text-zinc-500 max-w-sm mx-auto text-sm">
              When customers submit quotes for Custom Apparel, Graphic Design, or Digitizing, they will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => {
              const isImage = order.file && (
                order.file.endsWith('.png') ||
                order.file.endsWith('.jpg') ||
                order.file.endsWith('.jpeg') ||
                order.file.endsWith('.webp') ||
                order.file.endsWith('.svg')
              );

              return (
                <div key={order.id} className="bg-white border border-zinc-200 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-8">
                  {/* Order Meta */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {getServiceBadge(order.serviceCategory)}
                      <span className="bg-green-100 text-green-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                        {order.status || 'Pending'}
                      </span>
                      <span className="text-zinc-400 text-xs font-medium flex items-center gap-1 ml-auto">
                        <Calendar className="w-3.5 h-3.5" /> 
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-zinc-900 mb-1">{order.name}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 mb-6">
                      <a href={`mailto:${order.email}`} className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" /> {order.email}
                      </a>
                      {order.phone && (
                        <span className="flex items-center gap-1 font-medium text-zinc-700">
                          <Phone className="w-3.5 h-3.5 text-zinc-400" /> {order.phone}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 text-xs">
                      <div>
                        <p className="font-bold uppercase tracking-wider text-zinc-400 mb-1">Type / Style</p>
                        <p className="font-bold text-zinc-800">{order.type || order.projectType || 'Standard'}</p>
                      </div>
                      <div>
                        <p className="font-bold uppercase tracking-wider text-zinc-400 mb-1">Method / Format</p>
                        <p className="font-bold text-zinc-800">{order.applicationMethod || order.formatNeeded || 'N/A'}</p>
                      </div>
                      {order.dimensions && (
                        <div>
                          <p className="font-bold uppercase tracking-wider text-zinc-400 mb-1">Dimensions</p>
                          <p className="font-bold text-zinc-800">{order.dimensions}</p>
                        </div>
                      )}
                      {order.targetMaterial && (
                        <div>
                          <p className="font-bold uppercase tracking-wider text-zinc-400 mb-1">Fabric / Material</p>
                          <p className="font-bold text-zinc-800">{order.targetMaterial}</p>
                        </div>
                      )}
                      {order.urgency && (
                        <div>
                          <p className="font-bold uppercase tracking-wider text-zinc-400 mb-1">Turnaround</p>
                          <p className="font-bold text-zinc-800 capitalize">{order.urgency.replace(/_/g, ' ')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details, Uploaded Image & File Download */}
                  <div className="flex-1 bg-zinc-50 p-6 rounded-2xl border border-zinc-100 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Instructions & Notes</p>
                      <p className="text-zinc-700 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                        {order.details || 'No additional notes provided.'}
                      </p>
                    </div>

                    {order.file && (
                      <div className="border-t border-zinc-200/80 pt-4 mt-2">
                        {isImage && (
                          <div className="mb-4">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Attached Preview</p>
                            <div className="w-28 h-28 rounded-xl overflow-hidden border border-zinc-200 bg-white p-1">
                              <img src={order.file} alt="Design attachment" className="w-full h-full object-contain" />
                            </div>
                          </div>
                        )}
                        <a 
                          href={order.file} 
                          download
                          target="_blank"
                          className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:border-black transition-colors"
                        >
                          <Download className="w-4 h-4" /> Download Customer File
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
