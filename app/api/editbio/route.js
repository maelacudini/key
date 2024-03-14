import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import xss from "xss";

//i am using server actions to edit the bio, this route is not being used 

//PRIVATE, EDIT USER BIO
export async function PUT(req, res) {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return NextResponse.json({ message: 'Not authorized.' }, { status: 401 })
    // }

    try {
        const { bio, userId } = await req.json()

        const sanitizedBio = xss(bio)

        if (!sanitizedBio || sanitizedBio.trim().length === 0) {
            console.log('Please fill the required fields.');
            return NextResponse.json({ message: 'Please fill the required fields.' }, { status: 401 })
        }

        if (sanitizedBio.trim().length >= 200) {
            console.log('Please add a bio under 200 characters.');
            return NextResponse.json({ message: 'Please add a bio under 200 characters.' }, { status: 401 })
        }

        await connectDB()

        const user = await User.findById(userId)
        if (!user) {
            console.log('User does not exists.');
            return NextResponse.json({ message: 'User does not exists.' }, { status: 404 })
        }

        await User.findByIdAndUpdate(userId, { bio: sanitizedBio })
        console.log('Bio edited.');
        return NextResponse.json({ message: 'Bio edited.' }, { status: 200 })
    } catch (error) {
        console.log('An error occurred while editing the bio: ', error);
        return NextResponse.json({ message: 'An error occurred while editing the bio.' }, { status: 500 })
    }
}