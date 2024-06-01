import { hotelType } from "@/types/hotelType";
import Image from "next/image";
import { ArrowBigRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HotelCardProps {
    hotel: hotelType;
}

export default function HotelCard({ hotel }: HotelCardProps) {
    return (
        <div className="mt-8 p-6 border border-primary rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 grid grid-cols-1 xl:grid-cols-[2fr_3fr] gap-8 transition-transform transform hover:scale-105">

            {/* IMAGE COL */}
            <div className="w-full h-64 relative rounded-lg overflow-hidden">
                <Image
                    src={hotel.imageURLs[0]}
                    alt={hotel.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="transition-transform transform hover:scale-110"
                />
            </div>

            {/* INFO COL */}
            <div className="flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-2">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map((_, idx) => (
                                <Star className="fill-yellow-500 text-yellow-500" size={20} key={idx} />
                            ))}
                        </span>
                        <span className="ml-2 text-lg text-gray-700 dark:text-gray-300">{hotel.type}</span>
                    </div>
                    <Link href={`/hotel-details/${hotel.id}`} className="text-2xl font-bold text-gray-900 dark:text-white hover:underline">
                        {hotel.name}
                    </Link>
                </div>

                <div className="my-4">
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{hotel.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{hotel.pricePerNight} $ per night</span>

                    <div className="flex gap-2 items-center">
                        {hotel.facilities.slice(0, 2).map((facility, idx) => (
                            <span className="bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-semibold" key={idx}>
                                {facility}
                            </span>
                        ))}
                        {hotel.facilities.length > 2 && (
                            <span className="text-sm text-gray-700 dark:text-gray-400">
                                +{hotel.facilities.length - 2} more
                            </span>
                        )}
                    </div>

                    <Link href={`/hotel-details/${hotel.id}`}>
                        <Button className="flex items-center justify-center" size={"icon"}>
                            <ArrowBigRight />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
