import PropTypes from "prop-types";
import useFadeIn from "@/hooks/useFadeIn";
import { cn } from "@/lib/utils";

export default function FeatureCard({ title, description, icon, className, index }) {
    const isIconSrc = typeof icon === "string";

    useFadeIn(0.1);
    return (
        <article
            className={cn(
                "group relative flex min-h-[220px] flex-col overflow-hidden rounded-[25px] border border-white/12 bg-[#0E1624]/90 p-4 sm:min-h-[240px] sm:p-5 lg:min-h-[14rem]",
                "shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#101b2d]",
                className
            )}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_38%),
            radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_30%)] opacity-80 transition duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
            {icon && (
                <div className="pointer-events-none absolute right-0 top-1/2 z-0 flex h-[50%] w-[50%] -translate-y-1/2 items-center 
                justify-center opacity-20 blur-[2px] transition duration-300 group-hover:opacity-28 group-hover:scale-105">
                    {isIconSrc ? (
                        <img src={icon} alt="" className="h-full w-full object-contain" aria-hidden="true" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                            {icon}
                        </div>
                    )}
                </div>
            )}
            <div className="relative z-10 flex min-h-full flex-col">
                <div className="flex">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200/80">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
                <div className="mt-10 flex flex-col gap-2">
                    <h3 className="text-md font-semibold text-white montserrat md:text-lg lg:text-xl text-balance">
                        {title}
                    </h3>
                    <p className="text-xs text-white/72 inter-font leading-6 sm:text-sm text-pretty">
                        {description}
                    </p>
                </div>
            </div>
        </article>
    );
}

FeatureCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    className: PropTypes.string,
    index: PropTypes.number,
};