import FeatureCard from "@/components/ui/FeatureCard";
import useFadeIn from "@/hooks/useFadeIn";
import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation("home");
    const features = t("about.features", { returnObjects: true });
    useFadeIn(0.1);

    return (
        <div id="about" className="w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.95)_10%,rgba(0,0,0,0.95)_90%,transparent_100%)]
         flex flex-col gap-8 items-center py-8">
            <div className="max-w-full text-white px-4 sm:px-6 md:px-10 lg:px-40 flex flex-col gap-4 items-center">
                <h1 className="montserrat text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold text-nowrap fade-in-hidden">{t("about.title")}</h1>
                <p className="text-base sm:text-lg max-w-2xl text-center inter-font tracking-wide text-balance fade-in-hidden">
                    {t("about.description")}
                </p>
            </div>
            <h2 className="montserrat text-lg sm:text-2xl md:text-3xl lg:text-4xl text-blue-600 font-bold text-center 
            fade-in-hidden">
                {t("about.featuresTitle")}
            </h2>
            <div className="grid max-w-[80%] mx-auto gap-4 px-8 sm:px-16 md:px-20 lg:px-40 
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(features) && features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default About;
