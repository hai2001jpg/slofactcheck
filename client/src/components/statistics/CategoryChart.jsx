import PropTypes from "prop-types";
import { BarChart } from "@mui/x-charts/BarChart";

import ChartCard from "./ChartCard";
import { buildCategoryChart } from "./chartUtils";
import { analysisShape } from "@/lib/propTypes";

export default function CategoryChart({ analyses }) {
  const chartData = buildCategoryChart(analyses);

  return (
    <ChartCard
      title="Category Distribution"
      description="No. of analyses per category"
    >
      {chartData.length === 0 ? (
        <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-gray-400">
          No data available.
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
              label: "No. of analyses",
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