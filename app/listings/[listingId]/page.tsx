import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingbyId'
import getReservations from '@/app/actions/getReservations';
import EmptyState from '@/app/components/EmptyState';
import { FC } from 'react'
import ListingClient from './ListingClient';

interface ParamsProps {
  listingId?:string
}

const ListingPage = async ({params}:{params:ParamsProps}) => {
    const listing = await getListingById(params);
    const reservations= await getReservations(params);
    const currentUser = await getCurrentUser();

    if(!listing){
        return(
            <EmptyState/>
        )
    }
  return (
    <ListingClient
    listing={listing}
    reservations={reservations}
    currentUser={currentUser}
    />
  )
}

export default ListingPage