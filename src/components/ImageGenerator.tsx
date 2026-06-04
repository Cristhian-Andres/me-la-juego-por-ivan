'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { fredokaOne } from '@/lib/fonts';

const TEMPLATES = [
  {
    src: '/01-plantilla.jpg',
    blue:   '#1D3B95',
    red:    '#C4151C',
    purple: '#7A2681',
    gold:   '#E5A922',
    sparkles: [
      { x: 0.770, y: 0.055, s: 0.022, c: '#C4151C', r: 0   },
      { x: 0.618, y: 0.023, s: 0.013, c: '#C4151C', r: 0.3 },
      { x: 0.090, y: 0.237, s: 0.019, c: '#1D3B95', r: 0   },
      { x: 0.882, y: 0.315, s: 0.015, c: '#1D3B95', r: 0.2 },
      { x: 0.055, y: 0.348, s: 0.013, c: '#7A2681', r: 0   },
      { x: 0.882, y: 0.455, s: 0.016, c: '#C4151C', r: 0.1 },
      { x: 0.080, y: 0.470, s: 0.014, c: '#E5A922', r: 0.2 },
    ],
    textColor: '#1D3B95',
  },
  {
    src: '/02-plantilla.png',
    blue:   '#1D3B95',
    red:    '#C4151C',
    purple: '#7A2681',
    gold:   '#E8A020',
    sparkles: [
      { x: 0.770, y: 0.055, s: 0.022, c: '#E8A020', r: 0   },
      { x: 0.618, y: 0.023, s: 0.013, c: '#E8A020', r: 0.3 },
      { x: 0.090, y: 0.237, s: 0.019, c: '#1D3B95', r: 0   },
      { x: 0.882, y: 0.315, s: 0.015, c: '#1D3B95', r: 0.2 },
      { x: 0.055, y: 0.348, s: 0.013, c: '#C4151C', r: 0   },
      { x: 0.882, y: 0.455, s: 0.016, c: '#E8A020', r: 0.1 },
      { x: 0.080, y: 0.470, s: 0.014, c: '#1D3B95', r: 0.2 },
    ],
    textColor: '#1D3B95',
  },
];

type Template = typeof TEMPLATES[number];

