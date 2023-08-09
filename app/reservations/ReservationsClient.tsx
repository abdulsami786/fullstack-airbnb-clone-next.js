'use client'
import { Reservation, User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { FC, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import { de } from 'date-fns/locale'

interface ReservationsClientProps {
  reservations:Reservation[],
  currentUser?:User | null
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
          toast.success('Reservations cancelled');
          router.refresh();
        })
        .catch(()=>{
          toast.error('Something Went Wrong')
        })
        .finally(()=>{
          setDeletingId('');
        })
    },[router])
  return (
    <Container>
      <Heading
      title='Reservations'
      subtitle='Bookings on Your Properties'
      />
      <div
      className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-8'
      >
        {reservations.map((reservation:any)=>(
          <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={onCancel}
          disabled={deletingId === reservation.id}
          actionLabel='Cancel Guest Reservation'
          currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient