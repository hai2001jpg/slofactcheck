import { WaveLoader } from "./wave-loader";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AnalysisLoading() {
  const { t } = useTranslation("analysis");
  const messages = t("loadingMessages", { returnObjects: true });
  const messageCount = Array.isArray(messages) ? messages.length : 0;
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
      if (messageCount === 0) {
        return undefined;
      }

      const intervalId = setInterval(() => {
        setMessageIndex((current) => (current + 1) % messageCount);
      }, 4000);

      return () => clearInterval(intervalId);
    }, [messageCount]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-white montserrat">
      <WaveLoader className="h-12 w-6 opacity-80"/>
      <p className="text-3xl animate-pulse">
        {Array.isArray(messages) ? messages[messageIndex] : ""}
      </p>
    </div>
  );
}
