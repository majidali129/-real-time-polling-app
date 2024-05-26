import mongoose from "mongoose";

const pollSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'poll title is required']
    },
    options: [{
      vote: String,
      totalVotes: Number,
    }],
    user: String,
}, {timestamps: true})


export const Poll = mongoose.model('Poll', pollSchema)