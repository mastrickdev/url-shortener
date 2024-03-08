import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
    },
    clicks: {

        type: Number,
        required: true,
        default: 0
    }
})

export default mongoose.model('shortURLData', Schema)