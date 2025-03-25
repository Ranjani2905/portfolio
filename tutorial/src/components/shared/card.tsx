import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  badgeText?: string; // Optional badge
  className?: string;
}

export default function Card({
  image,
  title,
  description,
  link,
  badgeText,
  className = "",
}: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-white w-75 h-110 rounded-2xl shadow-lg overflow-hidden p-4 max-w-sm transition-transform duration-300 hover:shadow-2xl ${className}`}
    >
      {/* Badge at the Top Right */}
      {badgeText && (
        <span className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {badgeText}
        </span>
      )}

      {/* Image Section */}
      <div className="w-60 h-48 overflow-hidden rounded-lg">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-purple-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>

        {/* View Link */}
        <a
          href={link}
          className="flex items-center gap-1 mt-4 text-purple-600 hover:text-purple-700 transition duration-300 font-semibold"
        >
          View <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}
