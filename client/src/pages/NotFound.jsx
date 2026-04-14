import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const REDIRECT_DELAY_SECONDS = 5;

const NotFound = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_DELAY_SECONDS);

  // automatic redirect
  useEffect(() => {
    const redirectTimeout = window.setTimeout(() => {
      navigate("/", { replace: true });
    }, REDIRECT_DELAY_SECONDS * 1000);

    const countdownInterval = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => {
      window.clearTimeout(redirectTimeout);
      window.clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <section className="bg min-h-[70vh] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center gap-2">
        <span className="text-6xl font-bold text-red-600 sm:text-7xl mb-2">
          Error 404
        </span>
        <h1 className="montserrat text-4xl font-bold tracking-tight sm:text-5xl">
          {t("notFound.title")}
        </h1>
        <p className="inter-font mt-4 max-w-xl text-base text-gray-300 sm:text-lg">
          {t("notFound.description")}
        </p>
        <p className="inter-font mt-3 text-sm text-gray-400 sm:text-base">
          {t("notFound.redirect", { count: secondsLeft })}
        </p>
        <Link
          to="/"
          className="inter-font mt-8 inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
