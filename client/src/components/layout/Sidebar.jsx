import { TypingAnimation } from "@/components/ui/typing-animation";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
    const { user, logout } = useAuth();
    const userName = user?.displayName ?? "John Doe";
    const avatarUrl = user?.photoURL ?? "";
    // helper for getting initials
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
    const location = useLocation();
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="bg-[#111111] flex flex-col items-center min-h-full w-1/8 py-8 gap-4">
            <span className="block xl:hidden">
                <TypingAnimation text="SFC" className="text-2xl font-bold text-white space-grotesk" />
            </span>
            <span className="hidden xl:block">
                <TypingAnimation text="SloFactCheck" className="text-2xl font-bold text-white space-grotesk" />
            </span>
            <div className="flex flex-col gap-8 w-full px-4 flex-grow">
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-[#1B1B1B] shadow-lg flex items-center justify-center p-0.5">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={`${userName}'s avatar`}
                                className="h-12 w-12 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-person " viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        )}
                    </div>
                    <span className="text-white font-[Montserrat] font-semibold hidden lg:block">
                        {userName}
                    </span>
                    <span className="text-white font-[Montserrat] font-semibold block lg:hidden">
                        {getInitials(userName)}
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        className={`text-white font-[Montserrat] hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                            </svg>
                            <span className="hidden lg:inline">Home</span>
                        </div>
                    </Link>
                    <Link
                        to="/userpanel"
                        className={`text-white font-[Montserrat] hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/userpanel" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-columns" viewBox="0 0 16 16">
                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>
                            </svg>
                            <span className="hidden lg:inline">User Panel</span>
                        </div>
                    </Link>
                    <Link
                        to="/history"
                        className={`text-white font-[Montserrat] hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/history" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            <span className="hidden lg:inline">History</span>
                        </div>
                    </Link>
                    <Link
                        to="/statistics"
                        className={`text-white font-[Montserrat] hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/statistics" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-bar-chart" viewBox="0 0 16 16">
                                <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                            </svg>
                            <span className="hidden lg:inline">Statistics</span>
                        </div>
                    </Link>
                </div>
            </div>
            <button
                className="flex flex-row items-center w-full self-start justify-center lg:justify-start pt-4 px-4 gap-4 text-red-500 hover:text-red-700 transition duration-300 cursor-pointer border-t border-[#333333]"
                onClick={handleLogout}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                <span className="hidden lg:inline">Log Out</span>
            </button>
            </div>
    )
}

export default Sidebar;
