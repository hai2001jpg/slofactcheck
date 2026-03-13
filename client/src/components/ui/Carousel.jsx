import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import useFadeIn from "@/hooks/useFadeIn";
import LogoCard from "./LogoCard";
import react_logo from "@/assets/img/react.png";
import firebase_logo from "@/assets/img/firebase.png";
import tailwind_logo from "@/assets/img/tailwindcss_logo.png";
import pytorch_logo from "@/assets/img/pytorch_logo.png";
import flask_logo from "@/assets/img/flask_logo.png";

export default function LogoCarousel({ speed = 80 }) {
  useFadeIn(0.1);
  const innerRef = useRef(null);
  const [duration, setDuration] = useState(15);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const halfWidth = el.scrollWidth / 2;
    const seconds = halfWidth / speed; // px/s
    setDuration(seconds);
  }, [speed]);

  return (
    <div className="relative flex justify-center fade-in">
    
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10"></div>

      <div className="w-[50vw] sm:w-[45vw] md:w-[40vw] lg:w-[35vw] overflow-hidden">
        <div
          ref={innerRef}
          className="flex items-center whitespace-nowrap animate-infinite-scroll"
          style={{
            animation: `infinite-scroll ${duration}s linear infinite`,
          }}
        >
          <LogoCard img={react_logo} name="React.js" />
          <LogoCard img={tailwind_logo} name="TailwindCSS" />
          <LogoCard img={firebase_logo} name="Firebase" />
          <LogoCard img={flask_logo} name="Flask" invert/>
          <LogoCard img={pytorch_logo} name="PyTorch" to_white/>
          { /* duplicate */ }
          <LogoCard img={react_logo} name="React.js" />
          <LogoCard img={tailwind_logo} name="TailwindCSS" />
          <LogoCard img={firebase_logo} name="Firebase" />
          <LogoCard img={flask_logo} name="Flask" invert/>
          <LogoCard img={pytorch_logo} name="PyTorch" to_white/>

          <LogoCard img={react_logo} name="React.js" />
          <LogoCard img={tailwind_logo} name="TailwindCSS" />
          <LogoCard img={firebase_logo} name="Firebase" />
          <LogoCard img={flask_logo} name="Flask" invert/>
          <LogoCard img={pytorch_logo} name="PyTorch" to_white/>
          { /* duplicate */ }
          <LogoCard img={react_logo} name="React.js" />
          <LogoCard img={tailwind_logo} name="TailwindCSS" />
          <LogoCard img={firebase_logo} name="Firebase" />
          <LogoCard img={flask_logo} name="Flask" invert/>
          <LogoCard img={pytorch_logo} name="PyTorch" to_white/>
        </div>
      </div>
    </div>
  );
}

LogoCarousel.propTypes = {
  speed: PropTypes.number,
};
