
const StatCard = ({ title, value, src }) => {
    return (
        <div className="flex flex-col gap-4 bg-[#111111] p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-1/3">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-gray-400 font-[Montserrat] font-semibold text-base lg:text-lg">
                    {title}
                </h2>
                <img src={src} className="w-8 h-8 bg-transparent fill-white"/>
             </div>
            <span className="text-white text-xl lg:text-2xl font-black">{value}</span>
        </div>
    );
}

export default StatCard;