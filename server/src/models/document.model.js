import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title :String,
    content:String,
    type: String,
    filePath: String,
    createdAt: {type: Date, default: Date.now}
})
export const Document = mongoose.model("Document",documentSchema);