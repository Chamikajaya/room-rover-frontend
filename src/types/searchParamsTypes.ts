export type SearchParams = {
    // all are of string type because they are coming from the URL

    checkIn: string;
    checkOut: string;
    numAdults: number;
    numChildren: number;
    destination: string;
    page: string;
}