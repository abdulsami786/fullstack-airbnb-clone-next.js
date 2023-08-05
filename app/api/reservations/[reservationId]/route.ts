import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
interface ParamsProp{
    reservationId?:string;
}

export async function DELETE(req:Request,{params}:{params:ParamsProp}){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid ID')
    }

    const reservation = await prisma.reservation.deleteMany({
        where:{
            id:reservationId,
            OR:[
                {userId:currentUser.id},
                {listing:{userId:currentUser.id}}
            ]
        }
    })
    return NextResponse.json(reservation)
}