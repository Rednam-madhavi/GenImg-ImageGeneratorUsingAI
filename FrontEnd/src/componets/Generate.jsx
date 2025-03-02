import React, { useState, useCallback, useEffect } from "react";
import { Sparkles, Save } from "lucide-react";
import Loading from "./Loading";
import { GenerateAIImage } from "../api";

const Generate = () => {
  const [post, setPost] = useState({ name: "", prompt: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load last saved image from local storage
  useEffect(() => {
    const savedImage = localStorage.getItem("generatedImage");
    if (savedImage) {
      setPost((prev) => ({ ...prev, image: savedImage }));
    }
  }, []);

  // Handler for generating the image
  const handleGenerate = useCallback(async () => {
    if (!post.prompt) return;
    setError("");
    setLoading(true);
    try {
      const res = await GenerateAIImage({ prompt: post.prompt });
      if (res?.data?.image) {
        const newImage = `data:image/jpeg;base64,${res.data.image}`;
        setPost((prev) => ({ ...prev, image: newImage }));
      } else {
        setError("Failed to generate image.");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      setError("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  }, [post.prompt]);

  // Handler for saving the image
  const handleSave = useCallback(() => {
    if (!post.name || !post.image) {
      alert("Please enter an image name and generate an image first.");
      return;
    }
    localStorage.setItem("generatedImage", post.image);
    alert(`Image "${post.name}" saved!`);
  }, [post.name, post.image]);

  return (
    <div className="min-h-[91vh] bg-gray-900 text-white flex flex-col md:flex-row gap-10 justify-center items-center px-5 py-10">
      <div className="flex flex-col gap-6 w-full md:w-1/2 max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center md:text-left">Generate Image with Prompt</h1>
        <p className="text-gray-300 text-sm text-center md:text-left">Write your prompt according to the image you want to generate!</p>

        <input
          type="text"
          placeholder="Enter Name of the Image..."
          value={post.name}
          onChange={(e) => setPost((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full p-3 text-lg text-gray-900 rounded-lg bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          placeholder="Enter your prompt..."
          value={post.prompt}
          onChange={(e) => setPost((prev) => ({ ...prev, prompt: e.target.value }))}
          className="w-full p-4 h-36 text-lg text-gray-900 rounded-lg bg-gray-100 shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex gap-4">
          <button
            onClick={handleGenerate}
            disabled={!post.prompt || loading}
            className="flex items-center justify-center gap-2 p-3 w-1/2 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={22} /> Generate
          </button>

          <button
            onClick={handleSave}
            disabled={!post.name || !post.image}
            className="flex items-center justify-center gap-2 p-3 w-1/2 text-lg font-semibold bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={22} /> Save
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-lg flex justify-center">
        <div className="h-96 w-96 bg-gray-700 text-white rounded-lg shadow-lg flex items-center justify-center">
          {loading ? (
            <Loading />
          ) : post.image ? (
            <img src={post.image} alt="Generated" className="h-full w-full object-contain" />
          ) : (
            <p className="text-gray-500">Generated Image</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
