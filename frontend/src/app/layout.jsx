import { Inria_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
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
        <Toaster />
        {children}
      </body>
    </html>
  );
}
