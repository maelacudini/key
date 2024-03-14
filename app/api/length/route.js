import { connectDB } from "@/lib/mongodb";
import Review from "@/models/review";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        await connectDB()

        const users = await User.find()
        const totalUsers = users.length

        const reviews = await Review.find()
        const totalReviews = reviews.length

        return NextResponse.json({ totalUsers, totalReviews })
    } catch (error) {
        console.log('An error occurred while fetching users: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching users.' }, { status: 500 })
    }
}