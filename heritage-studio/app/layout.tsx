import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Global/Header';
// Mock providers - in a real app, these would wrap the children
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { AppStateProvider } from '@/context/AppStateContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cultural Heritage & Dress-Up Studio',
  description: 'Explore traditional clothing, geographical heritage, and culturally accurate styling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-100`}>
        <AuthProvider>
          <ThemeProvider>
            <AppStateProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 overflow-x-hidden">
                  {children}
                </main>
              </div>
            </AppStateProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}