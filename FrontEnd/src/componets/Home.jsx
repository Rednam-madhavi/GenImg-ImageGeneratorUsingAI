import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Home = () => {
  // If you intended to use a variable named "second", make sure it's defined.
  // Otherwise, initialize with an appropriate default (here an empty string).
  const [image, setImage] = useState('');

  return (
    <>
      <div className="bg-gray-900 text-white flex flex-col gap- px-4">
        <h1 className="text-3xl p-6 text-center font-semibold">
          Explore
          <span className="font-semibold text-blue-400"> Gen</span>
          <span className="font-light text-white">Img</span> -
          The AI Image Generator
        </h1>
        <div className="p-2 bg-gray-300 text-gray-900 rounded-lg w-1/2 mx-auto flex gap-2 items-center">
          <Search size={25} />
          <input
            className="bg-gray-300 text-gray-900 w-full outline-none"
            type="search"
            placeholder="Search for images by prompt or name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center p-10">
          <div className="bg-gray-700 rounded-lg bg-cover bg-center overflow-hidden">
            <img
              src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
              alt="Descriptive Alt Text"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
