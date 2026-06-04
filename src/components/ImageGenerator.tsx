'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Share2 } from 'lucide-react';
import { fredokaOne } from '@/lib/fonts';

// Exact colors from canva.json palette
const BLUE   = '#1D3B95';
const RED    = '#C4151C';
const PURPLE = '#7A2681';
const GOLD   = '#E5A922';

// 4-pointed sparkle stars — positions as % of canvas W/H, size as % of W
const SPARKLES = [
  { x: 0.770, y: 0.055, s: 0.022, c: RED,    r: 0   },
  { x: 0.618, y: 0.023, s: 0.013, c: RED,    r: 0.3 },
  { x: 0.090, y: 0.237, s: 0.019, c: BLUE,   r: 0   },
  { x: 0.882, y: 0.315, s: 0.015, c: BLUE,   r: 0.2 },
  { x: 0.055, y: 0.348, s: 0.013, c: PURPLE, r: 0   },
  { x: 0.882, y: 0.455, s: 0.016, c: RED,    r: 0.1 },
  { x: 0.080, y: 0.470, s: 0.014, c: GOLD,   r: 0.2 },
];

export default function ImageGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [canDownload, setCanDownload] = useState(false);
  const templateImg = useRef<HTMLImageElement | null>(null);

  const drawCanvas = useCallback((customName: string) => {
    const canvas = canvasRef.current;
    const img = templateImg.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = img.naturalWidth;
    const H = img.naturalHeight;
    canvas.width = W;
    canvas.height = H;

    // ── 1. White background ──────────────────────────────────────────────────
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    // ── 2. Original image — only the bottom section (hand + POR LA VIDA) ────
    // SPLIT: where we start drawing the original image (hand + POR LA VIDA).
    // Lower = hand appears higher on the canvas.
    const SPLIT = Math.floor(H * 0.46);
    ctx.drawImage(img, 0, SPLIT, W, H - SPLIT, 0, SPLIT, W, H - SPLIT);

    // ── 3. Sparkle decorations (upper section) ───────────────────────────────
    for (const sp of SPARKLES) {
      drawStar(ctx, W * sp.x, H * sp.y, W * sp.s, sp.c, sp.r);
    }

    // ── 4. Text section ──────────────────────────────────────────────────────
    const fontFamily = fredokaOne.style.fontFamily;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // "SOY"
    ctx.fillStyle = BLUE;
    ctx.font = `400 ${Math.floor(H * 0.078)}px ${fontFamily}, 'Lilita One', cursive`;
    ctx.fillText('SOY', W / 2, H * 0.078);

    // NAME (custom) or placeholder
    const displayName = customName.trim().toUpperCase();
    if (displayName) {
      let fontSize = Math.floor(H * 0.125);
      let tw: number;
      do {
        ctx.font = `400 ${fontSize}px ${fontFamily}, 'Lilita One', cursive`;
        tw = ctx.measureText(displayName).width;
        if (tw > W * 0.84) fontSize -= 3;
      } while (tw > W * 0.84 && fontSize > 40);
      ctx.fillStyle = BLUE;
      ctx.fillText(displayName, W / 2, H * 0.205);
    } else {
      ctx.font = `400 ${Math.floor(H * 0.048)}px ${fontFamily}, 'Lilita One', cursive`;
      ctx.fillStyle = '#B0BEC5';
      ctx.fillText('TU NOMBRE', W / 2, H * 0.205);
    }

    // "Y ME LA"
    ctx.fillStyle = BLUE;
    ctx.font = `400 ${Math.floor(H * 0.058)}px ${fontFamily}, 'Lilita One', cursive`;
    ctx.fillText('Y ME LA', W / 2, H * 0.305);

    // "JUEGO"
    ctx.font = `400 ${Math.floor(H * 0.112)}px ${fontFamily}, 'Lilita One', cursive`;
    ctx.fillText('JUEGO', W / 2, H * 0.400);

    setCanDownload(!!displayName);
  }, []);

  // Load template image + fonts on mount
  useEffect(() => {
    const img = new Image();
    img.src = '/01-plantilla.jpg';
    img.onload = async () => {
      try {
        await document.fonts.load(`400 100px ${fredokaOne.style.fontFamily}`);
      } catch {
        // Continue with system fallback
      }
      templateImg.current = img;
      setIsLoading(false);
      drawCanvas('');
    };
    img.onerror = () => setIsLoading(false);
  }, [drawCanvas]);

  // Re-render on every name change (debounced)
  useEffect(() => {
    if (isLoading) return;
    const t = setTimeout(() => drawCanvas(name), 120);
    return () => clearTimeout(t);
  }, [name, isLoading, drawCanvas]);

  const handleDownloadOrShare = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canDownload) return;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const safeName = name.trim().toLowerCase().replace(/\s+/g, '-') || 'mi';
        const fileName = `soy-${safeName}-me-la-juego.jpg`;
        const file = new File([blob], fileName, { type: 'image/jpeg' });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          navigator
            .share({
              files: [file],
              title: `Soy ${name.trim()} y me la juego`,
              text: `Soy ${name.trim()} y me la juego por la vida con Iván 💙`,
            })
            .catch(() => fallbackDownload(blob, fileName));
        } else {
          fallbackDownload(blob, fileName);
        }
      },
      'image/jpeg',
      0.95,
    );
  }, [canDownload, name]);

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Name input */}
      <div className="w-full">
        <label htmlFor="nombre-input" className="block text-base font-semibold text-gray-700 mb-2">
          Escribe tu nombre:
        </label>
        <div className="flex gap-2">
          <input
            id="nombre-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre aquí..."
            className="flex-1 px-4 py-3 text-xl border-2 border-blue-200 rounded-xl focus:outline-none focus:border-[#1B3DAE] text-center font-bold uppercase tracking-widest bg-white"
            maxLength={15}
            autoComplete="off"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
          />
          {name && (
            <button
              onClick={() => setName('')}
              className="p-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
              aria-label="Borrar nombre"
            >
              <RotateCcw size={22} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Canvas preview */}
      <div className="w-full rounded-2xl overflow-hidden shadow-xl relative bg-gray-100 aspect-square">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-10 h-10 border-4 border-[#1B3DAE] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-auto block" />
      </div>

      {/* Download / Share */}
      <button
        onClick={handleDownloadOrShare}
        disabled={!canDownload}
        className="w-full py-4 bg-[#1B3DAE] text-white text-xl font-bold rounded-2xl hover:bg-[#162d8a] active:bg-[#111f5c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
      >
        <Share2 size={22} />
        Descargar / Compartir
      </button>

      {!canDownload && !isLoading && (
        <p className="text-sm text-gray-400 text-center -mt-2">
          Escribe tu nombre para activar la descarga
        </p>
      )}
      {canDownload && (
        <p className="text-xs text-gray-400 text-center -mt-2">
          En móvil se abrirá el menú para compartir a WhatsApp, Instagram, etc.
        </p>
      )}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  rotation = 0,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? size : size * 0.22;
    if (i === 0) ctx.moveTo(r * Math.cos(angle), r * Math.sin(angle));
    else ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function fallbackDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } else {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
