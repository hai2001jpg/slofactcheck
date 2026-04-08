import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";

const Sidebar = () => {
    const { t } = useTranslation(["layout", "common"]);
    const { user, logout } = useAuth();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const userName = user?.displayName ?? t("common:fallback.guest");
    const avatarUrl = user?.photoURL ?? "";
    // helper for getting initials
    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');
    const location = useLocation();

    useEffect(() => {
        if (!isLanguageModalOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsLanguageModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLanguageModalOpen]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="bg-[#111111] flex flex-col items-center min-h-full w-1/8 py-8 gap-4 shadow-lg">
            <span className="block xl:hidden">
                <h1 className="text-2xl font-bold text-white space-grotesk">{t("common:app.shortName")}</h1>
            </span>
            <span className="hidden xl:block">
                <h1 className="text-2xl font-bold text-white space-grotesk">{t("common:app.name")}</h1>
            </span>
            <div className="flex flex-col gap-8 w-full px-4 flex-grow">
                <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-[#1B1B1B] shadow-lg flex items-center justify-center p-0.5">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={t("layout:sidebar.avatarAlt", { name: userName })}
                                className="h-12 w-12 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-person " viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        )}
                    </div>
                    <span className="text-white montserrat font-light hidden lg:block text-center text-nowrap">
                        {userName}
                    </span>
                    <span className="text-white montserrat font-light block lg:hidden text-center">
                        {getInitials(userName)}
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        className={`text-white montserrat hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house flex-shrink-0" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                            </svg>
                            <span className="hidden lg:inline">{t("layout:nav.home")}</span>
                        </div>
                    </Link>
                    <Link
                        to="/userpanel"
                        className={`text-white montserrat hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/userpanel" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-columns flex-shrink-0" viewBox="0 0 16 16">
                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>
                            </svg>
                            <span className="hidden lg:inline">{t("layout:nav.userPanel")}</span>
                        </div>
                    </Link>
                    <Link
                        to="/history"
                        className={`text-white montserrat hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/history" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history flex-shrink-0" viewBox="0 0 16 16">
                                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                            <span className="hidden lg:inline">{t("layout:nav.history")}</span>
                        </div>
                    </Link>
                    <Link
                        to="/statistics"
                        className={`text-white montserrat hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 
                        ${location.pathname === "/statistics" ? "bg-gray-800" : ""}`}>
                        <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart flex-shrink-0" viewBox="0 0 16 16">
                                <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                            </svg>
                            <span className="hidden lg:inline">{t("layout:nav.statistics")}</span>
                        </div>
                    </Link>
                </div>
            </div>
            <LanguageSwitcher className="hidden scale-90 sm:inline-flex" />
            <button
                type="button"
                className="sm:hidden inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 p-3 text-white transition duration-300 hover:bg-white/10 cursor-pointer"
                onClick={() => setIsLanguageModalOpen(true)}
                aria-label={t("layout:languageSwitcher.label")}
                aria-haspopup="dialog"
                aria-expanded={isLanguageModalOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                </svg>
            </button>
            <button
                className="flex flex-row items-center w-full self-start justify-center lg:justify-start pt-4 px-4 gap-4 text-red-500 hover:text-red-700 transition duration-300 cursor-pointer border-t border-[#333333]"
                onClick={handleLogout}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right flex-shrink-0" viewBox="0 0 16 16">
                    <path fill="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                <span className="hidden lg:inline">{t("layout:nav.logout")}</span>
            </button>
            {isLanguageModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:hidden"
                    onClick={() => setIsLanguageModalOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/70" />
                    <div
                        className="relative z-10 w-full max-w-xs rounded-2xl border border-white/10 bg-[#1B1B1B] p-5 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label={t("layout:languageSwitcher.modalTitle")}
                    >
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-base font-semibold text-white montserrat">
                                    {t("layout:languageSwitcher.modalTitle")}
                                </h2>
                                <p className="mt-1 text-sm text-gray-400 montserrat">
                                    {t("layout:languageSwitcher.modalDescription")}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="text-gray-400 transition duration-300 hover:text-white cursor-pointer"
                                onClick={() => setIsLanguageModalOpen(false)}
                                aria-label={t("common:aria.close")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="flex w-full justify-center">
                            <LanguageSwitcher className="scale-100" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar;
