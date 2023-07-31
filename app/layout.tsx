import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from '@/app/actions/getCurrentUser'
import RentModal from './components/modals/RentModal'


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
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        <div className='pb-20 pt-28'>
        {children}
        </div>
        </body>
    </html>
  )
}
