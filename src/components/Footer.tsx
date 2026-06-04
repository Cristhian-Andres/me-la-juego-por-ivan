export default function Footer() {
  return (
    <footer className="bg-[#1B3DAE] text-white mt-auto">
      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-center text-sm mb-5 leading-snug">
          Me la juego por Iván y Aida
        </p>
        <div className="flex items-center justify-center gap-8">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 hover:opacity-75 transition-opacity"
            aria-label="Instagram"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            <span className="text-xs opacity-90">Instagram</span>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 hover:opacity-75 transition-opacity"
            aria-label="Facebook"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span className="text-xs opacity-90">Facebook</span>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 hover:opacity-75 transition-opacity"
            aria-label="LinkedIn"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.08A5.96 5.96 0 0 1 16 8z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="text-xs opacity-90">LinkedIn</span>
          </a>
        </div>
        <p className="text-center text-xs mt-5 opacity-80">
          © 2026 · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
