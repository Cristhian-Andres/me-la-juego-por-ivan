import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGenerator from '@/components/ImageGenerator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GenerarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">
        <div className="flex items-center gap-3 mb-5">
          <Link
            href="/"
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={22} />
          </Link>
          <h1 className="text-2xl font-bold text-[#1B3DAE]">
            Crea tu imagen
          </h1>
        </div>

        <ImageGenerator />
      </main>

      <Footer />
    </div>
  );
}
