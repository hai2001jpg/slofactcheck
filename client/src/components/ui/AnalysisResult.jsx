import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { getResultLabel, getTopicLabel } from "@/lib/analysisLabels";

const AnalysisResult = ({ input, result, confidence, topic }) => {
  const { t } = useTranslation(["analysis", "common"]);
  const resultLabel = getResultLabel(result, t);
  const topicLabel = getTopicLabel(topic, t, t("common:fallback.notAvailable"));

  return (
    <div className="text-white text-base rounded-md montserrat flex flex-col gap-4 flex-grow">
      <div className="flex sm:flex-row flex-col justify-around">
        <div className="flex flex-col p-4 max-w-full sm:max-w-4/5">
          <span className="text-sm text-gray-400">{t("analysis:labels.input")}</span>
          <span className="text-xl">{input}</span>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">{t("analysis:labels.result")}</span>
            <b className={String(result) === "false" ? "text-red-500" : "text-blue-500"}>
              <span className="text-2xl" data-testid="analysis-result-value">{resultLabel}</span>
            </b>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">{t("analysis:labels.confidence")}</span>
            <b className="text-2xl">{Number(confidence).toFixed(2)} %</b>
          </div>
          <div className="flex flex-col">
            <p className="montserrat text-sm text-gray-400">{t("analysis:labels.category")}:</p>
            <p className="montserrat text-md font-normal text-white" data-testid="analysis-topic-value">{topicLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

AnalysisResult.propTypes = {
  input: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  confidence: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  topic: PropTypes.string,
};

export default AnalysisResult;
