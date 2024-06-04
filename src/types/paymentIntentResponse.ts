export type paymentIntentResponseFromBackend = {
    paymentIntentId: string,
    clientSecret: string,
    totalAmount: number,
};