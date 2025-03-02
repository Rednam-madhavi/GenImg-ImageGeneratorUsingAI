import dotenv from 'dotenv';
import axios from 'axios';
import { createError } from '../error.js';

dotenv.config();

export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return next(createError(400, "Prompt is required"));
        }

        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt,
                n: 1,
                size: "1024x1024",
                response_format: "b64_json"
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        const generatedImage = response.data.data[0].b64_json;
        return res.status(200).json({ success: true, image: generatedImage });
    } catch (err) {
        console.error(err);
        next(createError(err.response?.status || 500, err.response?.data?.error?.message || err.message));
    }
};