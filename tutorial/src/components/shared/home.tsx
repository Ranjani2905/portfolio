import { motion } from "framer-motion";
import learn from "../../assets/learn.png";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen mb-40 p-8">
      {/* Left Section - Text Content */}
      <motion.div
        className="md:w-1/2 text-center md:text-left p-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl font-extrabold text-purple-800 mb-4">
          My Learning Journey at
          <span className="text-yellow-500"> Skillmine</span>
        </h1>
        <motion.p
          className="text-lg max-w-2xl mt-6 text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to my documentation! Here, I have compiled everything I
          learned during my internship at{" "}
          <span className="font-semibold text-purple-900">
            Skillmine Technologies Consulting Pvt Ltd
          </span>
          . From Front-end development to advanced frameworks, this is my
          roadmap of growth and exploration.
        </motion.p>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          className="w-80 md:w-96 h-auto cursor-pointer transition-transform duration-300 hover:scale-105"
          src={learn}
          alt="Learning Illustration"
          whileHover={{ scale: 1.05 }}
        />
      </motion.div>

      {/* Chat Assistant */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition duration-300"
        >
          <MessageCircle size={24} />
        </button>
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-purple-800">
              Chat Assistant
            </h2>
            <p className="text-gray-700 text-sm">How can I assist you?</p>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
