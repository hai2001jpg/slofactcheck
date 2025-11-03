import { useState } from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/ui/typing-animation"

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const navbarHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
            const targetPosition = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
        setOpen(false);
    };

    return (
        <nav className="fixed navbar top-0 z-50 w-full py-4 shadow-md border-b border-gray-600 bg-transparent">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-40 flex items-center justify-between">
                <div className="min-w-[200px]">
                    <Link to="/" aria-label="Home">
                        <TypingAnimation text="SloFactCheck" className="text-3xl font-bold text-white space-grotesk" />
                    </Link>
                </div>

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex gap-12 text-md text-white font-[Montserrat] font-[500]">
                        <button onClick={() => scrollToSection("home")} className="cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">Home</button>
                        <button onClick={() => scrollToSection("about")} className="cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300 text-nowrap">About SFC</button>
                        <button onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">Contact</button>
                    </div>

                    <div className="flex gap-4 font-[Montserrat] text-md">
                        <Link to="/login"><button className="text-white px-4 py-2 rounded-md border border-[rgb(58,58,58)] hover:border-white transition duration-300 text-nowrap">Log In</button></Link>
                        <Link to="/login"><button className="bg-blue-600 text-white px-4 py-2 rounded-md border border-blue-600 hover:border-white transition duration-300 text-nowrap">Sign Up</button></Link>
                    </div>
                </div>

                {/* hamburger menu */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
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
                        className="bg-[#070809] overflow-hidden transition-all duration-300 ease-out"
                        style={{ maxHeight: open ? '420px' : '0px', opacity: open ? 1 : 0 }}
                        aria-hidden={!open}
                    >
                        <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-4 items-center py-4">
                            <button onClick={() => scrollToSection("home")} className="w-full text-white cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">Home</button>
                            <button onClick={() => scrollToSection("about")} className="w-full text-white cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">About SFC</button>
                            <button onClick={() => scrollToSection("contact")} className="w-full text-white cursor-pointer hover:text-gray-300 hover:translate-y-1 transition duration-300">Contact</button>
                            <div className="w-full flex gap-4 justify-center pt-2">
                                <Link to="/login"><button className="text-white px-4 py-2 rounded-md border border-[rgb(58,58,58)] hover:border-white transition duration-300">Log In</button></Link>
                                <Link to="/login"><button className="bg-blue-600 text-white px-4 py-2 rounded-md border border-blue-600 hover:border-white transition duration-300">Sign Up</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar;
