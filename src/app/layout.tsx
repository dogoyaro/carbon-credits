import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {Header} from '@/components/Header';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Carbon Credits',
  description: 'Browser projects and create a portfolio of carbon credits.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* TODO: Perhaps consider moving this into individual pages? */}
        <Header />
        {children}
      </body>
    </html>
  );
}
