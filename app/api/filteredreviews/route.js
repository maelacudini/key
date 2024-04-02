import { connectDB } from "@/lib/mongodb";
import Review from "@/models/review";
import { NextResponse } from "next/server";

//PUBLIC, get all reviews
export async function GET(req, res) {
    try {
        await connectDB()
        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page')) || 1;
        const limit = parseInt(url.searchParams.get('limit')) || 10;
        const keywords = url.searchParams.get('keywords')
        const createdAt = parseInt(url.searchParams.get('createdAt')) || 1;

        const keywordsSeparated = keywords ? keywords.split(',') : [];

        let filter = {};
        if (keywordsSeparated.length !== 0) {
            filter.keywords = { $all: keywordsSeparated };
        }

        const reviews = await Review.find(filter).skip((page - 1) * limit).limit(limit).sort({ createdAt: createdAt });

        // This shows the total amount of reviews per specified keywords, if you don't add (filter) in countDocuments it shows the total amount of reviews in general
        const totalCount = await Review.countDocuments(filter);

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);

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