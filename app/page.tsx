import Image from 'next/image'
import getListings from './actions/getListings'
import getCurrentUser from './actions/getCurrentUser'
import EmptyState from './components/EmptyState'
import Container from './components/Container'
import ListingCard from './components/listings/ListingCard'

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()

  if(listings.length === 0){
    return(
      <EmptyState/>
    )
  }
  return (
   <Container>
    <div
    className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'
    >
      {listings.map((listing)=>(
        <ListingCard
        currentUser={currentUser}
        key={listing.id}
        data={listing}
        />
      ))}
    </div>
   </Container>
  )
}
