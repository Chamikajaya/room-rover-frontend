import {Star} from "lucide-react";

interface DescriptionProps {
    description: string
    starRating: number;
    hotelType: string;

}

export default function Description({description, starRating, hotelType}: DescriptionProps) {
    const formatDescription = (description: string | undefined): string[] => {
        if (!description) return [];
        return description.split('. ').map(sentence => sentence + (sentence.endsWith('.') ? '' : '.'));
    };

    return (
        <div className="mt-6 w-full max-w-4xl">

            <div className={"mb-4 flex items-center gap-6"}>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {hotelType}
                </span>
                <span className="flex">
                            {Array.from({length: starRating}).map((_, idx) => (
                                <Star className="fill-yellow-500 text-yellow-500" size={20} key={idx}/>
                            ))}
                        </span>
            </div>

            <span className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                About
            </span>
           <div className={"mt-4"}>
               {formatDescription(description).map((sentence, idx) => (
                   <p key={idx} className="text-gray-600 dark:text-gray-300 mb-3">{sentence}</p>
               ))}
           </div>
        </div>
    );

}