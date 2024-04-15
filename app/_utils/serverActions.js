'use server'
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import xss from "xss";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Review from "@/models/review";
import { getAllReviews } from "./functions";
import { compare } from "bcryptjs";

//edit user avatar, PRIVATE
export async function handleEditAvatar(prevState, formData) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { message: 'Not authorized.' }
    }

    const avatar = formData.get("avatar");
    const userId = formData.get("userId");

    if (!avatar || !userId) {
        console.log('No avatar or user id.');
        return { message: 'No avatar or user id.' }
    }

    try {
        const sanitizedAvatar = xss(avatar)
        if (!sanitizedAvatar || sanitizedAvatar.trim().length === 0) {
            console.log('Please fill the required fields.');
            return { message: 'Please fill the required fields.' }
        }

        await connectDB()

        const user = await User.findById(userId)
        if (!user) {
            console.log('User does not exists.');
            return { message: 'User does not exists.' }
        }

        await User.findByIdAndUpdate(userId, { avatar: sanitizedAvatar })

        revalidatePath('/')
        revalidatePath('/account')
        console.log('Avatar edited.');
        return { message: 'Avatar edited.' }
    } catch (error) {
        console.log('An error occurred while editing the avatar: ', error);
        return { message: 'An error occurred while editing the avatar.' }
    }
}

//edit user bio, PRIVATE
export async function handleEditBio(prevState, formData) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { message: 'Not authorized.' }
    }

    const bio = formData.get("bio");
    const userId = formData.get("userId");

    if (!bio || !userId) {
        console.log('No bio or user id.');
        return { message: 'No bio or user id.' }
    }

    try {
        const sanitizedBio = xss(bio)

        if (!sanitizedBio || sanitizedBio.trim().length === 0) {
            console.log('Please fill the required fields.');
            return { message: 'Please fill the required fields.' }
        }

        if (sanitizedBio.trim().length >= 200) {
            console.log('Please add a bio under 200 characters.');
            return { message: 'Please add a bio under 200 characters.' }
        }

        await connectDB()

        const user = await User.findById(userId)
        if (!user) {
            console.log('User does not exists.');
            return { message: 'User does not exists.' }
        }

        await User.findByIdAndUpdate(userId, { bio: sanitizedBio })

        revalidatePath('/')
        revalidatePath('/account')
        console.log('Bio edited.');
        return { message: 'Bio edited.' }
    } catch (error) {
        console.log('An error occurred while editing the bio: ', error);
        return { message: 'An error occurred while editing the bio.' }
    }
}

//delete review, PRIVATE
export async function deleteReview(prevState, formData) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { message: 'Not authorized.' }
    }

    const reviewId = formData.get("reviewId");
    const userId = formData.get("userId");

    try {
        await connectDB()

        const review = await Review.findById(reviewId)
        if (!review) {
            console.log('Review does not exists.');
            return { message: 'Review does not exists.' }
        }

        const user = await User.findById(userId)
        if (!user) {
            console.log('User does not exists.');
            return { message: 'User does not exists.' }
        }

        await User.findByIdAndUpdate(userId, { $pull: { reviews: reviewId } })

        await Review.findByIdAndDelete(reviewId)

        revalidatePath('/')
        revalidatePath('/account')
        return { message: 'Review deleted.' }
    } catch (error) {
        console.log('An error occurred while deleting the review: ', error);
        return { message: 'An error occurred while deleting the review.' }
    }
}

//add review, PRIVATE
export async function addReview(prevState, formData) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { message: 'Not authorized.' }
    }

    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const rating = formData.get("rating");
    const image = formData.get("image");
    const keywords = formData.get("keywords");
    const userId = formData.get("userId");

    try {
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
            return { message: 'Please fill in all input fields.' }
        }

        //separate keywords by space
        const separatedKeywords = sanitizedKeywords.toLowerCase().split(',')

        //connect database
        await connectDB()

        //check for existing user
        const existingUser = await User.findById(userId)
        if (!existingUser) {
            console.log('User does not exists.');
            return { message: 'User does not exists.' }
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

        revalidatePath('/')
        revalidatePath('/account')
        return { message: 'Review added.' }
    } catch (error) {
        console.log('An error occurred while adding a review: ', error);
        return { message: 'An error occurred while adding a review.' }
    }
}

//filter reviews in Reviews page, PUBLIC
export async function filterReviews(prevState, formData) {
    await connectDB()

    const page = parseInt(formData.get("page") || 1)
    const limit = parseInt(formData.get("limit") || 10);
    const createdAt = parseInt(formData.get("createdAt")) || 1;
    const keywords = formData.get("keywords");

    try {
        const keywordsSeparated = keywords ? keywords.split(' ') : [];
        const regexPatterns = keywordsSeparated.map(keyword => new RegExp(keyword, 'i'));

        const reviews = await Review.find({ title: { $all: regexPatterns } }).skip((page - 1) * limit).limit(limit).sort({ createdAt: createdAt });

        const totalPages = Math.ceil(reviews.length / limit);

        const response = {
            reviews: JSON.parse(JSON.stringify(reviews)),
            pagination: {
                currentPage: parseInt(page),
                totalPages: totalPages,
                totalReviews: reviews.length
            }
        };

        return response
    } catch (error) {
        console.log('An error occurred while fetching reviews: ', error);
        return { message: 'An error occurred while fetching reviews.' }
    }

}

//PRIVATE, DELETE USER 
export async function deleteAccount(prevState, formData) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { message: 'Not authorized.' }
    }

    const userId = formData.get("userId");
    const password = formData.get("password");
    const sanitizedPassword = xss(password)

    try {
        await connectDB()

        const user = await User.findById(userId)
        if (!user) {
            console.log('User does not exists.');
            return { message: 'User does not exists.' }
        }

        const isPasswordValid = await compare(sanitizedPassword, user.password)
        if (!isPasswordValid) {
            console.log('Please insert valid credentials.');
            return { message: 'Please insert valid credentials.' }
        }

        await User.findByIdAndDelete(userId)

        revalidatePath('/')
        console.log('User deleted.');
        return { message: 'User deleted.' }
    } catch (error) {
        console.log('An error occurred while deleting the user: ', error);
        return { message: 'An error occurred while deleting the user.' }
    }
}