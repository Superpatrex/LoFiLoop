import { useState } from "react";

export default function Chat() {
    //hardcoded
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how’s the music?", sender: "user" },
    { id: 2, text: "Lofi vibes are perfect!", sender: "bot" },
    { id: 3, text: "Nice, any recommendations?", sender: "user" },
    { id: 4, text: "Try 'Lofi Dreams' by Chill Beats.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="relative flex h-screen bg-gray-900">
      {/* Top Nav Bar */}
      <div className="absolute top-0 left-0 w-full h-16 bg-[#272C4C]"></div>

      {/* Chat */}
      <div className="relative flex flex-col w-1/4 min-w-[280px] h-[85%] bg-[#848AAB] bg-opacity-80 backdrop-blur-lg p-4 shadow-lg rounded-xl ml-auto mt-20">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`py-2 px-4 rounded-full text-sm max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-[#272C4C] text-white self-end ml-auto"
                  : "bg-[#CBC0BD] text-black self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Ask LofiLoop AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 bg-[#CBC0BD] text-gray-800 rounded-full focus:outline-none placeholder-gray-500"
          />
          <button onClick={sendMessage} className="ml-2 px-5 py-3 bg-[#272C4C] text-white rounded-full">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
