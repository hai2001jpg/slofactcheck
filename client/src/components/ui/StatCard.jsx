import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

const StatCard = ({ title, value, src}) => {
    const numericValue = useMemo(() => Number(value), [value]);
    const isNumeric = Number.isFinite(numericValue);
    // preserve the same decimal precision
    const decimalPlaces = useMemo(() => {
        if (!isNumeric) return 0;
        if (typeof value === "string" && value.includes(".")) {
            return value.split(".")[1].length;
        }
        return Number.isInteger(numericValue) ? 0 : 2;
    }, [isNumeric, numericValue, value]);

    const [animatedValue, setAnimatedValue] = useState(isNumeric ? 0 : value);

    useEffect(() => {
        if (!isNumeric) {
            setAnimatedValue(value);
            return;
        }

        // count up from 0 to <duration> on mount/value change.
        const duration = 900;
        let frameId;
        let startTime = null;

        const animate = (timestamp) => {
            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const nextValue = numericValue * progress;

            setAnimatedValue(progress === 1 ? numericValue : nextValue);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [isNumeric, numericValue, value]);

    // consistent integer and decimals formatting
    const displayValue = isNumeric
        ? (decimalPlaces > 0
            ? Number(animatedValue).toFixed(decimalPlaces)
            : Math.round(Number(animatedValue)).toLocaleString())
        : animatedValue;
    const showPercent = isNumeric && decimalPlaces > 0;

    return (
        <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-[#111111] p-4 lg:p-6 opacity-80 shadow-lg
        hover:scale-102 transition-transform duration-300 drop-shadow-lg">
            <div className="flex w-full flex-col md:flex-row gap-4 items-center">
                <img src={src} className="w-8 h-8 bg-transparent"/>
                <h2 className="w-full min-w-0 text-center md:text-left text-gray-300 montserrat text-sm lg:text-lg break-words [word-break:normal] [hyphens:auto]">
                    {title}
                </h2>
             </div>
            <span className="text-white text-3xl lg:text-5xl space-grotesk font-black mt-auto text-center sm:text-right sm:self-end text-nowrap">
                {displayValue}
                {showPercent && <span className="text-2xl lg:text-4xl">%</span>}
            </span>
        </div>
    );
}

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    src: PropTypes.string.isRequired,
};

export default StatCard;
