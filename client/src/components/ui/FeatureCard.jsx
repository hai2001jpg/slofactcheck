import useFadeIn from "@/hooks/useFadeIn";

export default function FeatureCard({ title, description, icon }) {
    useFadeIn(0.1);
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 flex flex-col 
            items-center text-center hover:scale-105 hover:bg-white/15 transition-transform duration-300">
            <div className="text-blue-500 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white font-[Montserrat]">{title}</h3>
            <p className="text-white/80 text-balance inter-font text-sm">{description}</p>
        </div>
    );
}