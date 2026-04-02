import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useFetchAnalyses } from "@/hooks/useFetchAnalyses";
import AnalysisTrendChart from "@/components/statistics/AnalysisTrendChart";
import ResultDistributionChart from "@/components/statistics/ResultDistributionChart";
import CategoryChart from "@/components/statistics/CategoryChart";

const chartTheme = createTheme({
    palette: {
        mode: "dark",
        text: {
            primary: "#f8fafc",
            secondary: "#94a3b8",
        },
        divider: "#334155",
        background: {
            paper: "#111111",
            default: "#1B1B1B",
        },
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
    },
});

const Statistics = () => {
    const { t } = useTranslation(["statistics", "common"]);
    const { user } = useAuth();
    const { analyses, loading, error } = useFetchAnalyses(user);

    return (
        <div className="flex flex-row justify-center min-h-screen overflow-hidden">
            <Sidebar />
            <div className="bg-2 flex flex-col items-center min-h-full w-full lg:w-7/8 bg-[#1B1B1B] py-4 lg:py-8 gap-4 lg:gap-8">
                <div className="self-start ml-4 lg:ml-16 gap-2 lg:gap-4 flex flex-col w-full">
                    <h1 className="text-3xl lg:text-5xl text-white montserrat font-bold">
                        {t("statistics:title")}
                    </h1>
                </div>
                {loading && (
                    <div className="text-white text-xl sm:text-2xl montserrat font-semibold">
                        {t("common:status.loadingStatistics")}
                    </div>
                )}
                {error && (
                    <div className="text-red-500 text-xl sm:text-2xl montserrat font-semibold">
                        {error}
                    </div>
                )}
                {!loading && !error && analyses.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-10 text-center text-gray-400 montserrat">
                        {t("statistics:empty")}
                    </div>
                )}
                {!loading && !error && analyses.length > 0 && (
                    <ThemeProvider theme={chartTheme}>
                        <div className="grid w-full grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-16">
                            <AnalysisTrendChart analyses={analyses} />
                            <ResultDistributionChart analyses={analyses} />
                            <CategoryChart analyses={analyses} />
                        </div>
                    </ThemeProvider>
                )}
            </div>
        </div>
    )
}

export default Statistics;
