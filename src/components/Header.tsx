import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B3DAE] text-white shadow-md sticky top-0 z-10">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Soy y me la juego
        </Link>
        <Link
          href="/generar"
          className="bg-[#C9961A] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#b8851a] active:bg-[#a37518] transition-colors"
        >
          Crear imagen
        </Link>
      </div>
    </header>
  );
}
