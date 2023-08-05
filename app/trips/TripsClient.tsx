'use client'

import { Reservation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'
import axios from 'axios'
import toast from 'react-hot-toast'

interface TripsClientProps {
  reservations:Reservation[],
  currentUser?:User | null
}

const TripsClient: FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation Cancelled');
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error)
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[router])
  return (
    <Container>
        <Heading
        title='Trips'
        subtitle='Where you have been and where you are going'
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {reservations.map((reservation:any)=>(
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel='Cancel Reservation'
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
 
}

export default TripsClient