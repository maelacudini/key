import './_style/globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './Providers'
import Footer from './_components/common/footer/Footer'
import Header from './_components/common/header/Header'
import Feedback from './_components/common/feedback/Feedback'
import { GeneralContextProvider } from '@/context/context'

//font
const font = Inter({ subsets: ['latin'] })

//viewport
export const viewport = {
  themeColor: 'white',
}

//metadata
export const metadata = {
  title: {
    template: '%s | Key',
    default: 'Book Reviews | Key',
  },
  description: "Share your opinion on books you've read or simply look for your next great read",
  generator: 'Next.js',
  applicationName: 'Key',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Maela', url: 'https://maelacudini.com' }],
  creator: 'Maela',
  publisher: 'Maela',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://addwebsite.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'Key',
    description: "Share your opinion on books you've read or simply look for your next great read",
    url: 'https://nextjs.org',
    siteName: 'Key',
    authors: ['Maela'],
    images: [
      {
        url: 'https://nextjs.org/opengraph-image.png',
        width: 1800,
        height: 1600,
        alt: 'Key, book reviews',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Key',
    description: "Share your opinion on books you've read or simply look for your next great read",
    images: ['https://nextjs.org/twitter-image.png']
  },
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id='body' className={font.className}>
        <AuthProvider>
          <GeneralContextProvider>
            <Header />
            {children}
            <Feedback />
            <Footer />
          </GeneralContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
