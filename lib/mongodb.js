import mongoose from "mongoose"

let connection

export const connectDB = async () => {
    if (connection) {
        console.log('Using existing MongoDB connection');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connection = true
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }
}

export const closeDBConnection = async () => {
    if (connection) {
        await mongoose.disconnect();
        console.log('MongoDB connection closed.');
    }
}