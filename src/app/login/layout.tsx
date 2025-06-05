import '../globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Login',
  description: 'Football Tracker Login Page',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
