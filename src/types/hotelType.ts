export type hotelType = {
    id: string,
    userId: string,
    name: string,
    description: string,
    city: string,
    country: string,
    pricePerNight: number,
    starRating: number,
    type: string,
    facilities: string[],
    imageURLs: string[],
    createdAt: Date,
    updatedAt: Date,
    numAdults: number,
    numChildren: number,
};


export type hotelSearchResponseFromBackend = {
    hotelsFound: hotelType[],
    paginationInfo: {
        totalHotels: number,
        totalPages: number,
        currPage: number,
    }

};
