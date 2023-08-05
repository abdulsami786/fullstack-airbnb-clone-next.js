'use client'

import { FC } from 'react'
import dynamic from 'next/dynamic'
import { IconType } from 'react-icons'
import useCountries from '@/app/hooks/useCountries'
import Avatar from '../Avatar'
import { User } from '@prisma/client'
import ListingCategory from './ListingCategory'


interface ListingInfoProps {
    user:User,
    description:string,
    guestCount:number,
    roomCount:number,
    bathroomCount:number,
    category:{
        icon:IconType,
        label:string,
        description:string,
    } | undefined
    locationValue:string
}
const Map = dynamic(()=>import('../Map'),{
    ssr:false
})
const ListingInfo: FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const {getByValue} = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl font-smibold flex flex-row items-center gap-2'>
                <div>Hosted By {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr/>
        {category && (
            <ListingCategory
            icon={category.icon}
            label={category?.label}
            description={category?.description}
            />
        )}
        <hr/>
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr/>
        <Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo