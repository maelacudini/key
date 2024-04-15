import { connectDB } from "@/lib/mongodb"
import Review from "@/models/review"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        await connectDB()
        const url = new URL(req.url)
        const topic = url.searchParams.get('topic')
        const lowerTopic = topic.toLocaleLowerCase()
        const page = parseInt(url.searchParams.get('page')) || 1
        const limit = parseInt(url.searchParams.get('limit')) || 10

        // Calculate skip value based on page and limit
        const skip = (page - 1) * limit;

        // Query MongoDB for reviews with pagination
        const reviews = await Review.find({ keywords: { $in: [lowerTopic] } }).skip(skip).limit(limit);
        if (!reviews) {
            connection.disconnect()
            console.log('No reviews for this topic.');
            return NextResponse.json({ message: 'No reviews for this topic.' }, { status: 404 })
        }

        //total count of reviews
        const totalCount = await Review.countDocuments({ keywords: { $in: [lowerTopic] } });

        const totalPages = Math.ceil(totalCount / limit);

        const response = {
            reviews: reviews,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalReviews: totalCount
            }
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log('An error occurred while fetching the reviews: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching the reviews.' }, { status: 500 })
    }
}