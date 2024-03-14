import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { compare, hash } from "bcryptjs";
import xss from "xss";

//PUBLIC, ADD USER
export async function POST(req, res) {
    try {
        const { username, email, password } = await req.json()

        //sanitize fields
        const sanitizedUsername = xss(username)
        const sanitizedEmail = xss(email)
        const sanitizedPassword = xss(password)

        //hash password
        const hashedPassword = await hash(sanitizedPassword, 12)

        //connect db
        await connectDB()

        //check if user already exists with email
        const existingUser = await User.findOne({ email: sanitizedEmail })
        if (existingUser) {

            console.log('User already exists.');
            return NextResponse.json({ message: 'User already exists.' }, { status: 400 })
        }

        //check if username is already taken
        const usernameTaken = await User.findOne({ username: sanitizedUsername })
        if (usernameTaken) {

            console.log('Username is already taken.');
            return NextResponse.json({ message: 'Username is already taken.' }, { status: 400 })
        }

        //check if the email is valid 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!sanitizedEmail.trim() || !emailPattern.test(sanitizedEmail)) {
            console.log('Invalid email format.');
            return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
        }

        //check if the password is valid
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!sanitizedPassword.trim() || !passwordPattern.test(sanitizedPassword)) {
            console.log('Invalid password format.');
            return NextResponse.json({ message: 'Invalid password format.' }, { status: 400 });
        }

        //create user
        const user = await User.create({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword
        })


        console.log('User added: ', username);
        return NextResponse.json({ message: 'User added.' }, { status: 200 })
    } catch (error) {
        console.log('An error occurred while adding a user: ', error);
        return NextResponse.json({ message: 'An error occurred while adding a user.' }, { status: 500 })
    }
}

//PRIVATE, GET USER BY ID (maybe public? i need user username in cards homepage)
export async function GET(req, res) {
    try {
        await connectDB()
        const url = new URL(req.url)
        const userId = url.searchParams.get('userId')

        const user = await User.findById(userId)
        if (!user) {
            console.log('User does not exists.');
            NextResponse.json({ message: 'User does not exists.' }, { status: 404 })
            return null
        }

        const { email, username, reviews, avatar, bio, _id } = user;

        return NextResponse.json({ email, username, reviews, avatar, bio, _id })
    } catch (error) {
        console.log('An error occurred while fetching the review: ', error);
        return NextResponse.json({ message: 'An error occurred while fetching the review.' }, { status: 500 })
    }
}


//PRIVATE, DELETE USER 
export async function DELETE(req, res) {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     return NextResponse.json({ message: 'No token, no access.' }, { status: 401 })
    // }

    try {
        const { userId, password } = await req.json()
        await connectDB()

        const user = await User.findById(userId)
        if (!user) {

            console.log('User does not exists.');
            NextResponse.json({ message: 'User does not exists.' }, { status: 404 })
            return null
        }

        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {

            console.log('Please insert valid credentials.');
            NextResponse.json({ message: 'Please insert valid credentials.' }, { status: 401 })
            return null
        }

        await User.findByIdAndDelete(userId)


        console.log('User deleted.');
        return NextResponse.json({ message: 'User deleted.' })
    } catch (error) {
        console.log('An error occurred while deleting the user: ', error);
        return NextResponse.json({ message: 'An error occurred while deleting the user.' }, { status: 500 })
    }
}