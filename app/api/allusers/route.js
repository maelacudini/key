import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

//PUBLIC, get all users
export async function GET(req, res) {
    try {
        await connectDB()

        const users = await User.find({}, { '_id': 0, 'username': 1, 'avatar': 1, 'reviews': 1, 'bio': 1, 'createdAt': 1 })

        return NextResponse.json(users)
    } catch (error) {
        console.log('An error occurred while fetching users: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching users.' }, { status: 500 })
    }
}