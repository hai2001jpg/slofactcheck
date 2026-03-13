import PropTypes from "prop-types";

export const factCheckResultShape = PropTypes.shape({
  platform: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.string,
  ratingRaw: PropTypes.string,
  url: PropTypes.string,
});

export const analysisShape = PropTypes.shape({
  id: PropTypes.string,
  input: PropTypes.string,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  confidence: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topic: PropTypes.string,
  model: PropTypes.string,
  factCheckResults: PropTypes.arrayOf(factCheckResultShape),
  factCheckError: PropTypes.string,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      seconds: PropTypes.number,
    }),
  ]),
});
