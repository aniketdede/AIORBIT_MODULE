import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { DottedSurface } from '@/components/ui/dotted-surface';

export const metadata: Metadata = {
  title: 'AI Directory — AI Orbit Module | The AI Signal',
  description: 'Discover, compare, and explore the best AI tools, models, and agents in the global ecosystem.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between antialiased relative">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <DottedSurface size={6} opacity={0.6} />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
