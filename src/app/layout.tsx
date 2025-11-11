import type { Metadata } from 'next';
import './main.css';

export const metadata: Metadata = {
  title: 'BloodLine',
  description: 'Blood bank management platform',
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
