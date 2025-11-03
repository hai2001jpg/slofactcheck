import FeatureCard from "@/components/ui/FeatureCard";
import useFadeIn from "@/hooks/useFadeIn";

const About = () => {
    useFadeIn(0.1);
    return (
        <div id="about" className="w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.95)_10%,rgba(0,0,0,0.95)_90%,transparent_100%)]
         flex flex-col gap-8 items-center py-8">
            <div className="max-w-full text-white px-4 sm:px-6 md:px-10 lg:px-40 flex flex-col gap-4 items-center">
                <h1 className="font-[Montserrat] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold text-nowrap fade-in-hidden">What is SloFactCheck</h1>
                <p className="text-base sm:text-lg max-w-2xl text-center inter-font tracking-wide text-balance fade-in-hidden">
                    SloFactCheck is a platform for multilingual automatic detection of disinformation. 
                    We're on a mission to combat misinformation and help people make informed decisions based on verified, accurate information.
                </p>
            </div>
            <h2 className="font-[Montserrat] text-lg sm:text-2xl md:text-3xl lg:text-4xl text-blue-600 font-bold text-center 
            fade-in-hidden">
                Features    
            </h2>
            <div className="grid max-w-[80%] mx-auto gap-4 px-8 sm:px-16 md:px-20 lg:px-40 
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard title="AI-Powered Detection" 
                    description="Advanced machine learning algorithms analyze content patterns to identify potential misinformation with high accuracy."/>
                <FeatureCard title="Natural Language Processing" 
                    description="Utilizes state-of-the-art NLP models like mBERT, mT5, and XLM-RoBERTa to understand and analyze text in various languages."/>
                <FeatureCard title="Multilingual Support" 
                    description="Supports multiple languages, making it accessible to a global audience and effective in diverse linguistic contexts."/>
                <FeatureCard title="Accuracy rate 95%" 
                    description="Achieves a high accuracy rate of 95% in identifying false information, ensuring reliable verification results."/>
                <FeatureCard title="Fast Processing" 
                    description="Delivers quick results, allowing users to verify information in real-time and make informed decisions promptly."/>
                <FeatureCard title="User-Friendly Interface" 
                    description="Intuitive design ensures users can easily navigate the platform and access verification tools without technical expertise."/>
            </div>
        </div>
    )
}

export default About;