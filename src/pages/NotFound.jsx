import { Link } from "react-router-dom";
import { House, Search } from "lucide-react";

function NotFound() {
  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center px-4 pt-12">
      <div className="text-center">
        <h1 className="text-8xl mt-6 font-bold text-blue-600 ">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
             <Link
          to="/"
          className="bg-blue-600  text-white font-medium px-5 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-80 transition-all duration-150"
        >
         <House size={16} />
       Go dashboard
        </Link>

          <Link
           to="/products"
          className="border border-blue-600 text-blue-600 font-medium px-5 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-80  transition-all duration-150"
            >
               <Search size={16} />
             Products
           </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;