'use client';

import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface AnnouncementBannerProps {
  message: string;
  active: boolean;
}

export default function AnnouncementBanner({ message, active }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(active);

  if (!isVisible || !message) return null;

  return (
    <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-blue-600 text-white px-4 py-2.5 text-sm font-medium shadow-md flex items-center justify-between">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-center flex-1 justify-center">
        <Sparkles className="w-4 h-4 text-amber-200 animate-spin flex-shrink-0" />
        <span>{message}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-black/10 transition"
        title="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
