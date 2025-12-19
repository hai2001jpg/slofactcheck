import Sidebar from "@/components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import AnalysisModal from "@/components/ui/AnalysisModal";

const History = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalAnalysis, setModalAnalysis] = useState(null);
    // Mapping backend model names to display names
    const modelDisplayMap = {
        "mbert": "mBERT",
        "xlm_roberta": "XLM-RoBERTa",
        "mt5": "mT-5",
        "mdeberta_v3": "mDeBERTa-v3",
    };

    useEffect(() => {
        if (!user?.uid) return;
        setLoading(true);
        setError("");
        fetch(`http://localhost:5000/analysis?userId=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                setAnalyses(data.analyses || []);
            })
            .catch(err => setError("Failed to fetch history"))
            .finally(() => setLoading(false));
    }, [user?.uid]);

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
                <div className="flex flex-col items-center w-full gap-8">
                    <button
                        className="flex flex-row items-center justify-center gap-4 py-3 sm:py-4 px-6 sm:px-10 
                        lg:px-12 bg-[#3b3b3b] rounded-full hover:bg-[#3b3b3b]/80 transition duration-200 text-base sm:text-lg cursor-pointer"
                        onClick={handleStartNewAnalysis}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                            <span className="text-gray-300 font-[Montserrat] text-nowrap">Start new analysis</span>
                    </button>
                </div>
                {loading && <div className="text-white text-2xl font-[Montserrat] font-semibold">Loading analysis...</div>}
                {error && <div className="text-red-500 text-2xl font-[Montserrat] font-semibold">{error}</div>}
                {analyses.length === 0 && !loading && <div className="text-gray-400 text-2xl font-[Montserrat] font-semibold">No analysis found.</div>}
                    <div className="flex flex-col w-3/5 gap-4 mt-8 font-[Montserrat]">
                        {/* Header Row*/}
                        {analyses.length > 0 && (
                            <div className="grid grid-cols-[minmax(0,1fr)_100px_100px_120px] gap-4 px-2 text-gray-400 text-sm">
                                <div>Input</div>
                                <div className="text-center">Result</div>
                                <div className="text-center">Confidence</div>
                                <div className="text-center">Model</div>
                            </div>
                        )}
                        {analyses.map(a => (
                            <div
                                key={a.id}
                                className="bg-[#222] rounded-lg p-4 grid grid-cols-[minmax(0,1fr)_100px_100px_120px] gap-4 items-center text-white shadow cursor-pointer hover:bg-[#333]"
                                onClick={() => setModalAnalysis(a)}>
                                <div className="truncate max-w-full" title={a.input}>{a.input}</div>
                                <div className={`text-center font-bold ${String(a.result) === 'false' ? 'text-red-500' : 'text-blue-500'}`}>{a.result}</div>
                                <div className="text-center font-bold">{(Math.round(Number(a.confidence) * 10000) / 100).toFixed(2)}%</div>
                                <div className="text-center font-bold">{modelDisplayMap[a.model] || a.model}</div>
                            </div>
                        ))}
                        <AnalysisModal analysis={modalAnalysis} onClose={() => setModalAnalysis(null)} />
                    </div>
            </div>
        </div>
    )
}

export default History;