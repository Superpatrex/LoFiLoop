"use client"; 
import Link from "next/link";
import './NavBar.css';
import { useState } from "react";

const NavBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setShowSettings(false);
  };

  return (
    <nav>
      <ul>
        <li id="logo">
          <Link href="/chat"><img src="/lofi_loop_logo.png" alt="LoFi Loop Logo"/></Link>
        </li>
        <li id="aboutUs">
          <Link href="/aboutus">About Us</Link>
        </li>
        <li id="settings">
          <p onClick={() => setShowSettings(!showSettings)}>⚙</p>
        </li>
      </ul>
      {showSettings && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#272C4C] rounded-lg shadow-xl z-10 p-4">
                        <h3 className="text-white font-semibold mb-3 border-b border-gray-600 pb-2 m-4">Settings</h3>
                        
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                {/*<label className="text-sm text-gray-300 mb-1">Volume</label>
                                <div className="flex items-center space-x-2">
                                    <span className="text-white">🔊</span>
                                    <input
                                    type="range"
                                    min="0"
                                    max="1" 
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-full"
                                    />
                                </div>*/}
                            </div>
                            
                            {/* <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-1">Theme</label>
                                <select className="bg-gray-700 text-white p-1 rounded">
                                    <option>Dark</option>
                                    <option>Light</option>
                                </select>
                            </div>
                            
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-1">Notifications</label>
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-white text-sm">Enable notifications</span>
                                </div>
                            </div> */}
                            
                            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg mt-2 text-lg m-4"
                                    onClick={handleSignOut}>
                                <Link href="/#">Sign Out</Link>
                            </button>
                        </div>
                    </div>
                )}
    </nav>
    
  );
}

export default NavBar;