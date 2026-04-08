import FeatureCard from "@/components/ui/FeatureCard";
import useFadeIn from "@/hooks/useFadeIn";
import { useTranslation } from "react-i18next";
import ML_icon from "@/assets/svg/ML.svg";
import NLP_icon from "@/assets/svg/NLP.svg";
import Language_icon from "@/assets/svg/language.svg";
import Accuracy_icon from "@/assets/svg/accuracy.svg";
import Speed_icon from "@/assets/svg/speed.svg";
import UserFriendly_icon from "@/assets/svg/user_friendly.svg";

const About = () => {
    const { t } = useTranslation("home");
    const features = t("about.features", { returnObjects: true });
    const bentoClasses = [
        "md:col-span-2 lg:col-span-2 lg:row-span-2",
        "lg:col-span-2",
        "lg:col-span-1",
        "md:col-span-2 lg:col-span-1",
        "md:col-span-2 lg:col-span-2",
        "md:col-span-2 lg:col-span-2",
    ];

    const icons = [ML_icon, NLP_icon, Language_icon, Accuracy_icon, Speed_icon, UserFriendly_icon];

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
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 md:px-10 lg:auto-rows-[minmax(14rem,_auto)] lg:grid-cols-4 lg:px-16">
                {Array.isArray(features) && features.map((feature, index) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                        index={index}
                        icon={icons[index]}
                        className={bentoClasses[index] ?? ""}
                    />
                ))}
            </div>
        </div>
    )
}

export default About;
