import prisma from "@/app/libs/prismadb"
import {NextResponse} from "next/server"
import bcrypt from "bcrypt"

export async function POST(req:Request){
    const body = await req.json();

    const{email,name,password} = body;

    const hashedPassword = await bcrypt.hash(password,12)
    
    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}