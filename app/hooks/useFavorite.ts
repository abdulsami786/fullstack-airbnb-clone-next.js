import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface favoriteProps{
    listingId:string;
    currentUser?:User | null;
}

const useFavorite =({listingId,currentUser}:favoriteProps)=>{
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited= useMemo(()=>{
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId)
    },[currentUser,listingId]);

    const toggleFavorite = useCallback(async(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen()
        }
        try {
            let request;
            if(hasFavorited){
                request = ()=>axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = ()=>axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success("success")
        } catch (error) {
            toast.error("Something went wrong")
        }
    },[currentUser,hasFavorited,listingId,loginModal,router]);

    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;