

const PartnerPerformanceCard = ({ title, bottomText, value }: { title: string, bottomText: string, value: string }) => {
    return (
        <div className="bg-white/60 backdrop-blur rounded-2xl p-4 shadow-md border border-white/20 hover:shadow-xl transition">
            <div className="text-xs text-gray-500">{title}</div>
            <div className="mt-2 text-xl font-semibold">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{bottomText}</div>
        </div>
    );
};

export default PartnerPerformanceCard;