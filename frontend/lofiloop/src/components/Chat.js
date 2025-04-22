"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Waveform from "./Waveform";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const pictureNameSong = [
    ["/cloud_city.png", "Cloud City", "cloud.wav", "superpatrex"], 
    ["/neon_jellyfish.png", "Neon Jellyfish", "neon_jellyfish.wav", "superpatrex"],
    ["/gentle_rain.png", "Gentle Rain", "gentle_rain.wav", "superpatrex"],
    ["/lavender.png", "Lavender", "lavender.wav", "superpatrex"],
    ["/cat.png", "Piano Cat", "cat.wav", "superpatrex"],
    ["/library.png", "Library", "library.wav", "superpatrex"],
    ["/train.png", "Train", "train.wav", "superpatrex"],
    ['/skatepark.png', "Skatepark", "skatepark.wav", "superpatrex"],
    ["/snow_city.png", "Snow City", "snow.wav", "superpatrex"],
    ["/underwater_cafe.png", "Underwater Cafe", "underwater_cafe.wav", "superpatrex"],
    ["/attic.png", "Attic", "attic.wav", "superpatrex"],
    ["/tea_party.png", "Tea Party", "tea_party.wav", "superpatrex"],
    ["/lukrembo_biscuit.png", "Lukrembo Biscuit", "lukrembo_biscuit.wav", "superpatrex"],
    ["/sunflower.png", "Sunflower", "sunflower.wav", "superpatrex"],
    ["/submarine.png", "Submarine", "submarine.wav", "superpatrex"],
    ["/rooftop.png", "Rooftop", "rooftop.wav", "superpatrex"],
    ["/i_dont_know.png", "I don't know", "alysha.wav", "artemis"],
    ["/fine_tuning.png", "Fine Tuning", "calvin.wav", "calvinc903"],
    ["/projects.png", "I can't I have projects to do", "jessica.wav", "0zzy4"],
    ["/forgotten.png", "Forgotten", "anna.wav", "zha0anna"],
    ["/frontend_backend.png", "Was Frontend Not Backend", "xinyu.wav", "c-mfy"],
    ["/panda.png", "Eating Panda", "eric.wav", "eson39"],
    ["/logo_time.png", "Logo Time!", "aumrita.wav", "aumritam"],
    ["/improved.png", "Improved", "krupa.wav", "krupaapatell"]
  ];
  
  const pickRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * pictureNameSong.length);
    const randomSong = pictureNameSong[randomIndex];
    return randomSong;
  };

  const [curPictureName, setPictureName] = useState(null);

  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // decode token and set user ID
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id); // assuming token payload has `id`
    }

    setPictureName(pickRandomSong());
  }, []);

  // const currentUserId = "67be4b0a706d6b50fd8ad65a";
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/message/messages");
        setMessages(response.data.reverse());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const highlightCommands = (text) => {
    // split on “/word” patterns, keep delimiters
    const parts = text.split(/(\/\w+)/g);
    return parts.map((part, idx) =>
      part.startsWith("/") ? (
        <span key={idx} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // send new message
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { senderId: currentUserId, text: input};
    const token = localStorage.getItem("token"); // get token
    
    try {
      const response = await fetch("http://localhost:3001/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMessage),
      });

      const responseText = await response.text(); // Get the raw response body

      console.log("Response Status:", response.status);
      console.log("Response Text:", responseText); // Log raw response
      

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = JSON.parse(responseText); // Try parsing the response text as JSON

      // Ensure new message gets added to the UI
      setMessages((prevMessages) => [...prevMessages, responseData]);
      
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      const audioSrc = audioRef.current.src;
      const fileName = audioSrc.substring(audioSrc.lastIndexOf("/") + 1).replace(".mp3", "");
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // reset state
    setProgress(0);
    setIsPlaying(true);

    // ensure volume is applied
    audio.volume = volume;

    // handlers
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const handleEnded = () => {
      const nextSong = pickRandomSong();
      setPictureName(nextSong);
    };

    // attach
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended",    handleEnded);

    // play the new track
    audio.play();

    // cleanup
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended",    handleEnded);
    };
  }, [curPictureName, volume]);

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const returnNumberAndTextForListeners = () => {
    const number = 1; // Random number between 1 and 100
    const text = number === 1 ? "listener" : "listeners";
    return (
      <span className="font-bold">
        {number} {text}
      </span>
    );
  };

  if (!curPictureName) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900">
      <div className="flex flex-grow w-full h-screen w-screen">
        <div className="flex flex-col justify-center w-2/3 pt-8 pr-8 pl-8">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full w-fit absolute top-40 hover:bg-gray-700 transition-colors duration-300">
            {returnNumberAndTextForListeners()}
          </div>

          <div className="mt-10 flex flex-col items-center space-y-6">
            <div className="relative w-80 h-80 rounded-full bg-gray-600 flex items-center justify-center shadow-xl">
              <div className="absolute inset-0">
                  <audio
                  key={curPictureName[2]} 
                  ref={audioRef}
                  src={curPictureName[2]}
                  autoPlay
                  crossOrigin="anonymous" // <-- Add this for audio context analysis
                />
                <Waveform
                  audioEl={audioRef.current}
                  isPlaying={isPlaying}
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 flex justify-center items-center">
                <img 
                  src={curPictureName[0]}
                  alt="Album Cover" 
                  className="w-56 h-56 rounded-full object-cover animate-spin"
                  style={{ animationDuration: '40s' }}
                />
              </div>
            </div>
            <h2 className="text-white text-3xl font-bold mb-0">{curPictureName[1]}</h2>
            <p className="text-gray-400 text-lg leading-tight mt-0">AI-generated Lofi Music by <span className="font-bold text-white">{curPictureName[3]}</span></p>
            <div className="w-2/3 mt-4 flex flex-col space-y-2">
              <div className="flex items-center w-full space-x-3">
                <span className="text-white">🔊</span>
                <div className="relative w-24 h-3">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="absolute w-full h-3 bg-gray-600 rounded-full">
                    <div 
                      className="absolute top-0 h-full bg-white rounded-full" 
                      style={{ width: `${volume * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-600 rounded-full relative">
                <div className="absolute top-0 h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="w-full flex justify-between text-white text-sm">
                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
                <span>{audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}</span>
              </div>
            </div>

            {/*<div className="flex items-center justify-center bg-gray-800 p-3 rounded-full shadow-lg">
              <button 
                className="text-white hover:text-gray-300 px-6 py-2 mx-2 bg-gray-700 rounded-full transition-transform hover:scale-110"
                onClick={() => audioRef.current.currentTime = 0}
              >
                <span className="text-xl">⏪︎</span>
              </button>
              <button
                className="text-white hover:text-gray-300 px-6 py-2 mx-2 bg-gray-700 rounded-full transition-transform hover:scale-110"
              >
                <span className="text-2xl" style={{ fontFamily: "'Segoe UI Symbol', 'Arial', 'Helvetica', sans-serif" }}>{isPlaying ? "⏹︎" : "▶"}</span>
              </button>
              <button 
                className="text-white hover:text-gray-300 px-6 py-2 mx-2 bg-gray-700 rounded-full transition-transform hover:scale-110"
                onClick={() => {}}
              >
                <span className="text-xl">⏩︎</span>
              </button>
            </div>*/}
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-[calc(100vh-4rem)] bg-[#848AAB] bg-opacity-80 backdrop-blur-lg p-4 shadow-lg rounded-l-xl" style={{marginTop: '70px'}}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isCurrentUser = msg.senderId === currentUserId;
              return (
                <div key={msg._id}>
                  <div className="flex flex-col items-end pr-2">
                    {msg.username}
                  </div>
                  <div
                    className={`py-2 px-4 rounded-2xl text-md max-w-[75%] break-words ${isCurrentUser
                        ? "bg-[#272C4C] text-white self-end ml-auto text-right"
                        : "bg-[#CBC0BD] text-black self-start text-left"}`}
                  >
                    {highlightCommands(msg.text)}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Ask LofiLoop AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-4 bg-[#CBC0BD] text-gray-800 rounded-full focus:outline-none placeholder-gray-500"
            />
            <button onClick={sendMessage} className="ml-2 px-5 py-3 bg-[#272C4C] text-white rounded-full hover:scale-105">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}