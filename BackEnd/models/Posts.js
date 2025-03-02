import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);