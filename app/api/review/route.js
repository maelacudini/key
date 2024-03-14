import { connectDB } from "@/lib/mongodb";
import Review from "@/models/review";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import xss from "xss";
import { authOptions } from "../auth/[...nextauth]/route";

//PRIVATE, ADD REVIEW
export async function POST(req, res) {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return NextResponse.json({ message: 'Not authorized.' }, { status: 401 })
    // }

    try {
        const { title, author, description, rating, image, keywords, userId } = await req.json()

        //sanitize input
        const sanitizedTitle = xss(title)
        const sanitizedAuthor = xss(author)
        const sanitizedDescription = xss(description)
        const sanitizedRating = xss(rating)
        const sanitizedImage = xss(image)
        const sanitizedKeywords = xss(keywords)

        //check for valid fields
        if (
            !sanitizedTitle || sanitizedTitle.trim().length === 0 ||
            !sanitizedAuthor || sanitizedAuthor.trim().length === 0 ||
            !sanitizedDescription || sanitizedDescription.trim().length === 0 ||
            !sanitizedRating || sanitizedRating.trim().length === 0 ||
            !sanitizedImage || sanitizedImage.trim().length === 0 ||
            !sanitizedKeywords || sanitizedKeywords.trim().length === 0
        ) {
            return NextResponse.json({ message: 'Please fill in all input fields.' }, { status: 400 })
        }

        //separate keywords by space
        const separatedKeywords = sanitizedKeywords.split(' ').slice(0, 3)

        //connect database
        await connectDB()

        //check for existing user
        const existingUser = await User.findById(userId)
        if (!existingUser) {
            console.log('User does not exists.');
            return NextResponse.json({ message: 'User does not exists.' }, { status: 404 })
        }

        //add review
        const review = await Review.create({
            title: sanitizedTitle,
            author: sanitizedAuthor,
            description: sanitizedDescription,
            rating: sanitizedRating,
            image: sanitizedImage,
            keywords: separatedKeywords,
            user: userId
        })

        //add review in user document
        await User.findByIdAndUpdate(userId, { $push: { reviews: review } })

        return NextResponse.json({ message: 'Review added.' }, { status: 200 })
    } catch (error) {
        console.log('An error occurred while adding a review: ', error);
        return NextResponse.json({ message: 'An error occurred while adding a review.' }, { status: 500 })
    }
}

//PRIVATE, GET ALL REVIEWS BASED ON USER ID
export async function GET(req, res) {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return NextResponse.json({ message: 'Not authorized.' }, { status: 401 })
    // }

    try {
        await connectDB()
        const url = new URL(req.url)
        const userId = url.searchParams.get('userId')

        const reviews = await Review.find({ user: userId })
        if (!reviews) {

            console.log('Review does not exists.');
            return NextResponse.json({ message: 'Review does not exists.' }, { status: 404 })
        }


        return NextResponse.json(reviews)
    } catch (error) {
        console.log('An error occurred while fetching the review: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching the review.' }, { status: 500 })
    }
}

//PRIVATE, DELETE REVIEW
export async function DELETE(req, res) {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //     return NextResponse.json({ message: 'Not authorized.' }, { status: 401 })
    // }

    try {
        await connectDB()

        const { reviewId, userId } = await req.json()

        const review = await Review.findById(reviewId)
        if (!review) {

            console.log('Review does not exists.');
            return NextResponse.json({ message: 'Review does not exists.' }, { status: 404 })
        }

        const user = await User.findById(userId)
        if (!user) {

            console.log('User does not exists.');
            return NextResponse.json({ message: 'User does not exists.' }, { status: 404 })
        }

        await User.findByIdAndUpdate(userId, { $pull: { reviews: reviewId } })

        await Review.findByIdAndDelete(reviewId)


        return NextResponse.json({ message: 'Review deleted.' }, { status: 200 })
    } catch (error) {
        console.log('An error occurred while deleting the review: ', error);
        return NextResponse.json({ message: 'An error occurred while deleting the review.' }, { status: 500 })
    }
}