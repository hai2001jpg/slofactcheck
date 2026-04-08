import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { LANGUAGE_OPTIONS } from "@/i18n";
import { cn } from "@/lib/utils";

const LanguageSwitcher = ({ className = "" }) => {
  const { i18n, t } = useTranslation("layout");
  const activeLanguage = String(i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  return (
    <div
      className={cn(
        "inline-flex rounded-full border border-white/20 bg-white/5 p-1 montserrat",
        className
      )}
      role="group"
      aria-label={t("languageSwitcher.label")}
    >
      {LANGUAGE_OPTIONS.map((language) => {
        const isActive = activeLanguage === language.code;

        return (
          <button
            key={language.code}
            type="button"
            onClick={() => i18n.changeLanguage(language.code)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition duration-200 cursor-pointer ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
            aria-pressed={isActive}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
};

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
};

export default LanguageSwitcher;
