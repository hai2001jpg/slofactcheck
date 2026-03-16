import PropTypes from "prop-types";
import { useState } from "react";
import AnalysisModal from "@/components/ui/AnalysisModal";
import { analysisShape } from "@/lib/propTypes";

const HistoryList = ({
        analyses,
        paginatedAnalyses,
        modelDisplayMap,
        totalPages,
        currentPage,
        setCurrentPage
    }) => {
    const [modalAnalysis, setModalAnalysis] = useState(null);

    return (
        <div className="w-full flex justify-center items-center max-w-6xl overflow-x-none mt-4 flex-1">
            <div className="flex flex-col w-[95%] min-w-[340px] sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px] 
                    montserrat  min-h-[65vh] gap-2">
                {/* header*/}
                {analyses.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-[minmax(0,1fr)_90px_90px_120px] gap-4 sm:gap-6 px-2
                             text-gray-400 text-sm sm:text-md">
                        <div>Input</div>
                        <div className="text-center">Result</div>
                        <div className="hidden sm:block text-center">Confidence</div>
                        <div className="hidden sm:block text-center">Model</div>
                    </div>
                )}
                {/* list of analyses */}
                <div className="flex-1 flex flex-col gap-4">
                    {paginatedAnalyses.map(a => (
                        <div
                            key={a.id}
                            className="bg-[#222] rounded-lg p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-[minmax(0,1fr)_90px_90px_120px]
                                     gap-4 sm:gap-6 items-center text-white shadow cursor-pointer hover:bg-[#333]"
                            onClick={() => setModalAnalysis(a)}>
                            <div className="min-w-0 flex flex-col gap-1">
                                <div className="truncate max-w-full" title={a.input}>{a.input}</div>
                                <div className="truncate max-w-full text-xs text-gray-400" title={a.topic || "N/A"}>
                                    Category: {a.topic || "N/A"}
                                </div>
                            </div>
                            <div className={`text-center font-bold ${String(a.result) === "false" ? "text-red-500" : "text-blue-500"}`}>{String(a.result).charAt(0).toUpperCase() + String(a.result).slice(1)}</div>
                            <div className="hidden sm:block text-center font-bold">{(Math.round(Number(a.confidence) * 10000) / 100).toFixed(2)}%</div>
                            <div className="hidden sm:block text-center font-bold text-nowrap">{modelDisplayMap[a.model] || a.model}</div>
                        </div>
                    ))}
                </div>
                <AnalysisModal analysis={modalAnalysis} onClose={() => setModalAnalysis(null)} />
                {/* pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 mb-2">
                        <button
                            className="px-3 py-1 rounded bg-[#333] text-white font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}>
                            &#x2190;
                        </button>
                        <span className="text-gray-300 font-semibold">{currentPage} / {totalPages}</span>
                        <button
                            className="px-3 py-1 rounded bg-[#333] text-white font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                            &#x2192;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

HistoryList.propTypes = {
    analyses: PropTypes.arrayOf(analysisShape).isRequired,
    paginatedAnalyses: PropTypes.arrayOf(analysisShape).isRequired,
    modelDisplayMap: PropTypes.objectOf(PropTypes.string).isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default HistoryList;
