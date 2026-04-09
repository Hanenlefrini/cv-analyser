'use client';

import { Inter } from 'next/font/google';
import { Providers } from '@/lib/providers';

const inter = Inter({ subsets: ['latin'] });

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <body className={inter.className}>
      <Providers>{children}</Providers>
    </body>
  );
}
