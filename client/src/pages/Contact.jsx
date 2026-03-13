import LazySvg from "@/components/ui/LazySVG";
import useFadeIn from "@/hooks/useFadeIn";

const Contact = () => {
    useFadeIn(0.1);

    return (
        <div id="contact" className="w-full flex flex-col items-center mt-8 mb-4 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.95)_10%,rgba(0,0,0,0.95)_90%,transparent_100%)]">
            <div className="w-full max-w-7xl px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col md:flex-row justify-evenly gap-8 md:gap-0">
                <div className="flex flex-col gap-4 md:max-w-[50%] w-full">
                    <h5 className="montserrat text-xl text-blue-500 font-bold fade-in-hidden">Contact</h5>
                    <h1 className="montserrat text-5xl text-white font-bold fade-in-hidden">Let us know how we can help</h1>
                    <p className="inter-font text-white text-lg text-balance fade-in-hidden">
                        We're here to help and answer any question you might have. 
                        We look forward to hearing from you! 
                        Please fill out the form, or use the contact information below.
                    </p>
                    <div className="text-white flex flex-row gap-2 items-center fade-in-hidden">
                        <LazySvg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="white" className="bi bi-envelope" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                            </svg>
                        </LazySvg>
                        <span className="inter-font">kps.fei@tuke.sk</span>
                    </div>
                    <div className="text-white flex flex-row gap-2 items-center fade-in-hidden">
                        <LazySvg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="white" className="bi bi-telephone" viewBox="0 0 16 16">
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                        </LazySvg>
                        <span className="inter-font">+421 55 602 2334</span>
                    </div>
                    <div className="text-white flex flex-row gap-2 items-center fade-in-hidden">
                        <LazySvg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="white" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                        </LazySvg>
                        <span className="inter-font">Němcovej 32, Košice, Slovenská Republika</span>
                    </div>
                </div>
                <form className="flex flex-col w-full md:w-[50%] py-4 mt-5 gap-4 items-center">
                    <div className="w-full sm:w-96 flex flex-col gap-1 fade-in-hidden">
                        <label htmlFor="email" className="text-gray-400 text-sm montserrat">
                            Your e-mail
                        </label>
                        <input id="email" type="email" className="text-white p-3 rounded-lg border border-gray-300 
                        bg-transparent w-full focus:outline-none focus:border-blue-500 transition"/>
                    </div>
                    <div className="w-full sm:w-96 flex flex-col gap-1 fade-in-hidden">
                        <label htmlFor="subject" className="text-gray-400 text-sm montserrat">
                            Subject
                        </label>
                        <input id="subject" type="text" className="text-white p-3 rounded-lg border border-gray-300 
                        bg-transparent w-full focus:outline-none focus:border-blue-500 transition"/>
                    </div>
                    <div className="w-full sm:w-96 flex flex-col gap-1 fade-in-hidden">
                        <label htmlFor="message" className="text-gray-400 text-sm montserrat">
                            Message
                        </label>
                        <textarea id="message" rows="4" className="text-white p-3 rounded-lg border border-gray-300 
                        bg-transparent w-full focus:outline-none focus:border-blue-500 transition"></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-600 w-full sm:w-96 py-3 px-6 mt-2 rounded-full 
                        flex justify-center items-center gap-2 transition duration-300 hover:bg-blue-700 
                        fade-in-hidden cursor-pointer">
                        <span className="inter-font">Send Message</span>
                        <LazySvg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1vw" height="1vw" fill="white" className="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                        </svg>
                        </LazySvg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Contact;