import ShimmerButton from "./ui/shimmer-button";
import dashboardImage from "../assets/dashboard.png";
import { BorderBeam } from "./ui/border-beam";
import Particles from "./ui/particles";
import { useNavigate } from "react-router-dom";


function Hero() {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center relative">
        <div className="w-[70vw] lg:w-[80vw] md:w-[90vw] mt-[6rem] text-[3rem] font-semibold text-center leading-tight">
            Unlock the Power of Machine Learning: Effortlessly Train, Customize, and Optimize Models for Your Data!
        </div>
        <div className="w-[45vw] lg:w-[60vw] md:w-[90vw] mt-[2rem] text-[1.2rem] text-center font-semibold text-[#424141]">
            Transform your data into insights with just a few clicks. Choose from multiple models, customize settings, and get accurate predictions with ease.
        </div>
        <ShimmerButton background="rgba(255, 255, 255, 1)" shimmerColor="#000000" shimmerSize="0.1em" borderRadius="20px" className="shadow-2xl text-black py-[8px] px-[50px] mt-[2rem] cursor-pointer"
        onClick={()=>{navigate("/dashboard")}}
        >
            <span 
            className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight dark:from-white dark:to-slate-900/10 lg:text-lg cursor-pointer"
            >
            Get Started
            </span>
        </ShimmerButton>

        <div className="w-full flex justify-center bg-black pb-[190px] relative">
            <div className="w-[80vw]  h-[500px] mt-[9rem] rounded-lg relative overflow-hidden outer-shadow">
                <div className="w-full h-full relative flex flex-col rounded-lg items-center justify-center overflow-hidden border border-[#262626] bg-background md:shadow-xl">
                    <span className="w-full h-full pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                        <img src={dashboardImage} alt="dashboardImage" 
                        className="w-full h-full rounded-md object-cover"
                        />
                    </span>
                    <BorderBeam size={200} duration={12} delay={2} borderWidth={3} />
                </div>
            </div>
            <div className="w-full h-full inner-shadow z-[100] absolute top-0 bottom-0"></div>
        </div>
        
        <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
        />
    </div>
  )
}

export default Hero