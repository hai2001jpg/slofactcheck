import { useState } from "react";

import i18n from "@/i18n";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useFactCheckSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFactCheck = async (query) => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const resp = await fetch(`${BASE_URL}/factcheck?query=${encodeURIComponent(query)}`);
      if (!resp.ok) throw new Error(i18n.t("common:errors.factCheckSearch"));
      const data = await resp.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || i18n.t("common:errors.factCheckSearch"));
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchFactCheck };
}
