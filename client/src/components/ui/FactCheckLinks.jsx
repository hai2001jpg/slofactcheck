import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import LaunchIcon from "@/assets/img/launch.svg";
import { factCheckResultShape } from "@/lib/propTypes";

export default function FactCheckLinks({ results = [], error = "" }) {
  const { t } = useTranslation("analysis");

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {results.length === 0 && !error && <p className="text-red-500 montserrat">{t("factChecks.empty")}</p>}
      {results.length > 0 && <>
        <h3 className="text-white montserrat font-semibold">{t("factChecks.title")}</h3>
        <div className="flex flex-row items-center justify-center gap-4 px-4">
          <ul className="flex flex-row gap-4 w-full sm:w-4/5 items-center justify-center">
            {results.map((res, i) => (
              <li key={i} className="min-w-1/3 h-auto flex flex-col justify-between border border-gray-700 rounded-lg p-4 bg-gray-800">
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-bold flex items-center gap-1">
                    <img src={LaunchIcon} alt={t("factChecks.launchAlt")} className="inline w-6 h-6" />
                    {res.platform || t("factChecks.unknownSource")}
                </a>
                <div
                  className="text-sm text-gray-200 flex-grow mb-2 overflow-hidden text-ellipsis break-words
                  [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                  title={res.title || t("factChecks.untitled")}
                >
                  {res.title || t("factChecks.untitled")}
                </div>
                <div className="text-lg text-gray-300 font-bold mt-auto text-ellipsis break-words overflow-hidden
                  [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]"
                  title={res.ratingRaw || res.rating || t("factChecks.unknownRating")}>
                  {res.ratingRaw || res.rating || t("factChecks.unknownRating")}
                </div>  
              </li>
            ))}
          </ul>
        </div>
      </>}
    </>
  );
}

FactCheckLinks.propTypes = {
  results: PropTypes.arrayOf(factCheckResultShape),
  error: PropTypes.string,
};
