"use client";

import { Video } from "lucide-react";
import { useState } from "react";

export default function LiveStream() {
  const [isLive, setIsLive] = useState(false); // Toggle to true when actually streaming

  if (!isLive) {
    return (
      <div className="w-full aspect-video bg-zinc-900 flex flex-col items-center justify-center p-6 text-center border-2 border-zinc-800">
        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
          <Video className="w-8 h-8 text-zinc-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Workshop is Offline</h3>
        <p className="text-zinc-500 text-sm max-w-sm">
          We are currently off-camera. Check our Instagram for the next live production schedule.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black relative">
      {/* Replace this div with an actual Twitch or YouTube iframe when ready */}
      <div className="absolute inset-0 flex items-center justify-center border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <p className="text-red-500 font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Live Stream Connected
        </p>
      </div>
    </div>
  );
}
