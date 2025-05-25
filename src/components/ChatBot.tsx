import React, { useState } from "react";
import axios from "axios";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; type: "user" | "bot" }[]>([
    { text: "Hello! How can I help you today?", type: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...messages.map((m) => ({
              role: m.type === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { text: botMessage, type: "bot" }]);
    } catch (err) {
      console.error("OpenAI API error:", err);
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong.", type: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border shadow-xl rounded-xl w-72 h-96 flex flex-col overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold">ChatBot Assistant</div>

      <div className="flex-1 p-2 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm px-3 py-2 rounded-md max-w-[80%] ${
              msg.type === "user"
                ? "bg-blue-100 self-end ml-auto text-right"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400">Typing...</div>}
      </div>

      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message"
          className="flex-1 px-3 py-1 border rounded-full text-sm focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
