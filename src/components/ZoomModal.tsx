import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react';

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({ isOpen, onClose, imageUrl, title }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1.8);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#1E1916] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#171311]">
          <div>
            <h3 className="text-sm font-medium text-white/90 font-serif-luxury tracking-wide">
              {title} · Macro Craftsmanship Inspection
            </h3>
            <p className="text-xs text-[#A8988B]">
              Move cursor or drag across fabric to reveal hand-painted pigments, moti, and sitara.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1 text-white/80">
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.4))}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs px-2 tabular-nums font-mono text-white/70">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(3.5, z + 0.4))}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1.8);
                  setPosition({ x: 50, y: 50 });
                }}
                className="p-1.5 hover:bg-white/10 rounded transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div
          className="relative flex-1 overflow-hidden cursor-crosshair bg-[#0D0B09] flex items-center justify-center select-none"
          onMouseMove={handleMouseMove}
        >
          <div
            className="w-full h-full transition-transform duration-75 ease-out"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Helper hint badge */}
          <div className="absolute bottom-4 left-6 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white/75 border border-white/10">
            <Move className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Pan over the sheer tissue to inspect brushstrokes & sequins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
