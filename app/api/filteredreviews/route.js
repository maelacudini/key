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

        let query = {};
        if (keywords) {
            const keywordsSeparated = keywords.split(' ');
            const regexPatterns = keywordsSeparated.map(keyword => new RegExp(keyword, 'i'));
            query = { title: { $all: regexPatterns } };
        }

        const reviews = await Review.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: createdAt });

        const totalReviews = await Review.countDocuments(query);
        const totalPages = Math.ceil(totalReviews / limit);

        const response = {
            reviews: reviews,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalReviews: totalReviews
            }
        };

        return NextResponse.json(response)
    } catch (error) {
        console.log('An error occurred while fetching reviews: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching reviews.' }, { status: 500 })
    }
}
