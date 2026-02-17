import { Card, CardContent } from "@/components/ui/card";

interface IProps {
    Icon: React.ElementType;
    color: string;
    bgColor: string;
    title: string;
    value: number | string;
};

const FleetEarningsCard = ({ Icon, color, bgColor, title, value }: IProps) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${bgColor}`}>

                        <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    {/* <div
                        className={`flex items-center text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {change}
                        {trend === "up" ? (
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        ) : (
                            <ArrowDownRight className="w-4 h-4 ml-1" />
                        )}
                    </div> */}
                </div>
                <h3 className="text-gray-500 text-sm font-medium">
                    {title}
                </h3>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
};

export default FleetEarningsCard;