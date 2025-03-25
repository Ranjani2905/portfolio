import background from "../../../assets/college.jpg";
import { Link } from "react-router-dom";
import student from "../../../assets/teacher.jpg";
import staff from "../../../assets/clgstud.jpg";
import admin from "../../../assets/admin.jpg";

interface CardProps {
  image: string;
  title: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ image, title, link }) => {
  return (
    <Link
      to={link}
      className="group relative w-48  bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-400 to-red-600 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

      <img
        src={image}
        alt={title}
        className="w-48 h-48 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-110"
      />
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-black-200 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </Link>
  );
};

const Loginpage: React.FC = () => {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Cards inside a larger pink gradient div */}
      <div className="w-1/2 h-1/2 bg-white/20 backdrop-blur-lg p-16 rounded-3xl shadow-2xl  border-white/30 flex flex-col justify-center items-center">
        {/* Title Inside the Card Container */}
        <h2 className="text-2xl font-bold text-black bg-clip-text mb-8 border-b-4 pt-5 border-red-400">
          Select User Type
        </h2>

        <div className="flex justify-center pb-10 gap-16">
          <Card image={admin} title="Admin" link="/loginOrsignup/admin" />
          <Card image={student} title="Student" link="/loginOrsignup/student" />
          <Card image={staff} title="Staff" link="/loginOrsignup/staff" />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
