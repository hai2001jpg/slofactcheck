import React from "react";

export default function AnalysisModal({ analysis, onClose }) {
  if (!analysis) return null;
  const resultString = String(analysis.result);
  const resultColor = resultString.toLowerCase() === "true" ? "text-blue-500" : "text-red-500";
  const capitalizedResult = resultString.charAt(0).toUpperCase() + resultString.slice(1).toLowerCase();

  const modelDisplayMap = {
      "mbert": "mBERT",
      "xlm_roberta": "XLM-RoBERTa",
      "mt5": "mT-5",
      "mdeberta_v3": "mDeBERTa-v3",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {/* Modal */}
      <div className="relative bg-[#222] text-white rounded-lg p-8 z-10 min-w-[50vw] max-w-[70vw] min-h-[70vh] max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-red-400 hover:text-white cursor-pointer text-2xl" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
        <div className="px-6 py-4 flex flex-col gap-2 flex-1 min-h-0">
          <div className="flex flex-col border-b border-gray-600 pb-4 flex-1 min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <p className="text-pretty h-full">{analysis.input}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <h2 className={`${resultColor} font-bold text-4xl`}>{capitalizedResult}</h2>
              <h2 className="font-bold text-2xl">{(analysis.confidence * 100).toFixed(2)}%</h2>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h2>{modelDisplayMap[analysis.model] || analysis.model}</h2>
              <h2>
                {analysis.createdAt
                  ? (
                      analysis.createdAt.seconds
                        ? new Date(analysis.createdAt.seconds * 1000)
                        : new Date(analysis.createdAt)
                    ).toLocaleDateString("sk-SK")
                  : "N/A"}
              </h2>            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
