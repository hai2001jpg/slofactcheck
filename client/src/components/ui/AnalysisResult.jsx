import React from "react";
import PropTypes from "prop-types";

const AnalysisResult = ({ input, result, confidence, topic }) => (
  <div className="text-white text-base rounded-md montserrat flex flex-col gap-4 flex-grow">
    <div className="flex sm:flex-row flex-col">
      <div className="flex flex-col p-4 max-w-4/5">
        <span className="text-sm text-gray-400">Input</span>
        <span className="text-2xl">{input}</span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Result</span>
          <b className={String(result) === 'false' ? 'text-red-500' : 'text-blue-500'}>
            <span className="text-4xl">{String(result).charAt(0).toUpperCase() + String(result).slice(1)}</span>
          </b>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Confidence</span>
          <b className="text-4xl">{Number(confidence).toFixed(2)} %</b>
        </div>
        <div className="flex flex-col">
          <p className="montserrat text-sm text-gray-400">Category:</p>
          <p className="montserrat text-xl font-normal text-white">{topic}</p>
        </div>
      </div>
    </div>
  </div>
);

AnalysisResult.propTypes = {
  input: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  confidence: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  topic: PropTypes.string,
};

export default AnalysisResult;
