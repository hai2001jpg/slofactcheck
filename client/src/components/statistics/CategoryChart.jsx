import PropTypes from "prop-types";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTranslation } from "react-i18next";

import ChartCard from "./ChartCard";
import { buildCategoryChart } from "./chartUtils";
import { analysisShape } from "@/lib/propTypes";

export default function CategoryChart({ analyses }) {
  const { t } = useTranslation(["statistics", "analysis"]);
  const chartData = buildCategoryChart(
    analyses,
    {
      politics: t("analysis:topicValues.politics"),
      health: t("analysis:topicValues.health"),
      sport: t("analysis:topicValues.sport"),
      culture: t("analysis:topicValues.culture"),
      others: t("analysis:topicValues.others"),
    },
    t("charts.categoryDistribution.otherCategory")
  );

  return (
    <ChartCard
      title={t("charts.categoryDistribution.title")}
      description={t("charts.categoryDistribution.description")}
    >
      {chartData.length === 0 ? (
        <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-gray-400">
          {t("empty")}
        </div>
      ) : (
        <BarChart
          dataset={chartData}
          height={300}
          margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "topic",
            },
          ]}
          yAxis={[
            {
              min: 0,
            },
          ]}
          series={[
            {
              dataKey: "count",
              label: t("charts.categoryDistribution.seriesLabel"),
              color: "#38bdf8",
            },
          ]}
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

CategoryChart.propTypes = {
  analyses: PropTypes.arrayOf(analysisShape).isRequired,
};
