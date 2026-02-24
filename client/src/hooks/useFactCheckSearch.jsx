import { useState } from "react";

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
      if (!resp.ok) throw new Error("Fact check search failed");
      const data = await resp.json();
      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchFactCheck };
}
