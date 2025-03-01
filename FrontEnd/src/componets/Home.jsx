import { Search } from 'lucide-react'
import React from 'react'

const Home = () => {
    return (
        <>
            <div className="h-[90vh] bg-gray-900 text-white flex flex-col gap- px-4">
                <h1 className='text-3xl p-6 text-center font-semibold'>
                    Explore
                    <span className='font-semibold text-blue-400'> Gen</span>
                    <span className='font-light text-white'>Img</span> -
                    The AI Image Generator
                </h1>
                <div className='p-2 bg-gray-300 text-gray-900 rounded-lg w-1/2 mx-auto flex gap-2 items-center'>
                    <Search size={25} />
                    <input
                        className='bg-gray-300 text-gray-900 w-full outline-none'
                        type="search"
                        placeholder='Search for images by prompt or name'
                    />
                </div>

            </div>

        </>
    )
}

export default Home
