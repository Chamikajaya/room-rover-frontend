import { CircleCheck } from "lucide-react";

interface FacilitiesDetailsProps {
    facilities: string[];
}

export default function FacilitiesDetails({ facilities }: FacilitiesDetailsProps) {
    return (
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap justify-center items-center mt-4 space-y-2 md:space-y-0 md:space-x-4">
            {facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                    <CircleCheck size={24} className="text-green-500" />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{facility}</span>
                </div>
            ))}
        </div>
    );
}