export default function ImageGenerator() {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [name, setName] = useState('');
  const [loadedImgs, setLoadedImgs] = useState<(HTMLImageElement | null)[]>([null, null]);
  const [active, setActive] = useState(0);
  const [canDownload, setCanDownload] = useState(false);

  // Load all template images on mount
  useEffect(() => {
    const imgs: (HTMLImageElement | null)[] = new Array(TEMPLATES.length).fill(null);
    let loaded = 0;

    TEMPLATES.forEach((t, i) => {
      const img = new Image();
      img.src = t.src;
      img.onload = async () => {
        try { await document.fonts.load(`400 100px ${fredokaOne.style.fontFamily}`); } catch { /* noop */ }
        imgs[i] = img;
        loaded++;
        if (loaded === TEMPLATES.length) setLoadedImgs([...imgs]);
      };
    });
  }, []);

  const drawCanvas = useCallback((customName: string, tplIndex: number, img: HTMLImageElement, tpl: Template) => {
    const canvas = canvasRefs.current[tplIndex];
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const MIN = 1080;
    const scale = Math.max(MIN / img.naturalWidth, MIN / img.naturalHeight, 1);
    const W = Math.round(img.naturalWidth  * scale);
    const H = Math.round(img.naturalHeight * scale);
    canvas.width  = W;
    canvas.height = H;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, W, H);

    const SPLIT    = Math.floor(H * 0.46);
    const srcSplit = Math.floor(img.naturalHeight * 0.46);
    ctx.drawImage(img, 0, srcSplit, img.naturalWidth, img.naturalHeight - srcSplit, 0, SPLIT, W, H - SPLIT);

    for (const sp of tpl.sparkles) drawStar(ctx, W * sp.x, H * sp.y, W * sp.s, sp.c, sp.r);

    const fontFamily = fredokaOne.style.fontFamily;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = tpl.textColor;
    ctx.font = `400 ${Math.floor(H * 0.078)}px ${fontFamily}, 'Chewy', cursive`;
    ctx.fillText('SOY', W / 2, H * 0.078);

    const displayName = customName.trim().toUpperCase();
    if (displayName) {
      let fontSize = Math.floor(H * 0.125);
      let tw: number;
      do {
        ctx.font = `400 ${fontSize}px ${fontFamily}, 'Chewy', cursive`;
        tw = ctx.measureText(displayName).width;
        if (tw > W * 0.84) fontSize -= 3;
      } while (tw > W * 0.84 && fontSize > 40);
      ctx.fillStyle = tpl.textColor;
      ctx.fillText(displayName, W / 2, H * 0.205);
    } else {
      ctx.font = `400 ${Math.floor(H * 0.048)}px ${fontFamily}, 'Chewy', cursive`;
      ctx.fillStyle = '#B0BEC5';
      ctx.fillText('TU NOMBRE', W / 2, H * 0.205);
    }

    ctx.fillStyle = tpl.textColor;
    ctx.font = `400 ${Math.floor(H * 0.058)}px ${fontFamily}, 'Chewy', cursive`;
    ctx.fillText('Y ME LA', W / 2, H * 0.305);

    ctx.font = `400 ${Math.floor(H * 0.112)}px ${fontFamily}, 'Chewy', cursive`;
    ctx.fillText('JUEGO', W / 2, H * 0.400);
  }, []);

  // Redraw all canvases when name or images change
  useEffect(() => {
    const allLoaded = loadedImgs.every(Boolean);
    if (!allLoaded) return;
    const t = setTimeout(() => {
      TEMPLATES.forEach((tpl, i) => {
        const img = loadedImgs[i];
        if (img) drawCanvas(name, i, img, tpl);
      });
      setCanDownload(!!name.trim());
    }, 120);
    return () => clearTimeout(t);
  }, [name, loadedImgs, drawCanvas]);

  const handleShare = useCallback(() => {
    const canvas = canvasRefs.current[active];
    if (!canvas || !canDownload) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const safeName = name.trim().toLowerCase().replace(/\s+/g, '-') || 'mi';
      const fileName = `soy-${safeName}-me-la-juego.jpg`;
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        navigator.share({ files: [file], title: `Soy ${name.trim()} y me la juego`, text: `Soy ${name.trim()} y me la juego por la vida 💙` })
          .catch(() => fallbackDownload(blob, fileName));
      } else {
        fallbackDownload(blob, fileName);
      }
    }, 'image/jpeg', 0.95);
  }, [active, canDownload, name]);

  const isLoading = loadedImgs.some(img => img === null);

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
            className="flex-1 px-4 py-3 text-xl border-2 border-blue-200 rounded-xl focus:outline-none focus:border-[#1D3B95] text-center font-bold uppercase tracking-widest bg-white"
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

      {/* Slider */}
      <div className="w-full relative">
        {isLoading && (
          <div className="aspect-square w-full rounded-2xl bg-gray-100 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#1D3B95] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className={`w-full ${isLoading ? 'hidden' : ''}`}>
          {/* Canvases — only active one visible */}
          {TEMPLATES.map((_, i) => (
            <div
              key={i}
              className={`w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-square ${i === active ? 'block' : 'hidden'}`}
            >
              <canvas
                ref={(el) => { canvasRefs.current[i] = el; }}
                className="w-full h-auto block"
              />
            </div>
          ))}

          {/* Arrows */}
          {TEMPLATES.length > 1 && (
            <>
              <button
                onClick={() => setActive((a) => (a - 1 + TEMPLATES.length) % TEMPLATES.length)}
                className="arrow-left absolute left-2 top-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                aria-label="Plantilla anterior"
              >
                <ChevronLeft size={22} className="text-[#1D3B95]" />
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % TEMPLATES.length)}
                className="arrow-right absolute right-2 top-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
                aria-label="Siguiente plantilla"
              >
                <ChevronRight size={22} className="text-[#1D3B95]" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {!isLoading && TEMPLATES.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {TEMPLATES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? 'bg-[#1D3B95]' : 'bg-gray-300'}`}
                aria-label={`Plantilla ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Download / Share */}
      <button
        onClick={handleShare}
        disabled={!canDownload}
        className="w-full py-4 bg-[#1D3B95] text-white text-xl font-bold rounded-2xl hover:bg-[#162d8a] active:bg-[#111f5c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
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

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation = 0) {
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
