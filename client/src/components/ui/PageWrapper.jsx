import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function PageWrapper({ children, routeKey }) {
  const MotionDiv = motion.div;

  // key here is optional (we already key Routes), but harmless
  return (
    <MotionDiv
      key={routeKey}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-[60vh]" // prevents zero-height during quick transitions
    >
      {children}
    </MotionDiv>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  routeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
