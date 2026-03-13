import PropTypes from "prop-types";
import { cva } from "class-variance-authority"
import { motion } from "motion/react";

import { cn } from "@/lib/utils"

const waveLoaderVariants = cva("flex gap-2 items-center justify-center", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
})

export function WaveLoader({
  bars = 5,
  message,
  messagePlacement,
  className,
  ...props
}) {
  const MotionDiv = motion.div;

  return (
    <div className={cn(waveLoaderVariants({ messagePlacement }))}>
      <div className={cn("flex gap-1 items-center justify-center")}>
        {Array(bars)
          .fill(undefined)
          .map((_, index) => (
            <MotionDiv
              key={index}
              className={cn("w-2 h-5 bg-white origin-bottom", className)}
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.1,
              }}
              {...props} />
          ))}
      </div>
      {message && <div>{message}</div>}
    </div>
  );
}

WaveLoader.propTypes = {
  bars: PropTypes.number,
  message: PropTypes.string,
  messagePlacement: PropTypes.oneOf(["bottom", "right", "left"]),
  className: PropTypes.string,
};
