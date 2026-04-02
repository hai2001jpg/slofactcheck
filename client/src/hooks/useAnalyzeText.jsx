import { useState } from "react";

import i18n from "@/i18n";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MODEL_MAP = {
  mBERT: "mbert",
  "XLM-RoBERTa": "xlm_roberta",
  "mT-5": "mt5",
  "mDeBERTa-v3": "mdeberta_v3",
};

export function useAnalyzeText() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startAnalysis = async ({ userId, input, selectedModel }) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          input,
          model: MODEL_MAP[selectedModel],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || i18n.t("common:errors.server"));
      }

      let factCheckResults = [];
      let factCheckError = "";
      try {
        const factCheckResponse = await fetch(
          `${BASE_URL}/factcheck?query=${encodeURIComponent(input)}`
        );
        const factCheckData = await factCheckResponse.json();
        if (!factCheckResponse.ok) {
          throw new Error(factCheckData?.error || i18n.t("common:errors.factCheckSearch"));
        }
        factCheckResults = factCheckData.results || [];
      } catch (factErr) {
        factCheckError = factErr?.message || i18n.t("common:errors.factCheckSearch");
      }

      return {
        input,
        result: data.result,
        confidence: Math.round(data.confidence * 10000) / 100,
        topic: data.topic,
        model: selectedModel,
        factCheckResults,
        factCheckError,
        remainingAnalysesToday: data.remainingAnalysesToday ?? null,
        dailyLimit: data.dailyLimit ?? null,
      };
    } catch (err) {
      setError(i18n.t("common:errors.analyzeFailed", { message: err.message }));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    startAnalysis,
    loading,
    error,
  };
}
