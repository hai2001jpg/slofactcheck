import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";

const SIDEBAR_ANIMATION_DURATION = 300;

const Sidebar = () => {
    const { t } = useTranslation(["layout", "common"]);
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarMounted, setIsSidebarMounted] = useState(false);
    const openAnimationFrameRef = useRef(null);
    const closeTimeoutRef = useRef(null);
    const userName = user?.displayName ?? t("common:fallback.guest");
    const avatarUrl = user?.photoURL ?? "";
    const location = useLocation();

    const getInitials = (name) =>
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    const closeSidebar = () => {
        setIsSidebarOpen(false);

        if (closeTimeoutRef.current !== null) {
            window.clearTimeout(closeTimeoutRef.current);
        }

        closeTimeoutRef.current = window.setTimeout(() => {
            setIsSidebarMounted(false);
            closeTimeoutRef.current = null;
        }, SIDEBAR_ANIMATION_DURATION);
    };

    useEffect(() => {
        if (!isSidebarMounted) {
            return;
        }

        closeSidebar();
    }, [location.pathname]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeSidebar();
            }
        };

        if (isSidebarMounted) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isSidebarMounted]);

    useEffect(() => {
        return () => {
            if (openAnimationFrameRef.current !== null) {
                window.cancelAnimationFrame(openAnimationFrameRef.current);
            }

            if (closeTimeoutRef.current !== null) {
                window.clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    const navigationItems = [
        {
            to: "/",
            label: t("layout:nav.home"),
            isActive: location.pathname === "/",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
            ),
        },
        {
            to: "/userpanel",
            label: t("layout:nav.userPanel"),
            isActive: location.pathname === "/userpanel",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-columns flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>
                </svg>
            ),
        },
        {
            to: "/history",
            label: t("layout:nav.history"),
            isActive: location.pathname === "/history",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                </svg>
            ),
        },
        {
            to: "/statistics",
            label: t("layout:nav.statistics"),
            isActive: location.pathname === "/statistics",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart flex-shrink-0" viewBox="0 0 16 16">
                    <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z"/>
                </svg>
            ),
        },
    ];

    const renderNavigation = ({
        labelVisibilityClass,
        linkClassName = "",
        contentClassName = "justify-center lg:justify-start",
    }) => (
        <div className="flex flex-col gap-4">
            {navigationItems.map((item) => (
                <Link
                    key={item.to}
                    to={item.to}
                    className={`text-white montserrat hover:text-blue-500 hover:bg-gray-800 rounded lg:px-4 lg:py-2 p-2 transition duration-300 ${linkClassName} ${
                        item.isActive ? "bg-gray-800" : ""
                    }`}
                >
                    <div className={`flex flex-row items-center gap-4 ${contentClassName}`}>
                        {item.icon}
                        <span className={labelVisibilityClass}>{item.label}</span>
                    </div>
                </Link>
            ))}
        </div>
    );

    const handleLogout = async () => {
        try {
            closeSidebar();
            await logout();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const handleOpenSidebar = () => {
        if (closeTimeoutRef.current !== null) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        setIsSidebarMounted(true);

        if (openAnimationFrameRef.current !== null) {
            window.cancelAnimationFrame(openAnimationFrameRef.current);
        }

        openAnimationFrameRef.current = window.requestAnimationFrame(() => {
            setIsSidebarOpen(true);
            openAnimationFrameRef.current = null;
        });
    };

    const handleCloseSidebar = () => {
        closeSidebar();
    };

    return (
        <>
            <div className="lg:hidden">
                {!isSidebarMounted && (
                    <button
                        type="button"
                        className="fixed left-4 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#111111] text-white shadow-lg transition duration-300 hover:bg-[#1B1B1B] cursor-pointer"
                        onClick={handleOpenSidebar}
                        aria-label={t("layout:sidebar.expand")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L8.94 8 5.22 4.28a.75.75 0 0 1 0-1.06"/>
                        </svg>
                    </button>
                )}

                {isSidebarMounted && (
                    <div className="fixed inset-0 z-50">
                        <button
                            type="button"
                            className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ease-in-out ${
                                isSidebarOpen ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={handleCloseSidebar}
                            aria-label={t("layout:sidebar.collapse")}
                        />

                        <button
                            type="button"
                            className="absolute left-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#1B1B1B] text-white transition duration-300 hover:bg-[#252525] cursor-pointer"
                            onClick={handleCloseSidebar}
                            aria-label={t("layout:sidebar.collapse")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.78 12.78a.75.75 0 0 1-1.06 0L5.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 1 1 1.06 1.06L7.06 8l3.72 3.72a.75.75 0 0 1 0 1.06"/>
                            </svg>
                        </button>

                        <div
                            className={`flex min-h-screen w-screen flex-col bg-[#111111] px-4 pb-6 pt-20 shadow-2xl transition-transform duration-300 ease-in-out ${
                                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <h1 className="text-6xl font-bold text-white space-grotesk text-center">
                                    {t("common:app.name")}
                                </h1>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="rounded-full bg-[#1B1B1B] shadow-lg flex items-center justify-center p-0.5">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={t("layout:sidebar.avatarAlt", { name: userName })}
                                                className="h-14 w-14 rounded-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white">
                                                {getInitials(userName)}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-white montserrat font-light text-center">
                                        {userName}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-1 flex-col justify-between gap-8">
                                {renderNavigation({
                                    labelVisibilityClass: "inline text-xl",
                                    linkClassName: "w-full",
                                    contentClassName: "justify-start",
                                })}
                                <LanguageSwitcher className="self-center mt-auto scale-100"/>
                                <div className="flex flex-col gap-4 border-t border-[#333333] pt-6">
                                    <button
                                        className="flex flex-row items-center justify-center gap-4 text-red-500 hover:text-red-700 transition duration-300 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right flex-shrink-0" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                        <span className="text-xl">{t("layout:nav.logout")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden bg-[#111111] lg:flex flex-col items-center min-h-full w-1/8 py-8 gap-4 shadow-lg">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" fill="white" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                            )}
                        </div>
                        <span className="text-white montserrat font-light hidden lg:block text-center text-nowrap">
                            {userName}
                        </span>
                    </div>
                    {renderNavigation({ labelVisibilityClass: "hidden lg:inline" })}
                </div>
                <LanguageSwitcher className="hidden scale-90 sm:inline-flex" />
                <button
                    className="flex flex-row items-center w-full self-start justify-center lg:justify-start pt-4 px-4 gap-4 
                    text-red-500 hover:text-red-700 transition duration-300 cursor-pointer border-t border-[#333333]"
                    onClick={handleLogout}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right flex-shrink-0" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                    <span className="hidden lg:inline text-xl">{t("layout:nav.logout")}</span>
                </button>
            </div>
        </>
    )
}

export default Sidebar;
