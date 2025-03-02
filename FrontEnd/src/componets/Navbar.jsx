import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-3 bg-gray-800 text-white px-7 sticky top-0 z-10 border-b border-blue-400">
            <Link to="/" className="font-semibold text-xl text-blue-400">
                Gen<span className="font-light text-white">Img</span>
            </Link>

            <Link
                to="/generate"
                className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 flex gap-1 transition-all"
            >
                <div className="flex justify-center items-center">
                    <Plus size={20} />
                </div>
                New Image
            </Link>
        </nav>
    );
};

export default Navbar;