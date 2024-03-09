import { Inria_Sans } from 'next/font/google';
import './globals.css';

const inria_sans = Inria_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata = {
  title: 'Voicehere',
  description: 'Here to help',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inria_sans.className}>
        <div className="min-h-20 bg-[#204A77] flex items-center px-5">
          <div className="text-2xl text-white">Voicehere</div>
        </div>
        {children}
      </body>
    </html>
  );
}
