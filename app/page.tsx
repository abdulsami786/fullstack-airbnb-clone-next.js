

import getListings from './actions/getListings'
import getCurrentUser from './actions/getCurrentUser'
import EmptyState from './components/EmptyState'
import Container from './components/Container'
import ListingCard from './components/listings/ListingCard'
import { ListingsParams } from './actions/getListings'
import ClientOnly from './components/ClientOnly'


interface HomeProps{
  searchParams:ListingsParams 
}

const Home=async({searchParams}:HomeProps)=> {
  console.log("\nSearch Params",searchParams);
  
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  
  if(listings.length === 0){
    return(
      <EmptyState showReset/>
    )
  }
  return (
    <ClientOnly>

   <Container>
    <div
    className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'
    >
      {listings.map((listing:any)=>(
        <ListingCard
        currentUser={currentUser}
        key={listing.id}
        data={listing}
        />
        ))}
    </div>
   </Container>
        </ClientOnly>
  )
}
export default Home;