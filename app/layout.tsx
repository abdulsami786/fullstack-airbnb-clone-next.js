import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from '@/actions/getCurrentUser'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnb',
  description: 'Airbnb Clone',
}
const font = Nunito({
  subsets:['latin']
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        {children}
        </body>
    </html>
  )
}
