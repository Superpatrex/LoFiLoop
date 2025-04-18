import Layout from "../../components/Layout";
import NavBar from "../../components/NavBar";
import Chat from "../../components/Chat";

export default function SignUpPage() {
  return (
    <Layout>
      <NavBar />
      <Chat />
    </Layout>
  );
}

// // this was the old Chat.js file

// "use client";
// import { useState, useRef, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import Waveform from "../../components/Waveform";

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [songTitle, setSongTitle] = useState("Loading...");
//   const [volume, setVolume] = useState(0.5);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [showSettings, setShowSettings] = useState(false);

//   const audioRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     // decode token and set user ID
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       setCurrentUserId(decoded.id); // assuming token payload has `id`
//     }
//   }, []);

//   // const currentUserId = "67be4b0a706d6b50fd8ad65a";

//   // fetch messages from MongoDB
//   useEffect (() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/message/messages");
//         const data = await response.json();
//         setMessages(data.reverse());
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   // send new message
//   const sendMessage = async () => {
//     if (input.trim() === "") return;

//     const newMessage = { senderId: currentUserId, text: input};
//     const token = localStorage.getItem("token"); // get token
    
//     try {
//       const response = await fetch("http://localhost:3001/api/message/send", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newMessage),
//       });

//       const responseText = await response.text(); // Get the raw response body

//       console.log("Response Status:", response.status);
//       console.log("Response Text:", responseText); // Log raw response
      

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       const responseData = JSON.parse(responseText); // Try parsing the response text as JSON

//       // Ensure new message gets added to the UI
//       setMessages((prevMessages) => [...prevMessages, responseData]);
      
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }

//     setInput("");
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//     }
//   }, [volume]);

//     useEffect(() => {
//     if (audioRef.current) {
//       const audioSrc = audioRef.current.src;
//       const fileName = audioSrc.substring(audioSrc.lastIndexOf("/") + 1).replace(".mp3", "");
//       setSongTitle(decodeURIComponent(fileName.replace(/_/g, " ")));
//     }
//   }, []);

//   // const sendMessage = () => {
//   //   if (input.trim() === "") return;
//   //   setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
//   //   setInput("");
//   // };

//   const togglePlayPause = () => {
//     if (!audioRef.current) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;
    
//     const updateProgress = () => {
//       setProgress((audio.currentTime / audio.duration) * 100);
//     };
    
//     audio.addEventListener("timeupdate", updateProgress);
//     return () => audio.removeEventListener("timeupdate", updateProgress);
//   }, []);

//   // scroll whenever messages are sent
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);
  

// return (
//     <div className="flex flex-col h-screen w-screen bg-gray-900">
//         <div className="w-full h-16 flex items-center justify-between bg-[#272C4C] px-8 shadow-md">
//             <div className="flex items-center space-x-8">
//                 <h1 className="text-white text-2xl font-bold">LofiLoop</h1>
//                 <nav className="flex space-x-6 text-white">
//                   <a href="#" className="hover:text-gray-400">Home</a>
//                   <a href="#" className="hover:text-gray-400">Chat</a>
//                   <a href="#" className="hover:text-gray-400">About</a>
//                 </nav>
//                       </div>
//                       <div className="relative">
//                         <button 
//                           className="text-white text-lg hover:text-gray-300"
//                           onClick={() => setShowSettings(!showSettings)}
//                         >⚙</button>
                        
//                         {showSettings && (
//                           <div className="absolute right-0 mt-2 w-64 bg-[#272C4C] rounded-lg shadow-xl z-10 p-4">
//                             <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2">Settings</h3>
                            
//                             <div className="space-y-4">
//                               <div className="flex flex-col">
//                                 <label className="text-sm text-gray-300 mb-1">Volume</label>
//                                 <div className="flex items-center space-x-2">
//                                   <span className="text-white">🔊</span>
//                                   <input
//                                     type="range"
//                                     min="0"
//                                     max="1" 
//                                     step="0.01"
//                                     value={volume}
//                                     onChange={(e) => setVolume(parseFloat(e.target.value))}
//                                     className="w-full"
//                                   />
//                                 </div>
//                               </div>
                              
//                               <div className="flex flex-col">
//                                 <label className="text-sm text-gray-300 mb-1">Theme</label>
//                                 <select className="bg-gray-700 text-white p-1 rounded">
//                                   <option>Dark</option>
//                                   <option>Light</option>
//                                 </select>
//                               </div>
                              
