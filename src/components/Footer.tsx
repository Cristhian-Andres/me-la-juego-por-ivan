export default function Footer() {
  return (
    <footer className="bg-[#1D3B95] text-white mt-auto py-5 text-center">
        <p className="text-center text-sm leading-snug">
            Me la juego por Iván y Aida
        </p>
        <p className="text-center text-sm font-semibold">
            By ❤️ Team Cauca
        </p>
      <div className="flex items-center justify-center gap-4 text-xs text-white font-light">
        <a
          href="https://www.facebook.com/CHRISTHNN"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          Cristhian Luna
        </a>
        <span className="text-white">·</span>
        <a
          href="https://www.facebook.com/jordanminota"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 transition-colors"
        >
          Jordan Minota
        </a>
      </div>
    </footer>
  );
}
