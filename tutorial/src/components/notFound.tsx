// NotFound.tsx
import { Link } from "react-router-dom";
import file from "../assets/filenotfound.jpg";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img src={file}></img>
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
