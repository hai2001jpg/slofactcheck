import PropTypes from "prop-types";
import { LineChart } from "@mui/x-charts/LineChart";

import ChartCard from "./ChartCard";
import { buildDailyTrend } from "./chartUtils";
import { analysisShape } from "@/lib/propTypes";

export default function AnalysisTrendChart({ analyses }) {
  const chartData = buildDailyTrend(analyses);

  return (
    <ChartCard
      title="Daily Activity Trend"
      description="No. of analyses completed each day"
      className="lg:col-span-2"
    >
      {chartData.length === 0 ? (
        <div className="flex h-full min-h-[260px] items-center justify-center text-sm text-gray-400">
          No date data available.
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
              label: "Analyses",
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