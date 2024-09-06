import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'
import Navbar from '@/components/navigation/navbar'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/lib/queryClient'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipe Vault',
  description: 'Get the best out of your food',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={openSans.className}>
        <QueryClientProvider client={queryClient}>
          <div className='relative bg-primary text-primary-foreground z-50'>
            <Navbar />
          </div>
          <main className='mt-[3.75rem]'>{children}</main>
          <Toaster />
          <footer className='bg-primary text-primary-foreground'>
            <Footer />
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  )
}
