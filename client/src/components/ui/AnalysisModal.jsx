import PropTypes from "prop-types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import FactCheckLinks from "@/components/ui/FactCheckLinks";
import { getDateLocale } from "@/i18n";
import { getResultLabel, getTopicLabel } from "@/lib/analysisLabels";
import { getModelDisplayName } from "@/lib/modelLabels";
import { analysisShape } from "@/lib/propTypes";

export default function AnalysisModal({ analysis, onClose }) {
  const { i18n, t } = useTranslation(["analysis", "common", "history"]);

  useEffect(() => {
    if (!analysis) {
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [analysis]);

  useEffect(() => {
    if (!analysis) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [analysis, onClose]);

  if (!analysis) return null;

  const resultString = String(analysis.result);
  const resultColor = resultString.toLowerCase() === "true" ? "text-blue-500" : "text-red-500";
  const resultLabel = getResultLabel(analysis.result, t);
  const topicLabel = getTopicLabel(analysis.topic, t, t("common:fallback.notAvailable"));
  const factCheckResults = analysis.factCheckResults || [];
  const factCheckError = analysis.factCheckError || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {/* Modal */}
      <div
        className="relative z-10 flex  sm:max-w-[65vw] min-w-[70vw] max-w-[80vw]  flex-col rounded-lg bg-[#222] p-4 text-white max-h-[80vh]"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-red-400 hover:text-white cursor-pointer text-2xl"
          onClick={onClose}
          aria-label={t("common:aria.close")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </button>
        <div className="flex flex-1 flex-col gap-4 min-h-0 px-6 py-4">
          {/* input section */}
          <div className="flex flex-1 min-h-32 flex-col gap-1 border-b border-gray-600 pb-4 sm:min-h-0">
            <h2 className="text-sm text-gray-400 montserrat">{t("history:table.input")}</h2>
            <div className="no-scrollbar min-h-20 overflow-y-auto sm:min-h-0">
              <p className="text-pretty">{analysis.input}</p>
            </div>
          </div>
          {/* result section */}
          <div className="shrink-0">
            <div className="flex flex-row items-center justify-between sm:justify-around lg:grid lg:grid-cols-5 lg:items-start lg:justify-stretch lg:gap-6">
              <div className="flex flex-col justify-center gap-3 lg:gap-0">
                <div className="flex flex-col">
                  <h5 className="text-sm text-gray-400 montserrat">{t("analysis:labels.result")}</h5>
                  <h2 className={`${resultColor} font-bold text-xl sm:text-2xl`}>{resultLabel}</h2>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-sm text-gray-400 montserrat">{t("analysis:labels.confidence")}</h5>
                  <h2 className="font-bold text-2xl">{(analysis.confidence * 100).toFixed(2)}%</h2>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-sm text-gray-400 montserrat">{t("analysis:labels.category")}</h5>
                  <h2>{topicLabel}</h2>
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:contents">
                <div className="flex flex-col">
                   <h5 className="text-sm text-gray-400 montserrat">{t("analysis:labels.model")}</h5>
                   <h2>{getModelDisplayName(analysis.model)}</h2>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-sm text-gray-400 montserrat">{t("analysis:labels.created")}</h5>
                  <h2>
                    {analysis.createdAt
                      ? (
                          analysis.createdAt.seconds
                            ? new Date(analysis.createdAt.seconds * 1000)
                            : new Date(analysis.createdAt)
                        ).toLocaleDateString(getDateLocale(i18n.language))
                      : t("common:fallback.notAvailable")}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* fact-check results */}
          <div className="no-scrollbar shrink-0 overflow-y-auto border-t border-gray-600 py-2 max-h-[32vh] sm:max-h-[40vh]">
            <FactCheckLinks results={factCheckResults} error={factCheckError} variant="modal" />
          </div>
        </div>
      </div>
    </div>
  );
}

AnalysisModal.propTypes = {
  analysis: analysisShape,
  onClose: PropTypes.func.isRequired,
};
