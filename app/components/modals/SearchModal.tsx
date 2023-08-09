'use client'
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import qs from 'query-string';

import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
import Modal from "./Modal";

enum STEPS{
    LOCATION =0,
    DATE = 1,
    INFO=2
}

const SearchModal = () => {
    const router = useRouter();
    const searchModal =useSearchModal();
    const params =useSearchParams();

    const [step,setStep] = useState(STEPS.LOCATION);
    const [location, setlocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate:new Date(),
        endDate:new Date(),
        key:'selection'
    })
    const Map = useMemo(()=>dynamic(()=>import('../Map'),{
        ssr:false
    }),[location])
    const onBack = useCallback(()=>{
        setStep((value)=>value - 1)
    },[])
    const onNext = useCallback(()=>{
        setStep((value)=>value+1)
    },[])

    const onSubmit = useCallback(async()=>{
        if(step !== STEPS.INFO){
            return onNext();
        }
        let currentQuery  = {};
        if(params){
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery :any = {
            ...currentQuery,
            locationValue:location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if(dateRange.startDate){
            updatedQuery.startDate=formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = qs.stringifyUrl({
            url:'/',
            query:updatedQuery,
        },{skipNull:true})

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url)

        
    },[step,searchModal,location,router,guestCount,roomCount,dateRange,onNext,bathroomCount,params])

    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO){
            return 'Search'
        }
        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return undefined
        }
        return 'Back'
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location"
            />
            <CountrySelect
            value={location}
            onChange={(value)=>setlocation(value as CountrySelectValue)}
            />
            <hr/>
            <Map center={location?.latlng}/>
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="When do you plan to go?"
                subtitle="Make sure everyone is free"
                />
                <Calender
                onChange={(value)=>setDateRange(value.selection)}
                value={dateRange}
                />
            </div>
        )
    }
    if(step === STEPS.INFO){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                title="More Information"
                subtitle="Find your perfect Place"
                />
                <Counter
                onChange={(value)=>setGuestCount(value)}
                value={guestCount}
                title="Guest"
                subtitle="How many guests are coming?"
                />
                <hr/>
                <Counter
                onChange={(value)=>setRoomCount(value)}
                value = {roomCount}
                title="Rooms"
                subtitle="How many Rooms you need?"
                />
                <hr/>
                <Counter
                onChange={(value)=>setBathroomCount(value)}
                value={bathroomCount}
                title="Bathrooms"
                subtitle="How many bathrooms you need"
                />
            </div>
        )
    }
    return (
        <Modal
        isOPen={searchModal.isOpen}
        title="Filters"
        actionLabel={actionLabel}
        onSubmit={onSubmit}
        secondaryAction={step === STEPS.LOCATION?undefined:onBack}
        secondaryActionLabel={secondaryActionLabel}
        onClose={searchModal.onClose}
        body={bodyContent}
        />
    );
}
 
export default SearchModal;