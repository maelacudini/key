import { connectDB } from "@/lib/mongodb"
import Review from "@/models/review"
import { NextResponse } from "next/server"

export async function GET(req, res) {
    try {
        await connectDB()
        const url = new URL(req.url)
        const topic = url.searchParams.get('topic')
        const lowerTopic = topic.toLocaleLowerCase()

        const reviews = await Review.find({ keywords: { $in: [lowerTopic] } });
        if (!reviews) {
            connection.disconnect()
            console.log('No reviews for this topic.');
            return NextResponse.json({ message: 'No reviews for this topic.' }, { status: 404 })
        }

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.log('An error occurred while fetching the reviews: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching the reviews.' }, { status: 500 })
    }
}