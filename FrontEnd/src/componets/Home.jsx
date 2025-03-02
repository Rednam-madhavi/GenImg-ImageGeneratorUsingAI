import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Home = ({ generatedImage }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col gap-4 px-4">
      <h1 className="text-3xl p-6 text-center font-semibold">
        Explore
        <span className="font-semibold text-blue-400"> Gen</span>
        <span className="font-light text-white">Img</span> - The AI Image Generator
      </h1>
      <div className="p-2 bg-gray-300 text-gray-900 rounded-lg w-1/2 mx-auto flex gap-2 items-center">
        <Search size={25} />
        <input
          className="bg-gray-300 text-gray-900 w-full outline-none"
          type="search"
          placeholder="Search for images by prompt or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center p-10">
        {generatedImage && (
          <div className="bg-gray-700 rounded-lg bg-cover bg-center overflow-hidden">
            <img
              src={generatedImage}
              alt="Generated Image"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
