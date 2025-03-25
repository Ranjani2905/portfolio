import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // ✅ Show typing indicator
  const chatRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsTyping(true); // ✅ Show "Bot is typing..."

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to chatbot!", sender: "bot" },
      ]);
    }

    setIsTyping(false); // ✅ Hide "Bot is typing..."
  };
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded-lg shadow-2xl bg-gray-50">
      <h2 className="text-xl font-bold text-center mb-4">Chatbot</h2>
      <div className="h-64 overflow-y-auto bg-orange-100 p-2 rounded flex flex-col gap-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            className={`max-w-[75%] p-3 rounded-2xl text-sm ${
              msg.sender === "user"
                ? "bg-orange-500 text-white self-end"
                : "bg-orange-200 text-black self-start"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="bg-gray-300 text-black p-3 rounded-2xl max-w-[50%] self-start animate-pulse"
          >
            Typing...
          </motion.div>
        )}
        <div ref={chatRef}></div>
      </div>
      <div className="mt-4 flex  items-center">
        <input
          type="text"
          className="flex-1 bg-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} 
          autoFocus
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default Chatbot;
