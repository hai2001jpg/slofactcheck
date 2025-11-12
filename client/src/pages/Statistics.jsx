import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

const Statistics = () => {
    return (
        <div className="flex flex-row justify-center min-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col items-center min-h-full w-full lg:w-7/8 bg-[#1B1B1B] py-4 lg:py-8 gap-4 lg:gap-8">
                <div className="self-start ml-4 lg:ml-16 gap-2 lg:gap-4 flex flex-col w-full">
                    <h1 className="text-3xl lg:text-5xl text-white font-[Montserrat] font-bold">
                        Your statistics
                    </h1>
                </div>

            </div>
        </div>
    )
}

export default Statistics;