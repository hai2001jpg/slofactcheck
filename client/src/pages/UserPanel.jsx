import { TypingAnimation } from "@/components/ui/typing-animation";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserPanel = () => {
    const [userName, setUserName] = useState("John Doe");
    const [totalFactChecks, setTotalFactChecks] = useState(0);
    const [totalDisinformation, setTotalDisinformation] = useState(0);
    const [confidence, setConfidence] = useState(0);

    return(
        <div className="bg flex flex-row justify-center min-h-screen overflow-hidden">
            <div className="bg-[#111111] flex flex-col items-center min-h-full w-1/8 py-8 gap-4">
                <TypingAnimation text="SloFactCheck" className="text-2xl font-bold text-white space-grotesk" />
                <div className="flex flex-col gap-8 w-full px-4 flex-grow">
                    <div className="flex flex-col items-center gap-2">
                        <div className="rounded-full bg-[#1B1B1B] shadow-md flex items-center justify-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        </div>  
                        <span className="text-white font-[Montserrat] font-semibold">
                            {userName}
                        </span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link to="/userpanel" className="text-white font-[Montserrat] hover:text-blue-500 transition duration-300">
                            <div className="flex flex-row items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-columns" viewBox="0 0 16 16">
                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>
                                </svg>
                                <span>User Panel</span>
                            </div>
                        </Link>
                        <Link to="/history" className="text-white font-[Montserrat] hover:text-blue-500 transition duration-300">
                            <div className="flex flex-row items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                                <span>History</span>
                            </div>
                        </Link>
                        <Link to="/statistics" className="text-white font-[Montserrat] hover:text-blue-500 transition duration-300">
                            <div className="flex flex-row items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                                    <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                                </svg>
                                <span>Statistics</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <button className="flex flex-row items-center w-full self-start pt-4 px-4 gap-4 text-red-500 hover:text-red-700 transition duration-300 cursor-pointer border-t border-[#333333]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                    Log Out
                </button>

            </div>
            <div className="flex flex-col items-center min-h-full w-7/8 bg-[#1B1B1B] py-8 gap-8">
                <div className="self-start ml-16 gap-4 flex flex-col">
                    <h1 className="text-5xl text-white font-[Montserrat] font-bold">
                        User Panel
                    </h1>
                    <p className="text-white inter-font">
                        Welcome, {userName}!
                    </p>
                </div>
                <div className="flex flex-row justify-between w-full px-16 gap-4">
                    <div className="flex flex-col gap-4 bg-[#111111] p-6 rounded-lg shadow-lg w-1/3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-gray-400 font-[Montserrat] font-semibold">
                                Total Fact Checks
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-file-earmark" viewBox="0 0 16 16">
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                            </svg>
                        </div>
                        <span className="text-white text-xl font-black">{totalFactChecks}</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-[#111111] p-6 rounded-lg shadow-lg w-1/3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-gray-400 font-[Montserrat] font-semibold">
                                Total Disinformation Detected
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="red" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                        </div>
                        <span className="text-white text-xl font-black">{totalDisinformation}</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-[#111111] p-6 rounded-lg shadow-lg w-1/3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-gray-400 font-[Montserrat] font-semibold">
                                Confidence Score
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="green" className="bi bi-bullseye" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>
                            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            </svg>
                        </div>
                        <span className="text-white text-xl font-black">{confidence}</span>
                    </div>
                </div>
                <div className="bg-[#111111] flex flex-col items-center w-[calc(100%-8rem)] p-6 gap-4 rounded-lg shadow-lg">
                    <h2 className="text-gray-400 font-[Montserrat] text-xl font-semibold self-start">
                        Disinformation Analysis
                    </h2>   
                    <textarea type="text" placeholder="Enter text to analyze..." rows="6" className="w-full p-4 rounded-md 
                    bg-[#1B1B1B] text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"/>
                    <button className="flex flex-row justify-between items-center bg-blue-600 py-3 px-6 rounded-full gap-2 hover:bg-blue-700
                    transition duration-300">
                        <span className="text-white font-[Montserrat]">
                            Start analysis
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserPanel;