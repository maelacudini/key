import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import xss from "xss";

//currently using server actions to edit the avatar, this route is not being used 

//PRIVATE, EDIT USER AVATAR
export async function PUT(req, res) {

    try {
        const { avatar, userId } = await req.json()

        const sanitizedAvatar = xss(avatar)

        if (!sanitizedAvatar || sanitizedAvatar.trim().length === 0) {
            console.log('Please fill the required fields.');
            return NextResponse.json({ message: 'Please fill the required fields.' }, { status: 401 })
        }

        await connectDB()

        const user = await User.findById(userId)
        if (!user) {

            console.log('User does not exists.');
            return NextResponse.json({ message: 'User does not exists.' }, { status: 404 })
        }

        await User.findByIdAndUpdate(userId, { avatar: sanitizedAvatar })

        console.log('Avatar edited.');
        return NextResponse.json({ message: 'Avatar edited.' }, { status: 200 })
    } catch (error) {
        console.log('An error occurred while editing the avatar: ', error);
        return NextResponse.json({ message: 'An error occurred while editing the avatar.' }, { status: 500 })
    }
}