//                               <div className="flex flex-col">
//                                 <label className="text-sm text-gray-300 mb-1">Notifications</label>
//                                 <div className="flex items-center">
//                                   <input type="checkbox" className="mr-2" />
//                                   <span className="text-white text-sm">Enable notifications</span>
//                                 </div>
//                               </div>
                              
//                               <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg mt-2">
//                                 Sign Out
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex flex-grow w-full">
//                       <div className="flex flex-col justify-center w-2/3 p-8">
//                         <div className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-full w-fit">
//                           <span className="font-bold">36</span> listeners
//                         </div>

//                         <div className="mt-10 flex flex-col items-center space-y-6">
//                           <div className="relative w-56 h-56 rounded-full bg-gray-600 flex items-center justify-center shadow-xl">
//                             <div className="absolute inset-0">
//                               <Waveform className="w-full h-full" />
//                             </div>
//                             <div className="absolute inset-0 flex justify-center items-center">
//                               <div className="w-40 h-40 bg-gray-500 rounded-full"></div>
//                             </div>
//                           </div>
//                           <h2 className="text-white text-3xl font-bold mb-0">{songTitle}</h2>
//                           <p className="text-gray-400 text-lg leading-tight mt-0">AI-generated Lofi Music</p>

//                           <audio ref={audioRef} src="lukrembo_biscuit.mp3" />

//                           <div className="w-2/3 mt-4 flex flex-col space-y-2">
//                             <div className="flex items-center w-full space-x-3">
//                               <span className="text-white">🔊</span>
//                               <div className="relative w-24 h-3">
//                                 <input
//                                   type="range"
//                                   min="0"
//                                   max="1"
//                                   step="0.01"
//                                   value={volume}
//                                   onChange={(e) => setVolume(parseFloat(e.target.value))}
//                                   className="absolute w-full h-full opacity-0 cursor-pointer z-10"
//                                 />
//                                 <div className="absolute w-full h-3 bg-gray-600 rounded-full">
//                                   <div 
//                                     className="absolute top-0 h-full bg-white rounded-full" 
//                                     style={{ width: `${volume * 100}%` }}
//                                   ></div>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="w-full h-3 bg-gray-600 rounded-full relative">
//                               <div className="absolute top-0 h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
//                             </div>
//                             <div className="w-full flex justify-between text-white text-sm">
//                               <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
//                               <span>{audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}</span>
//                             </div>
//                           </div>

//                           <div className="flex items-center justify-center bg-gray-800 p-3 rounded-full shadow-lg">
//                             <button 
//                               className="text-white hover:text-gray-300 px-6 py-2 mx-2 bg-gray-700 rounded-full transition-transform hover:scale-110"
//                               onClick={() => audioRef.current.currentTime = 0}
//                             >
//                               <span className="text-xl">⏪︎</span>
//                             </button>
//                             <button
//                               className="text-white hover:text-gray-300 px-6 py-2 mx-2 bg-gray-700 rounded-full transition-transform hover:scale-110"
//                             //onClick={togglePlayPause}
//                         >
//                             <span className="text-2xl">{isPlaying ? "⏹︎" : "▶"}</span>
//                         </button>
//                         <button 
//                             className="text-white hover:text-gray-300 px-6 py-2 mx-2 bg-gray-700 rounded-full transition-transform hover:scale-110"
//                             onClick={() => {}}
//                         >
//                             <span className="text-xl">⏩︎</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="flex flex-col w-1/3 h-[calc(100vh-4rem)] bg-[#848AAB] bg-opacity-80 backdrop-blur-lg p-4 shadow-lg rounded-l-xl">
//                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
//                     {messages.map((msg) => {
//                         const isCurrentUser = msg.senderId === currentUserId;
//                         return (
//                             <div
//                                 key={msg._id}
//                                 className={`py-2 px-4 rounded-2xl text-sm max-w-[75%] break-words ${
//                                     isCurrentUser
//                                         ? "bg-[#272C4C] text-white self-end ml-auto text-right"
//                                         : "bg-[#CBC0BD] text-black self-start text-left"
//                                 }`}
//                             >
//                                 {msg.text}
//                             </div>
//                         );
//                     })}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 <div className="mt-4 flex">
//                     <input
//                         type="text"
//                         placeholder="Ask LofiLoop AI..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         className="flex-1 p-3 bg-[#CBC0BD] text-gray-800 rounded-full focus:outline-none placeholder-gray-500"
//                     />
//                     <button onClick={sendMessage} className="ml-2 px-5 py-3 bg-[#272C4C] text-white rounded-full">
//                         Send
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// }