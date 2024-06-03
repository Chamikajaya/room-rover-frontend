import {hotelType} from "@/types/hotelType";

interface BookingSummaryProps {
    hotel: hotelType,
    checkIn: Date,
    checkOut: Date,
    numAdults: number,
    numChildren: number,
    destination: string,
    nights: number

}

export default function BookingSummary({
                                           checkIn,
                                           checkOut,
                                           numAdults,
                                           numChildren,
                                           destination,
                                           nights,
                                           hotel

                                       }: BookingSummaryProps) {


    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Booking Summary</h1>
            <p><strong>Hotel:</strong> {hotel.name}</p>
            <p><strong>Destination:</strong> {destination}</p>
            <p><strong>Check-in Date:</strong> {checkIn.toDateString()}</p>
            <p><strong>Check-out Date:</strong> {checkOut.toDateString()}</p>
            <p><strong>Number of Adults:</strong> {numAdults}</p>
            <p><strong>Number of Children:</strong> {numChildren}</p>
            <p><strong>Number of Nights:</strong> {nights}</p>
        </div>
    )
}