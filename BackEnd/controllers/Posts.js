import Post from '../models/Posts.js';
import { createError } from '../error.js';
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const createPost = async (req, res, next) => {
    try {
        const { title, prompt, image } = req.body;

        if (!title || !prompt || !image) {
            return next(createError(400, "Title, prompt, and image are required"));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });

        const newPost = new Post({
            title,
            prompt,
            image: cloudinaryResponse.secure_url,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        next(createError(err.response?.status || 500, err.message));
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        next(createError(500, "Could not retrieve posts"));
    }
};