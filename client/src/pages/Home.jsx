import { Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import screenshot from "@/assets/img/up_demo.png";
import useFadeIn from "@/hooks/useFadeIn";

const Home = () => {
  useFadeIn(0.1);
    return (
    <div id="home" className="bg max-w-full flex flex-col overflow-hidden mt-8">
      <div className='max-w-full text-white px-4 sm:px-6 md:px-10 lg:px-40'>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl montserrat font-bold tracking-tight max-w-4xl text-center capitalize fade-in-hidden">
              SloFactCheck - your AI buddy for disinformation detection
          </h1>
          <p className="text-base text-gray-400 sm:text-lg max-w-2xl text-center inter-font font-normal tracking-wide text-balance fade-in-hidden">
            Powered by multilingual NLP models, SloFactCheck helps you quickly spot false information in news articles, social media posts,
            and other online content.
          </p>
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 sm:py-4 sm:px-8 cursor-pointer flex flex-row items-center gap-2
             mt-4 transition duration-300 hover:-translate-y-1">
              <span className="inter-font">Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0
                1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </button>
          </Link>
          <img src={screenshot} title="App Preview" className="mt-8 rounded-lg shadow-lg w-full max-w-4xl object-contain fade-mask border-1 
          gradient-border fade-in-hidden"/>
        </div>
      </div>
      <About />
      <Contact />
    </div>
    )
}

export default Home;  