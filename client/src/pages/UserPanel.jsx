import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const UserPanel = () => {
    const { user } = useAuth();
    const userName = user?.displayName ?? "Guest";
    const [totalFactChecks, setTotalFactChecks] = useState(0);
    const [totalDisinformation, setTotalDisinformation] = useState(0);
    const [confidence, setConfidence] = useState(0);
    const [selectedModel, setSelectedModel] = useState("mBERT");
    const [analysisInput, setAnalysisInput] = useState("");
    const [analysisResult, setAnalysisResult] = useState(null);
    const [lastAnalysis, setLastAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const analysisTextareaRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.focusAnalysis && analysisTextareaRef.current) {
            analysisTextareaRef.current.focus();
            navigate(location.pathname, { replace: true });
        }
    }, [location.pathname, location.state, navigate]);

    // Helper to map UI model names to backend model names
    const modelMap = {
        "mBERT": "mbert",
        "XLM-RoBERTa": "xlm_roberta",
        "mT-5": "mt5",
        "mDeBERTa-v3": "mdeberta_v3"
    };

    const handleStartAnalysis = async () => {
        setLoading(true);
        setError("");
        setAnalysisResult(null);
        try {
            const response = await fetch("http://localhost:5000/analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?.uid || "anonymous",
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
            setAnalysisResult(data.result);
            setConfidence(data.confidence * 100);
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
                    <div className="flex flex-col gap-4 bg-[#111111] p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-1/3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-gray-400 font-[Montserrat] font-semibold text-base lg:text-lg">
                                Total Fact Checks
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-file-earmark" viewBox="0 0 16 16">
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                            </svg>
                        </div>
                        <span className="text-white text-lg lg:text-xl font-black">{totalFactChecks}</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-[#111111] p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-1/3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-gray-400 font-[Montserrat] font-semibold text-base lg:text-lg">
                                Total Disinformation Detected
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="red" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                        </div>
                        <span className="text-white text-lg lg:text-xl font-black">{totalDisinformation}</span>
                    </div>
                    <div className="flex flex-col gap-4 bg-[#111111] p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-1/3">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-gray-400 font-[Montserrat] font-semibold text-base lg:text-lg">
                                Confidence Score
                            </h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="green" className="bi bi-bullseye" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>
                            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            </svg>
                        </div>
                        <span className="text-white text-lg lg:text-xl font-black">0</span>
                    </div>
                </div>
                <div className="bg-[#111111] flex flex-col items-center lg:w-[calc(100%-8rem)] w-[calc(100%-2rem)] p-4 lg:p-6 gap-4 rounded-lg shadow-lg">
                    <h2 className="text-gray-400 font-[Montserrat] text-lg lg:text-xl font-semibold self-start">
                        Misinformation detection
                    </h2>   
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
                        className="w-full p-4 rounded-md bg-[#1B1B1B] text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
                    />
                    <button
                        className="flex flex-row justify-between items-center bg-blue-600 py-3 px-6 rounded-full gap-2 hover:bg-blue-700 transition duration-300"
                        onClick={handleStartAnalysis}
                        disabled={loading || !analysisInput.trim()}
                    >
                        <span className="text-white font-[Montserrat]">
                            {loading ? "Analyzing..." : "Start analysis"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                    {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
                    {lastAnalysis && (
                        <div className="text-white mt-2 text-base border border-gray-700 rounded p-3 font-[Montserrat] flex flex-col gap-2">
                            <div>{lastAnalysis.input}</div>
                            <div className="flex flex-row gap-4 justify-evenly">
                                <div className="flex flex-row gap-2">
                                    <span className="font-semibold">Result:</span> 
                                    <b className={String(lastAnalysis.result) === 'false' ? 'text-red-500' : 'text-blue-500'}>{String(lastAnalysis.result)}</b>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <span className="font-semibold">Confidence:</span>
                                    <b>{lastAnalysis.confidence}%</b></div>
                                </div>
                            </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserPanel;
