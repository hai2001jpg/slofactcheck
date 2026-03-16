import PropTypes from "prop-types";

export default function ChartCard({ title, description, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-[#111111] p-4 lg:p-6 shadow-lg ${className} opacity-80`}>
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="montserrat text-lg font-semibold text-white lg:text-xl">{title}</h2>
        {description && <p className="montserrat text-sm text-gray-400">{description}</p>}
      </div>
      <div className="min-h-[280px]">{children}</div>
    </section>
  );
}

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};