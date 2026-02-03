import { useState, useEffect } from "react";

export function useFetchAnalyses(user) {
    const [analyses, setAnalyses] = useState([]);
    const [totalFactChecks, setTotalFactChecks] = useState(0);
    const [totalDisinformation, setTotalDisinformation] = useState(0);
    const [avgConfidence, setAvgConfidence] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user?.uid) return;
        const fetchAnalyses = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:5000/analysis?userId=${user.uid}`);
                if (!response.ok) throw new Error("Failed to fetch analyses");
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
        fetchAnalyses();
    }, [user?.uid]);

    return {
        analyses,
        totalFactChecks,
        totalDisinformation,
        avgConfidence,
        loading,
        error
    };
}
