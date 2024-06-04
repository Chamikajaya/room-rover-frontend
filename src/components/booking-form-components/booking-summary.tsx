import {hotelType} from "@/types/hotelType";

interface BookingSummaryProps {
    hotel: hotelType;
    checkIn: Date | null;
    checkOut: Date | null;
    numAdults: number;
    numChildren: number;
    nights: number;
}

export default function BookingSummary({
                                           checkIn,
                                           checkOut,
                                           numAdults,
                                           numChildren,
                                           nights,
                                           hotel
                                       }: BookingSummaryProps) {
    return (
        <div className="p-6 bg-black rounded-lg shadow-md ">
            <h1 className="text-2xl font-semibold mb-6 text-white text-center tracking-tighter">Booking Summary 📃</h1>
            <div className="space-y-4">
                <div className={"flex flex-col gap-1"}>
                    <h2 className="text-sm text-white font-normal">Hotel</h2>
                    <p className="text-xl text-gray-300 font-semibold">{hotel.name}</p>
                </div>
                {checkIn && (
                    <div>
                        <h2 className="text-sm text-white font-normal">Check-in Date</h2>
                        <p className="text-lg text-gray-300 font-semibold">{checkIn.toDateString()}</p>
                    </div>
                )}
                {checkOut && (
                    <div>
                        <h2 className="text-sm text-white font-normal">Check-out Date</h2>
                        <p className="text-lg text-gray-300 font-semibold">{checkOut.toDateString()}</p>
                    </div>
                )}
                <div>
                    <h2 className="text-sm text-white font-normal">Guests</h2>
                    <p className="text-lg text-gray-300 font-semibold">{numAdults} Adults & {numChildren} Children</p>
                </div>
                <div>
                    <h2 className="text-sm text-white font-normal">Number of Nights</h2>
                    <p className="text-lg text-gray-300 font-semibold">{nights}</p>
                </div>
            </div>
        </div>
    );
}