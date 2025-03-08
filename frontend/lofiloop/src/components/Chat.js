"use client";
import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how’s the music?", sender: "user" },
    { id: 2, text: "Lofi vibes are perfect!", sender: "bot" },
    { id: 3, text: "Nice, any recommendations?", sender: "user" },
    { id: 4, text: "Try 'Lofi Dreams' by Chill Beats.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [songTitle, setSongTitle] = useState("Loading...");
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const audioSrc = audioRef.current.src;
      const fileName = audioSrc.substring(audioSrc.lastIndexOf("/") + 1).replace(".mp3", "");
      setSongTitle(decodeURIComponent(fileName.replace(/_/g, " ")));
    }
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
    setInput("");
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900">
      <div className="w-full h-16 flex items-center justify-between bg-[#272C4C] px-8 shadow-md">
        <div className="flex items-center space-x-8">
          <h1 className="text-white text-2xl font-bold">LofiLoop</h1>
          <nav className="flex space-x-6 text-white">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">Resource</a>
            <a href="#" className="hover:text-gray-400">About Us</a>
          </nav>
        </div>
        <div className="text-white text-sm">Account Stuff</div>
      </div>

      <div className="flex flex-grow w-full">
        <div className="flex flex-col justify-center w-2/3 p-8">
          <div className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-full w-fit">
            <span className="font-bold">36</span> listeners
          </div>

          <div className="mt-10 flex flex-col items-center space-y-6">
            <div className="relative w-56 h-56 rounded-full bg-gray-600 flex items-center justify-center shadow-xl">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-40 h-40 bg-gray-500 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-white text-3xl font-bold">{songTitle}</h2>
            <p className="text-gray-400 text-lg">AI-generated Lofi Music</p>

            <audio ref={audioRef} src="lukrembo_biscuit.mp3" />

            <div className="w-2/3 mt-4 flex flex-col items-center space-y-2">
              <div className="w-full h-3 bg-gray-600 rounded-full relative">
                <div className="absolute top-0 h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="w-full flex justify-between text-white text-sm">
                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
                <span>{audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}</span>
              </div>
            </div>

            <div className="flex space-x-6 mt-4">
              <button className="text-white bg-gray-700 p-4 rounded-full text-lg shadow-md">⏮</button>
              <button
                className="text-white bg-gray-700 p-5 rounded-full text-lg shadow-md"
                onClick={togglePlayPause}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button className="text-white bg-gray-700 p-4 rounded-full text-lg shadow-md">⏭</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-[calc(100vh-4rem)] bg-[#848AAB] bg-opacity-80 backdrop-blur-lg p-4 shadow-lg rounded-l-xl">
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
    </div>
  );
}
