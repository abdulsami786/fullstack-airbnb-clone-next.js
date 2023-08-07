import getCurrentUser from "../actions/getCurrentUser";

import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <EmptyState
            title="Unauthorized"
            subtitle="Please Login"
            />
        )
    }
    const listings = await getListings({userId:currentUser.id})

    if(listings.length === 0){
        return(
            <EmptyState
            title="No Properties Found"
            subtitle="Look Like you have no properties"
            />
        )
    }
    return ( 
        <PropertiesClient
        listings={listings}
        currenUser={currentUser}
        />
     );
}
 
export default PropertiesPage;