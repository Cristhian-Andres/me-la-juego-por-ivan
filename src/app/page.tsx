import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center max-w-lg mx-auto w-full px-4 py-8">
        {/* Hero */}
        <section className="text-center mb-8 w-full">
          <h1 className="text-4xl font-bold text-[#1D3B95] leading-tight mb-3">
            Me la juego por Iván y Aida
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Personaliza tu imagen y demuestra que tú también te la juegas{' '}
            <span className="text-[#E8401C] font-semibold">por la vida con Iván y Aida.</span>
          </p>
        </section>

        {/* Template preview */}
        <div className="w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-blue-100">
          <Image
            src="/01-plantilla.jpg"
            alt="Plantilla – Soy [nombre] y me la juego por la vida con Iván y Aida"
            width={540}
            height={540}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* CTA */}
        <Link
          href="/generar"
          className="w-full max-w-xs bg-[#1D3B95] text-white text-xl font-bold py-5 px-6 rounded-2xl text-center hover:bg-[#162d80] active:bg-[#0f2060] transition-colors shadow-xl"
        >
          ¡Crear mi imagen!
        </Link>

        {/* Steps */}
        <section className="mt-12 w-full">
          <h2 className="text-xl font-bold text-[#1D3B95] text-center mb-5">
            ¿Cómo funciona?
          </h2>
          <ol className="space-y-3">
            {[
              { n: '1', label: 'Escribe tu nombre en el campo de texto' },
              { n: '2', label: 'Ve la vista previa de tu imagen personalizada' },
              { n: '3', label: 'Descarga o comparte directamente a WhatsApp e Instagram' },
            ].map(({ n, label }) => (
              <li key={n} className="flex items-center gap-4 bg-blue-50 rounded-2xl px-4 py-3">
                <span className="w-10 h-10 bg-[#1D3B95] text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {n}
                </span>
                <p className="text-gray-700 text-base">{label}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Second CTA */}
        <Link
          href="/generar"
          className="mt-10 w-full max-w-xs bg-[#E8401C] text-white text-lg font-bold py-4 px-6 rounded-2xl text-center hover:bg-[#c93518] active:bg-[#b02e14] transition-colors shadow-lg"
        >
          Comenzar ahora →
        </Link>
      </main>

      <Footer />
    </div>
  );
}
