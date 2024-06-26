import { connectDB } from "@/lib/mongodb";
import Review from "@/models/review";
import User from "@/models/user";
import { NextResponse } from "next/server";

//PUBLIC, get all reviews
export async function GET(req, res) {
    try {
        await connectDB()
        const url = new URL(req.url)
        const page = url.searchParams.get('page') || 1
        const limit = url.searchParams.get('limit') || 10

        // Calculate skip value based on page and limit
        const skip = (page - 1) * limit;

        // Query MongoDB for reviews with pagination
        const reviews = await Review.find().skip(skip).limit(limit);

        // Get total count of reviews (for pagination metadata)
        const totalCount = await Review.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);

        // Prepare response object with reviews and pagination metadata
        const response = {
            reviews: reviews,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalReviews: totalCount
            }
        };

        return NextResponse.json(response)
    } catch (error) {
        console.log('An error occurred while fetching reviews: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching reviews.' }, { status: 500 })
    }
}