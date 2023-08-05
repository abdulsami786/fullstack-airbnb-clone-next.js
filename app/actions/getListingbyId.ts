import prisma from '@/app/libs/prismadb'

interface ParamsProp{
    listingId?:string;
}

export default async function getListingById(params:ParamsProp){
    try {
        const {listingId} = params;
        const listing = await prisma.listing.findUnique({
            where:{
                id:listingId
            },
            include:{
                user:true
            }
        });
        if(!listing){
            return null;
        }

        console.log(listing);
        
        return listing
            
    } catch (error:any) {
        throw new Error(error)
    }
}