import { useState } from "react";
import i18n from "@/i18n";
import { getModelApiName } from "@/lib/modelLabels";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
          model: getModelApiName(selectedModel),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || i18n.t("common:errors.server"));
      }

      return {
        input,
        result: data.result,
        confidence: Math.round(data.confidence * 10000) / 100,
        topic: data.topic,
        model: selectedModel,
        factCheckResults: data.factCheckResults || [],
        factCheckError: data.factCheckError || "",
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
