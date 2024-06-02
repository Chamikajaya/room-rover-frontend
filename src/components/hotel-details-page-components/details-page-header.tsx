import {Star} from "lucide-react";

interface DetailsPageHeaderProps {
    name: string;
    city: string;
    country: string;
}

export default function DetailsPageHeader({name, city, country}: DetailsPageHeaderProps) {
    return (
        <div className="flex flex-col items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold mx-auto truncate overflow-hidden whitespace-nowrap">
                {name}
            </h1>
            <div className="flex items-center">
                <span className="flex"> {city} - {country}</span>
            </div>
        </div>
    );

};