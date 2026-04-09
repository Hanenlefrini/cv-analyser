import type { Metadata } from 'next';
import { ClientLayout } from './ClientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'CV Analyzer',
  description: 'AI-powered CV analysis tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
