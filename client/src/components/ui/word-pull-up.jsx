"use client";;
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

function WordPullUp({
  words,

  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },

  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },

  className
}) {
  const MotionHeading = motion.h1;
  const MotionSpan = motion.span;

  return (
    <MotionHeading
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}>
      {words.split(" ").map((word, i) => (
        <MotionSpan
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}>
          {word === "" ? <span>&nbsp;</span> : word}
        </MotionSpan>
      ))}
    </MotionHeading>
  );
}

WordPullUp.propTypes = {
  words: PropTypes.string.isRequired,
  wrapperFramerProps: PropTypes.object,
  framerProps: PropTypes.object,
  className: PropTypes.string,
};

export { WordPullUp };
