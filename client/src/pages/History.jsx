import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

const History = () => {
    const navigate = useNavigate();

    const handleStartNewAnalysis = () => {
        navigate("/userpanel", { state: { focusAnalysis: true } });
    };

    return (
        <div className="flex flex-row justify-center min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col items-center min-h-full w-full lg:w-7/8 bg-[#1B1B1B] py-4 lg:py-8 gap-4 lg:gap-8">
                <div className="self-start ml-4 lg:ml-16 gap-2 lg:gap-4 flex flex-col w-full">
                    <h1 className="text-3xl lg:text-5xl text-white font-[Montserrat] font-bold">
                        Your history
                    </h1>
                </div>
                <div className="flex flex-col items-center w-full px-4">
                    <button
                        className="w-full max-w-xl flex flex-row items-center justify-center gap-4 py-3 sm:py-4 px-6 sm:px-10 
                        lg:px-12 bg-[#3b3b3b] rounded-full hover:bg-[#3b3b3b]/80 transition duration-200 text-base sm:text-lg"
                        onClick={handleStartNewAnalysis}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                        <span className="text-gray-300 font-[Montserrat] text-nowrap">Start new analysis</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default History;
