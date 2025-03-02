import axios from "axios";

const API = axios.create({
    baseURL:  "http://localhost:3000/api/",
});

export const GetPost = async () => await API.get("/posts/");
export const createPost = async (data) => await API.post("/posts/", data);
export const GenerateAIImage = async (data) =>
    await API.post("/generateimage", data);