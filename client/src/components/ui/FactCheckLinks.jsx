import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import LaunchIcon from "@/assets/img/launch.svg";
import { factCheckResultShape } from "@/lib/propTypes";

export default function FactCheckLinks({ results = [], error = "", variant = "default" }) {
  const { t } = useTranslation("analysis");
  const isModalVariant = variant === "modal";

  const containerClassName = isModalVariant
    ? "w-full"
    : "w-full flex flex-row items-center justify-center gap-2 px-4";
  const listClassName = isModalVariant
    ? "grid grid-cols-1 gap-3 w-full lg:grid-cols-3"
    : "flex flex-row gap-4 w-full sm:w-4/5 items-center justify-center";
  const itemClassName = isModalVariant
    ? "flex flex-col gap-1 justify-between rounded-xl border border-gray-700/80 bg-[#1A1A1A] px-5 py-3 shadow-sm"
    : "min-w-1/3 h-auto flex flex-col justify-between border border-gray-700 rounded-lg p-4 bg-gray-800";
  const titleClassName = isModalVariant
    ? "text-base mb-2 font-light text-white"
    : "text-white montserrat font-semibold";
  const linkClassName = isModalVariant
    ? "flex items-center gap-2 text-sm font-normal text-blue-300"
    : "text-blue-400 underline font-bold flex items-center gap-1";
  const sourceIconClassName = isModalVariant ? "inline h-4 w-4" : "inline w-6 h-6";
  const textClassName = isModalVariant
    ? "hidden"
    : "text-sm text-gray-200 flex-grow mb-2 overflow-hidden text-ellipsis break-words [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]";
  const ratingClassName = isModalVariant
    ? "text-sm font-semibold uppercase tracking-wide text-gray-300 text-ellipsis break-words overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
    : "text-lg text-gray-300 font-semibold text-ellipsis break-words overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1]";

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {results.length === 0 && !error && <p className="text-red-500 montserrat">{t("factChecks.empty")}</p>}
      {results.length > 0 && <>
        <h3 className={titleClassName}>{t("factChecks.title")}</h3>
        <div className={containerClassName}>
          <ul className={listClassName}>
            {results.map((res, i) => (
              <li key={i} className={itemClassName}>
                <a href={res.url} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                    <img src={LaunchIcon} alt={t("factChecks.launchAlt")} className={sourceIconClassName} />
                    {res.platform || t("factChecks.unknownSource")}
                </a>
                <div
                  className={textClassName}
                  title={res.title || t("factChecks.untitled")}
                >
                  {res.title || t("factChecks.untitled")}
                </div>
                <div
                  className={ratingClassName}
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
  variant: PropTypes.oneOf(["default", "modal"]),
};