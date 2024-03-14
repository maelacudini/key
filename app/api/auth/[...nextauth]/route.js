import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { compare } from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import xss from "xss";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const sanitizedEmail = xss(email)
                    const sanitizedPassword = xss(password)

                    await connectDB()
                    const user = await User.findOne({ email: sanitizedEmail })

                    if (!user) {
                        NextResponse.json({ message: 'Please enter valid credentials.' }, { status: 404 })
                        return
                    }

                    const isPasswordValid = await compare(sanitizedPassword, user.password)

                    if (!isPasswordValid) {
                        NextResponse.json({ message: 'Please enter valid credentials.' }, { status: 404 })
                        return
                    }
                    return user
                } catch (error) {
                    return NextResponse.json({ message: 'An error has occurred while logging in.' }, { status: 500 })
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // console.log('jwt callback:', { token, user, session });
            if (user) {
                return {
                    ...token,
                    id: user._id,
                    username: user.username,
                    avatar: user.avatar,
                    bio: user.bio
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            // console.log('Session callback:', { session, token, user });
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    avatar: token.avatar,
                    bio: token.bio
                }
            }
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, //1 day session
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }