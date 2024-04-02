import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

//PUBLIC, get all users
export async function GET(req, res) {
    try {
        await connectDB()
        const url = new URL(req.url)
        const page = url.searchParams.get('page') || 1
        const limit = url.searchParams.get('limit') || 10

        const skip = (page - 1) * limit;

        const users = await User.find({}, {
            '_id': 0,
            'username': 1,
            'avatar': 1,
            'reviews': 1,
            'bio': 1,
            'createdAt': 1
        }).skip(skip).limit(limit);

        // Get total count of users (for pagination metadata)
        const totalCount = await User.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / limit);

        // Prepare response object with users and pagination metadata
        const response = {
            users: users,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalUsers: totalCount
            }
        };

        return NextResponse.json(response);
    } catch (error) {
        console.log('An error occurred while fetching users: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching users.' }, { status: 500 })
    }
}