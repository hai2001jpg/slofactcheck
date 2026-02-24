import { useEffect, useRef, useState } from "react";
import { useFetchAnalyses } from "@/hooks/useFetchAnalyses";
import Sidebar from "@/components/layout/Sidebar";
import AnalysisResult from "@/components/ui/AnalysisResult";
import FactCheckLinks from "@/components/ui/FactCheckLinks";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { WaveLoader } from "@/components/ui/wave-loader";
import StatCard from "@/components/ui/StatCard";
import factCheckIcon from "@/assets/img/factcheck.png";
import disinformationIcon from "@/assets/img/fake.png";
import avgConfidenceIcon from "@/assets/img/graph-up.svg";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserPanel = () => {
    const { user } = useAuth();
    const userName = user?.displayName ?? "Guest";
    const {
        analyses,
        totalFactChecks,
        totalDisinformation,
        avgConfidence,
        loading: analysesLoading,
        error: analysesError,
        refetch: refetchAnalyses
    } = useFetchAnalyses(user);

    const [selectedModel, setSelectedModel] = useState("mBERT");
    const [analysisInput, setAnalysisInput] = useState("");

    const [lastAnalysis, setLastAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const analysisTextareaRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    // focus on input
    useEffect(() => {
        if (location.state?.focusAnalysis && analysisTextareaRef.current) {
            analysisTextareaRef.current.focus();
            navigate(location.pathname, { replace: true });
        }
    }, [location.pathname, location.state, navigate]);

    const modelMap = {
        "mBERT": "mbert",
        "XLM-RoBERTa": "xlm_roberta",
        "mT-5": "mt5",
        "mDeBERTa-v3": "mdeberta_v3"
    };

    const handleStartAnalysis = async () => {
        setLoading(true);
        setError("");
        setLastAnalysis(null);
        try {
            const response = await fetch(`${BASE_URL}/analysis`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.uid || "Guest",
                    input: analysisInput,
                    model: modelMap[selectedModel],
                    // topic: "other" 
                })
            });
            if (!response.ok) throw new Error("Server error");
            const data = await response.json();
            setLastAnalysis({
                input: analysisInput,
                result: data.result,
                confidence: Math.round(data.confidence * 10000) / 100 // 2 decimal points
            });
            setAnalysisInput("");
            // refetch states after successful analysis
            if (typeof refetchAnalyses === 'function') {
                refetchAnalyses();
            }
        } catch (err) {
            setError("Failed to analyze: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex flex-row justify-center min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col items-center min-h-full w-full lg:w-7/8 bg-[#1B1B1B] py-4 lg:py-8 gap-4 lg:gap-8">
                <div className="self-start ml-4 lg:ml-16 gap-2 lg:gap-4 flex flex-col w-full">
                    <h1 className="text-3xl lg:text-5xl text-white font-[Montserrat] font-bold">
                        User Panel
                    </h1>
                    <p className="text-white inter-font text-base lg:text-lg">
                        Welcome, {userName}!
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between w-full px-4 lg:px-16 gap-4">
                    <StatCard title="Total Fact Checks" value={totalFactChecks} src={factCheckIcon}/>
                    <StatCard title="Total Disinformation Detected" value={totalDisinformation} src={disinformationIcon}/>
                    <StatCard title="Average Confidence" value={avgConfidence} src={avgConfidenceIcon} />
                </div>
                <div className="bg-[#111111] flex flex-col items-center lg:w-[calc(100%-8rem)] w-[calc(100%-2rem)] p-4 lg:p-6 gap-4 rounded-lg shadow-lg">
                    <h2 className="text-gray-400 font-[Montserrat] text-lg lg:text-xl font-semibold self-start">
                        Disinformation detection
                    </h2>
                    {lastAnalysis ? (
                        <>
                            <AnalysisResult
                                input={lastAnalysis.input}
                                result={lastAnalysis.result}
                                confidence={lastAnalysis.confidence}
                            />
                            <FactCheckLinks input={lastAnalysis.input} />
                            <button
                                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full font-[Montserrat] 
                                hover:bg-blue-700 transition duration-300 cursor-pointer"
                                onClick={() => setLastAnalysis(null)}
                            >
                                Start new analysis
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex flex-row gap-3 items-center justify-center">
                                <label className="text-gray-300 text-sm lg:text-base font-[Montserrat]" htmlFor="model-select">
                                    Select model
                                </label>
                                <select
                                    id="model-select"
                                    value={selectedModel}
                                    onChange={(event) => setSelectedModel(event.target.value)}
                                    className="flex bg-[#1B1B1B] text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-600 font-[Montserrat]">
                                    <option value="mBERT">mBERT</option>
                                    <option value="XLM-RoBERTa">XLM-RoBERTa</option>
                                    <option value="mT-5">mT-5</option>
                                    <option value="mDeBERTa-v3">mDeBERTa-v3</option>
                                </select>
                            </div>
                            <textarea
                                ref={analysisTextareaRef}
                                type="text"
                                placeholder="Enter text to analyze..."
                                rows="6"
                                value={analysisInput}
                                onChange={e => setAnalysisInput(e.target.value)}
                                className="w-full p-4 rounded-md bg-[#1B1B1B] text-white focus:outline-none focus:ring-2 
                                focus:ring-blue-600 transition resize-none"
                            />
                            <button
                                className="flex flex-row justify-between items-center bg-blue-600 py-3 px-6 rounded-full gap-2 
                                hover:bg-blue-700 transition duration-300 cursor-pointer"
                                onClick={handleStartAnalysis}
                                disabled={loading || !analysisInput.trim()}
                            >
                                <div className="text-white font-[Montserrat] flex flex-row items-center justify-center">
                                    {loading 
                                    ? <WaveLoader message="Analyzing" messagePlacement="left" className="w-1 h-3" /> 
                                    : <div className="flex flex-row gap-2 items-center">Start analysis <svg xmlns="http://www.w3.org/2000/svg" 
                                    width="1rem" height="1rem" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                     </div>}
                                </div>

                            </button>
                            {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserPanel;