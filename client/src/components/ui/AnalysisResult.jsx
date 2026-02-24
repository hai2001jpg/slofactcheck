import React from "react";

const AnalysisResult = ({ input, result, confidence }) => (
  <div className="text-white mt-2 text-base border border-gray-700 rounded py-3 px-6 font-[Montserrat] flex flex-col gap-4">
    <div className="flex flex-col ">
      <span className="text-sm text-gray-400">Input</span>
      <span className="text-2xl">{input}</span>
    </div>
    <div className="flex flex-row gap-2 justify-around items-center">
      <div className="flex flex-col">
        <span className="text-sm text-gray-400">Result</span>
        <b className={String(result) === 'false' ? 'text-red-500' : 'text-blue-500'}>
          <span className="text-2xl">{String(result).charAt(0).toUpperCase() + String(result).slice(1)}</span>
        </b>
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-400">Confidence</span>
        <b className="text-2xl">{Number(confidence).toFixed(2)} %</b>
      </div>
    </div>
  </div>
);

export default AnalysisResult;
