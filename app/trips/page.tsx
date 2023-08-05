import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage =async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <EmptyState
            title="Unauthorized"
            subtitle="Please Login"
            />
        )
    }

    const reservations = await getReservations({userId:currentUser.id});
    if(reservations.length===0){
        return(
            <EmptyState
            title="No Trips Found"
            subtitle="Looks Like You have not reserved any tips"
            />
        )
    }
    return (
        <TripsClient
        reservations={reservations}
        currentUser={currentUser}
        />
);
}
 
export default TripsPage;