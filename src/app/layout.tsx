import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pirate Ship - Shipping Rates',
  description: 'Compare and get instant shipping rates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
