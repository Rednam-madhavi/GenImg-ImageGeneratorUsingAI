import Post from "../models/Posts.js";
import dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

//Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


//Get all posts

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (err) {
        next(createError(err.status, err?.response?.data?.err?.message || err.message));
    }
};


//Crerate a new post
const createPost = async (req, res, next) => {
    try {
        const { title, prompt, image } = req.body;
        const imageUrl = await cloudinary.uploader.upload(image);
        const newPost = await Post.create({
            title,
            prompt,
            image: imageUrl,
        });
        // await newPost.save();
        return res.status(201).json({
            success: true,
            data: newPost,
        });
    } catch (err) {
        next(createError(err.status, err?.response?.data?.err?.message || err.message));
    }
};