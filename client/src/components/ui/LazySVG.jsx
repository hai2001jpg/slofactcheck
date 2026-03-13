// LazySvg.js
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export default function LazySvg({ children }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // load once
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      {visible ? children : null}
    </div>
  );
}

LazySvg.propTypes = {
  children: PropTypes.node.isRequired,
};
