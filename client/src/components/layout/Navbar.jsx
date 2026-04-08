import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { TypingAnimation } from "@/components/ui/typing-animation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const { t } = useTranslation(["layout", "common"]);
    const [open, setOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { user, logout, loading } = useAuth();
    const isAuthenticated = Boolean(user);
    const initials = user?.displayName
        ? user.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
        : (user?.email?.[0] ?? "U").toUpperCase();
    const avatarUrl = user?.photoURL ?? "";
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isBusy = loading || isLoggingOut;

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const navbarHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
            const targetPosition = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            setOpen(false);
            if (isHome) {
                setIsRefreshing(true);
                setTimeout(() => window.location.reload(), 350);
                return;
            }
        } catch (error) {
            console.error("Failed to log out", error);
        } finally {
            if (!isHome) {
                setIsLoggingOut(false);
            }
        }
    };

    return (
        <nav className="fixed navbar top-0 z-50 w-full py-4 shadow-md border-b border-gray-600">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-40 flex items-center justify-between">
                <div className="min-w-[200px]">
                    <Link to="/" aria-label={t("layout:nav.homeAria")}>
                        <TypingAnimation text={t("common:app.name")} className="text-3xl font-bold text-white space-grotesk" />
                    </Link>
                </div>

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center gap-12">
                    <div className="flex gap-12 text-md text-white bebas-neue text-xl">
                        <button onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">{t("layout:nav.home")}</button>
                        <button onClick={() => scrollToSection("about")} className="cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300 text-nowrap">{t("layout:nav.about")}</button>
                        <button onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">{t("layout:nav.contact")}</button>
                    </div>

                    {isAuthenticated ? (
                        <div className="flex gap-4 items-center bebas-neue text-md">
                            <div className="rounded-full bg-white/10 border border-white/20 text-white h-10 w-10 flex items-center justify-center font-semibold uppercase overflow-hidden">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        title={user?.displayName ?? t("common:fallback.guest")}
                                        className="h-full w-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>
                            <Link to="/userpanel">
                                <button className="text-white px-4 py-2 rounded-md border border-[rgb(58,58,58)] hover:border-white transition duration-300 text-nowrap cursor-pointer">
                                    {t("layout:nav.userPanel")}
                                </button>
                            </Link>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md border border-red-600 hover:border-white transition duration-300 text-nowrap disabled:opacity-50  cursor-pointer"
                                onClick={handleLogout}
                                disabled={isBusy}
                            >
                                {isBusy ? t("layout:nav.loggingOut") : t("layout:nav.logout")}
                            </button>
                            <LanguageSwitcher />
                        </div>
                    ) : (
                        <div className="flex gap-4 montserrat text-md items-center">
                            <Link to="/login"><button className="text-white px-4 py-2 rounded-md border border-[rgb(58,58,58)] hover:border-white transition duration-300 text-nowrap cursor-pointer">{t("layout:nav.login")}</button></Link>
                            <Link to="/login"><button className="bg-blue-600 text-white px-4 py-2 rounded-md border border-blue-600 hover:border-white transition duration-300 text-nowrap cursor-pointer">{t("layout:nav.signup")}</button></Link>
                            <LanguageSwitcher />
                        </div>
                    )}
                </div>

                {/* hamburger menu */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={t("layout:nav.toggleMenu")}
                        aria-expanded={open}
                        className="p-1 rounded-full text-white cursor-pointer hover:bg-gray-700 transition duration-300"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {open ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
                <div className="lg:hidden">
                    <div
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ maxHeight: open ? '420px' : '0px', opacity: open ? 1 : 0 }}
                        aria-hidden={!open}
                    >
                        <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-4 items-center py-4">
                            <button onClick={() => scrollToSection("home")} className="w-full text-white bebas-neue text-2xl sm:text-lg cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">{t("layout:nav.home")}</button>
                            <button onClick={() => scrollToSection("about")} className="w-full text-white bebas-neue text-2xl sm:text-lg cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">{t("layout:nav.about")}</button>
                            <button onClick={() => scrollToSection("contact")} className="w-full text-white bebas-neue text-2xl sm:text-lg cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">{t("layout:nav.contact")}</button>
                            <LanguageSwitcher />
                            {isAuthenticated ? (
                                <div className="w-full flex flex-col sm:flex-row gap-4 justify-center pt-2 items-center">
                                    <div className="rounded-full bg-white/10 border border-white/20 text-white h-10 w-10 flex items-center justify-center font-semibold uppercase overflow-hidden">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                title={user?.displayName ?? t("common:fallback.guest")}
                                                className="h-full w-full object-cover"
                                                referrerPolicy="no-referrer"
                                            />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    <Link to="/userpanel" onClick={() => setOpen(false)}>
                                        <button className="text-white montserrat px-4 py-2 rounded-md border border-[rgb(58,58,58)] hover:border-white transition duration-300 cursor-pointer">
                                            {t("layout:nav.userPanel")}
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-600 text-white montserrat px-4 py-2 rounded-md border border-red-600 hover:border-white transition duration-300 disabled:opacity-50 cursor-pointer"
                                        onClick={handleLogout}
                                        disabled={isBusy}
                                    >
                                        {isBusy ? t("layout:nav.loggingOut") : t("layout:nav.logout")}
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full flex gap-4 justify-center pt-2 montserrat">
                                    <Link to="/login"><button className="text-white px-4 py-2 rounded-md border border-[rgb(58,58,58)] hover:border-white transition duration-300">{t("layout:nav.login")}</button></Link>
                                    <Link to="/login"><button className="bg-blue-600 text-white px-4 py-2 rounded-md border border-blue-600 hover:border-white transition duration-300">{t("layout:nav.signup")}</button></Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            {isRefreshing && (
                <div className="fixed top-16 inset-x-0 flex justify-center pointer-events-none">
                    <span className="bg-black/60 text-white/80 text-sm px-4 py-2 rounded-full animate-pulse">
                        {t("layout:nav.refreshingSession")}
                    </span>
                </div>
            )}
        </nav>
    )
}

export default Navbar;
