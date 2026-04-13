import LazySvg from "@/components/ui/LazySVG";
import useFadeIn from "@/hooks/useFadeIn";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const { t } = useTranslation("home");
    useFadeIn(0.1);
    const mapQuery = encodeURIComponent("Němcovej 32, Košice, Slovenská republika");

    return (
        <div id="contact" className="w-full flex flex-col items-center mt-8 mb-4 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.95)_10%,rgba(0,0,0,0.95)_90%,transparent_100%)]">
            <div className="w-full max-w-7xl px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col md:flex-row justify-between gap-8 lg:gap-12">
                <div className="flex flex-col gap-4 md:max-w-[50%] w-full">
                    <h5 className="montserrat text-xl text-blue-500 font-bold fade-in-hidden">{t("contact.sectionLabel")}</h5>
                    <h1 className="montserrat text-5xl text-white font-bold fade-in-hidden">{t("contact.title")}</h1>
                    <p className="inter-font text-white text-lg text-balance fade-in-hidden">
                        {t("contact.description")}
                    </p>
                    <div className="text-white flex flex-row gap-2 sm:gap-3 items-start sm:items-center fade-in-hidden">
                        <LazySvg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0 text-white" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                            </svg>
                        </LazySvg>
                        <span className="inter-font text-sm sm:text-base lg:text-lg break-all sm:break-normal">kps.fei@tuke.sk</span>
                    </div>
                    <div className="text-white flex flex-row gap-2 sm:gap-3 items-start sm:items-center fade-in-hidden">
                        <LazySvg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0 text-white" viewBox="0 0 16 16">
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                        </LazySvg>
                        <span className="inter-font text-sm sm:text-base lg:text-lg">+421 55 602 2334</span>
                    </div>
                    <div className="text-white flex flex-row gap-2 sm:gap-3 items-start sm:items-center fade-in-hidden">
                        <LazySvg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0 text-white" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                        </LazySvg>
                        <span className="inter-font text-sm sm:text-base lg:text-lg">{t("contact.address")}</span>
                    </div>
                </div>
                <div className="w-full md:w-[48%] fade-in-hidden">
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
                            <iframe
                                title="Google maps - Němcovej 32, Košice"
                                src={`https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`}
                                className="absolute inset-0 h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
