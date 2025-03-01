import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PostRouter from './routes/Posts.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

//error handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(status).json({
        success: false,
        message,
        status,
    });
});

app.use('/api/posts', PostRouter);


//default route
app.get('/', async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the server',
    });
});

//Function to connect to the database
const connectToDB = async () => {
    mongoose.set("strictQuery", true)
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.error(err);
        })
};

//Function to start the server
const startServer = async () => {
    try {
        connectToDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();