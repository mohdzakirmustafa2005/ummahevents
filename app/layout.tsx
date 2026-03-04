import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'UmmahEvents | The Gold Standard for Islamic Gatherings',
  description: 'A curated selection of the most inspiring Islamic conferences, workshops, and community events worldwide.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-[#fbfaf7] text-[#1a1a1a] selection:bg-[#d4af37] selection:text-white">
        {children}
      </body>
    </html>
  );
}
