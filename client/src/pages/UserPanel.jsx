import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchAnalyses } from "@/hooks/useFetchAnalyses";
import Sidebar from "@/components/layout/Sidebar";
import AnalysisResult from "@/components/ui/AnalysisResult";
import FactCheckLinks from "@/components/ui/FactCheckLinks";
import AnalysisLoading from "@/components/ui/AnalysisLoading";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import StatCard from "@/components/ui/StatCard";
import { useAnalyzeText } from "@/hooks/useAnalyzeText";
import factCheckIcon from "@/assets/img/check.svg";
import disinformationIcon from "@/assets/img/close.svg";
import avgConfidenceIcon from "@/assets/img/graph.svg";

const UserPanel = () => {
    const { t } = useTranslation("dashboard");
    const { user } = useAuth();
    const {
        totalFactChecks,
        totalDisinformation,
        avgConfidence,
        remainingAnalysesToday,
        dailyAnalysisLimit,
        refetch: refetchAnalyses
    } = useFetchAnalyses(user);

    const [selectedModel, setSelectedModel] = useState("mDeBERTa-v3");
    const [analysisInput, setAnalysisInput] = useState("");

    const [lastAnalysis, setLastAnalysis] = useState(null);

    const { startAnalysis, loading, error } = useAnalyzeText();

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

    const handleStartAnalysis = async () => {
        setLastAnalysis(null);
        const nextAnalysis = await startAnalysis({
            userId: user?.uid || "Guest",
            input: analysisInput,
            selectedModel
        });

        if (!nextAnalysis) {
            return;
        }

        setLastAnalysis(nextAnalysis);
        setAnalysisInput("");
        // refetch states after successful analysis
        if (typeof refetchAnalyses === "function") {
            refetchAnalyses();
        }
    };

    const hasRemainingLimitInfo = remainingAnalysesToday !== null && dailyAnalysisLimit !== null;
    const hasNoAnalysesLeft = remainingAnalysesToday === 0;

    return(
        <div className="flex flex-row justify-center min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col items-center min-h-full w-full lg:w-7/8 bg-2 pt-20 pb-4 lg:py-8 gap-4 lg:gap-8">
                <div className="px-4 lg:px-16 gap-2 lg:gap-4 flex flex-col w-full">
                    <h1 className="text-3xl lg:text-5xl text-white montserrat font-bold">
                        {t("title")}
                    </h1>
                </div>
                <div className="grid w-full grid-cols-3 gap-4 px-4 lg:px-16">
                    <StatCard title={t("stats.totalFactChecks")} value={totalFactChecks} src={factCheckIcon}/>
                    <StatCard title={t("stats.totalDisinformation")} value={totalDisinformation} src={disinformationIcon}/>
                    <StatCard title={t("stats.avgConfidence")} value={avgConfidence} src={avgConfidenceIcon} />
                </div>
                <div className="bg-[#111111] opacity-80 flex flex-col items-center lg:w-[calc(100%-8rem)] w-[calc(100%-2rem)] p-4 lg:p-6 gap-4 rounded-lg shadow-lg flex-grow">
                    {loading ? (
                        <AnalysisLoading />
                    ) : lastAnalysis ? (
                        <>
                            <AnalysisResult
                                input={lastAnalysis.input}
                                result={lastAnalysis.result}
                                confidence={lastAnalysis.confidence}
                                topic={lastAnalysis.topic}
                            />
                            <p className="montserrat text-sm text-white font-light self-center px-4">{t("result.evaluatedBy")} <span className="font-bold">
                                {lastAnalysis.model || selectedModel}</span>
                            </p>
                            <FactCheckLinks
                                results={lastAnalysis.factCheckResults}
                                error={lastAnalysis.factCheckError}
                            />
                            <p className="montserrat text-sm text-red-500 font-light self-center px-4">
                                {t("result.educationalNotice")}
                            </p>
                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg montserrat 
                                hover:bg-blue-700 transition duration-300 cursor-pointer"
                                onClick={() => setLastAnalysis(null)}
                            >
                                {t("result.startNewAnalysis")}
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-white montserrat text-xl lg:text-2xl font-normal self-start">
                                <b>{t("analysisForm.titlePrefix")}</b> {t("analysisForm.titleSuffix")}
                            </h2>
                            {hasRemainingLimitInfo && (
                                <p className="montserrat text-sm lg:text-base text-gray-300 self-start">
                                    {t("analysisForm.dailyLimit")}{" "}
                                    <span className={`font-semibold ${hasNoAnalysesLeft ? "text-red-400" : "text-white"}`}>
                                        {remainingAnalysesToday} / {dailyAnalysisLimit}
                                    </span>
                                </p>
                            )}
                            <div className="w-full flex sm:flex-row flex-col gap-2 items-center justify-center">
   
                                <label className="text-gray-300 text-sm lg:text-base text-nowrap sm:text-wrap montserrat" htmlFor="model-select">
                                    {t("analysisForm.selectModel")}
                                </label>
                                <select
                                    id="model-select"
                                    value={selectedModel}
                                    onChange={(event) => setSelectedModel(event.target.value)}
                                    className="flex bg-[#1B1B1B] text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none 
                                    focus:ring-2 focus:ring-blue-600 montserrat">
                                    <option value="mDeBERTa-v3">mDeBERTa-v3 ({t("analysisForm.recommended")})</option>
                                    <option value="XLM-RoBERTa">XLM-RoBERTa</option>
                                    <option value="mT-5">mT-5</option>
                                    <option value="mBERT">mBERT ({t("analysisForm.notRecommended")})</option>
                                </select>
                            </div>
                            <textarea
                                ref={analysisTextareaRef}
                                type="text"
                                placeholder={t("analysisForm.placeholder")}
                                rows="6"
                                value={analysisInput}
                                onChange={e => setAnalysisInput(e.target.value)}
                                className="w-full p-4 rounded-md bg-[#1B1B1B] opacity-80 text-white focus:outline-none focus:ring-2 
                                focus:ring-blue-600 transition resize-none flex-grow"
                            />
                            <button
                                className="flex flex-row justify-between items-center bg-blue-600 text-lg py-3 px-6 rounded-full gap-2 
                                hover:bg-blue-700 hover:scale-102 hover:-translate-y-0.5 transition duration-300 cursor-pointer
                                disabled:opacity-50 disabled:hover:bg-blue-600 disabled:hover:scale-100 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                                onClick={handleStartAnalysis}
                                disabled={loading || !analysisInput.trim() || hasNoAnalysesLeft}
                            >
                                <div className="text-white montserrat flex flex-row items-center justify-center">
                                    <div className="flex flex-row gap-2 items-center">
                                        {t("analysisForm.startAnalysis")} 
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                            width="1rem" height="1rem" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                     </div>
                                </div>

                            </button>
                            {hasNoAnalysesLeft && (
                                <div className="text-red-400 mt-2 text-sm montserrat">
                                    {t("analysisForm.limitReached")}
                                </div>
                            )}
                            {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserPanel;
