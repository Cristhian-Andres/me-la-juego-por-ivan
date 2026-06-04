'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isGenerador = pathname === '/generar';

  return (
    <header className="bg-[#1D3B95] text-white shadow-md sticky top-0 z-10">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Me la juego por Iván y Aida
        </Link>
        {!isGenerador && (
          <Link
            href="/generar"
            className="bg-[#E8401C] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#c93518] active:bg-[#b02e14] transition-colors"
          >
            Crear imagen
          </Link>
        )}
      </div>
    </header>
  );
}
