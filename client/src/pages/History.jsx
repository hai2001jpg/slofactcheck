import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useFetchAnalyses } from "@/hooks/useFetchAnalyses";
import HistoryList from "@/components/ui/HistoryList";

const History = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    // model names mapping
    const modelDisplayMap = {
        "mbert": "mBERT",
        "xlm_roberta": "XLM-RoBERTa",
        "mt5": "mT-5",
        "mdeberta_v3": "mDeBERTa-v3",
    };
    const { analyses, loading, error } = useFetchAnalyses(user);
    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;
    const totalPages = Math.ceil(analyses.length / pageSize);
    const paginatedAnalyses = analyses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleStartNewAnalysis = () => {
        navigate("/userpanel", { state: { focusAnalysis: true } });
    };

    return (
        <div className="flex flex-row min-h-screen bg-[#1B1B1B] overflow-x-hidden">
            <Sidebar />
            <div className="flex flex-col items-center min-h-full w-full lg:w-7/8 py-4 lg:py-8 gap-4 lg:gap-8">
                <div className="self-start w-full max-w-6xl ml-2 sm:ml-4 lg:ml-16 gap-2 lg:gap-4 flex flex-col">
                    <h1 className="text-3xl lg:text-5xl text-white montserrat font-bold">
                        History
                    </h1>
                </div>
                {loading && <div className="text-white text-xl sm:text-2xl montserrat font-semibold">Loading data...</div>}

                {error && <div className="text-red-500 text-xl sm:text-2xl montserrat font-semibold">{error}</div>}

                {analyses.length === 0 && !loading && <div>
                    <div className="text-gray-400 text-xl sm:text-2xl montserrat font-semibold">No analysis found.</div>
                    <div className="flex flex-col items-center w-full gap-8">
                        <button
                            className="flex flex-row items-center justify-center gap-3 py-3 sm:py-4 px-4 sm:px-8 lg:px-12 bg-[#3b3b3b]
                            rounded-full hover:bg-[#3b3b3b]/80 transition duration-200 text-base sm:text-lg cursor-pointer"
                            onClick={handleStartNewAnalysis}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-plus-lg"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                </svg>
                                <span className="text-gray-300 montserrat whitespace-nowrap">Start new analysis</span>
                        </button>
                    </div>
                </div>}

                <HistoryList
                    analyses={analyses}
                    paginatedAnalyses={paginatedAnalyses}
                    modelDisplayMap={modelDisplayMap}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default History;
