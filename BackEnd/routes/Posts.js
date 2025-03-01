import express from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/Posts.js';

const PostRouter = express.Router();

PostRouter.get('/', getPosts);
PostRouter.post('/', createPost);

export default PostRouter;