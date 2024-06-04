import {hotelType} from "@/types/hotelType";
import HotelCard from "@/components/HotelCard";

interface LatestHotelsProps {
    hotels: hotelType[];

}

export default function LatestHotels({hotels}: LatestHotelsProps) {

    console.log(hotels);
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 mx-auto text-center">Latest Hotels from Room Rover</h2>
            <div className="flex flex-col gap-5 w-5/6 mx-auto mt-10">
                    {hotels.map(hotel => (
                        <HotelCard key={hotel.id} hotel={hotel}/>
                    ))}

            </div>

        </div>
    )
}