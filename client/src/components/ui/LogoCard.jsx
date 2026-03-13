
import PropTypes from "prop-types";

function LogoCard({ img, name, to_white = false, invert = false }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={img}
        alt={name}
        loading="lazy"
        className={`w-[1.5rem] h-auto ${invert ? "invert" : ""} ${to_white ? "to-white" : ""}`}
      />
      <span className="font-[Montserrat] text-base text-white">{name}</span>
    </div>
  );
}

LogoCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  to_white: PropTypes.bool,
  invert: PropTypes.bool,
};

export default LogoCard;
