import { connectDB } from "@/lib/mongodb";
import Review from "@/models/review";
import { NextResponse } from "next/server";

//PUBLIC, get all reviews
export async function GET(req, res) {
    try {
        await connectDB()

        const reviews = await Review.find()

        return NextResponse.json(reviews)
    } catch (error) {
        console.log('An error occurred while fetching reviews: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching reviews.' }, { status: 500 })
    }
}