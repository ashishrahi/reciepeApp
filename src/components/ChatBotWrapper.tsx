import React, { useState } from "react";
import ChatBot from "./ChatBot"; // adjust path as needed
import { MessageCircle, X } from "lucide-react";

const ChatBotWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform"
        title={isOpen ? "Close Chat" : "Open Chat"}
        aria-label="Toggle ChatBot"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* ChatBot UI Panel */}
      {isOpen && (
        <div className="mt-3">
          <ChatBot />
        </div>
      )}
    </div>
  );
};

export default ChatBotWrapper;
