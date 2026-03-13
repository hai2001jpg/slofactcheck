import { useState } from "react";

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
        throw new Error(data?.error || "Server error");
      }

      let factCheckResults = [];
      let factCheckError = "";
      try {
        const factCheckResponse = await fetch(
          `${BASE_URL}/factcheck?query=${encodeURIComponent(input)}`
        );
        const factCheckData = await factCheckResponse.json();
        if (!factCheckResponse.ok) {
          throw new Error(factCheckData?.error || "Fact check search failed");
        }
        factCheckResults = factCheckData.results || [];
      } catch (factErr) {
        factCheckError = factErr?.message || "Fact check search failed";
      }

      return {
        input,
        result: data.result,
        confidence: Math.round(data.confidence * 10000) / 100,
        topic: data.topic,
        model: selectedModel,
        factCheckResults,
        factCheckError,
      };
    } catch (err) {
      setError(`Failed to analyze: ${err.message}`);
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
