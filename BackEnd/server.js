import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import PostRouter from './routes/Posts.js';
import ImageRouter from './routes/GenerateImage.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', PostRouter);
app.use('/api/generateimage', ImageRouter);

// Default route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the server' });
});

// Error handler (must be after routes)
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(status).json({ success: false, message, status });
});

// Database connection
const connectToDB = async () => {
    try {
        if (!process.env.MONGODB_CONNECTION_STRING) {
            throw new Error("Missing MongoDB connection string in .env");
        }
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Connected to the database');
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    await connectToDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();


