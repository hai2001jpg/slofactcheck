import { WaveLoader } from "./wave-loader";
import { useEffect, useState } from "react";

const messages = [
  "Loading models...",
  "Contacting the server...",
  "Analyzing text...",
  "Fetching fact checks...",
];

export default function AnalysisLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
      const intervalId = setInterval(() => {
        setMessageIndex((current) => (current + 1) % messages.length);
      }, 4000);

      return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-white montserrat">
      <WaveLoader className="h-12 w-6 opacity-80"/>
      <p className="text-3xl animate-pulse">
        {messages[messageIndex]}
      </p>
    </div>
  );
}
