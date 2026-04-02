import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTranslation } from "react-i18next";

import ChartCard from "./ChartCard";
import { buildResultDistribution } from "./chartUtils";
import { analysisShape } from "@/lib/propTypes";

export default function ResultDistributionChart({ analyses }) {
  const { t } = useTranslation(["statistics", "analysis"]);
  const chartData = buildResultDistribution(analyses, {
    true: t("analysis:resultValues.true"),
    false: t("analysis:resultValues.false"),
    unknown: t("analysis:resultValues.unknown"),
  });

  return (
    <ChartCard
      title={t("statistics:charts.resultDistribution.title")}
      description={t("statistics:charts.resultDistribution.description")}
    >
      {chartData.length === 0 ? (
        <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-gray-400">
          {t("statistics:empty")}
        </div>
      ) : (
        <PieChart
          height={250}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
          series={[
            {
              data: chartData,
              innerRadius: 55,
              outerRadius: 100,
              paddingAngle: 3,
              cornerRadius: 4,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 50, additionalRadius: -5, color: "gray" },
            },
          ]}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
              labelStyle: {
                fill: "#e5e7eb",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 12,
              },
            },
            
          }}
        />
      )}
    </ChartCard>
  );
}

ResultDistributionChart.propTypes = {
  analyses: PropTypes.arrayOf(analysisShape).isRequired,
};
