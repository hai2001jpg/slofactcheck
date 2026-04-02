import PropTypes from "prop-types";
import { LineChart } from "@mui/x-charts/LineChart";
import { useTranslation } from "react-i18next";

import ChartCard from "./ChartCard";
import { getDateLocale } from "@/i18n";
import { buildDailyTrend } from "./chartUtils";
import { analysisShape } from "@/lib/propTypes";

export default function AnalysisTrendChart({ analyses }) {
  const { i18n, t } = useTranslation("statistics");
  const chartData = buildDailyTrend(analyses, getDateLocale(i18n.language));

  return (
    <ChartCard
      title={t("charts.trend.title")}
      description={t("charts.trend.description")}
      className="lg:col-span-2"
    >
      {chartData.length === 0 ? (
        <div className="flex h-full min-h-[260px] items-center justify-center text-sm text-gray-400">
          {t("charts.trend.empty")}
        </div>
      ) : (
        <LineChart
          height={320}
          margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
          xAxis={[
            {
              scaleType: "point",
              data: chartData.map((item) => item.label),
            },
          ]}
          yAxis={[
            {
              min: 0,
            },
          ]}
          series={[
            {
              data: chartData.map((item) => item.count),
              label: t("charts.trend.seriesLabel"),
              color: "#f59e0b",
              curve: "monotoneX",
            },
          ]}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      )}
    </ChartCard>
  );
}

AnalysisTrendChart.propTypes = {
  analyses: PropTypes.arrayOf(analysisShape).isRequired,
};
