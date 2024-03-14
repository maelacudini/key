import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    keywords: [
        {
            type: String,
            required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Review = models.Review || mongoose.model('Review', reviewSchema)
export default Review