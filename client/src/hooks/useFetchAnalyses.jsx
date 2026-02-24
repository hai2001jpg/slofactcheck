import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useFetchAnalyses(user) {
    const [analyses, setAnalyses] = useState([]);
    const [totalFactChecks, setTotalFactChecks] = useState(0);
    const [totalDisinformation, setTotalDisinformation] = useState(0);
    const [avgConfidence, setAvgConfidence] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAnalyses = async () => {
        if (!user?.uid) return;
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${BASE_URL}/analysis?userId=${user.uid}`);
            if (!response.ok) throw new Error("Failed to fetch analyses.");
            const data = await response.json();
            setAnalyses(data.analyses || []);
            setTotalFactChecks(data.analyses.length);
            const disinfoCount = data.analyses.filter(a => String(a.result) === "false").length;
            setTotalDisinformation(disinfoCount);
            const avgConf = data.analyses.length > 0 ?
                (data.analyses.reduce((sum, a) => sum + (Number(a.confidence) * 100), 0) / data.analyses.length).toFixed(2)
                : 0;
            setAvgConfidence(avgConf);
        } catch (err) {
            setAnalyses([]);
            setTotalFactChecks(0);
            setTotalDisinformation(0);
            setAvgConfidence(0);
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalyses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.uid]);

    return {
        analyses,
        totalFactChecks,
        totalDisinformation,
        avgConfidence,
        loading,
        error,
        refetch: fetchAnalyses
    };
}
