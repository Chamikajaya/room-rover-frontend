import { userType } from "@/types/userType";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth-components/card-wrapper";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { paymentIntentResponseFromBackend } from "@/types/paymentIntentResponse";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import {PaymentMethodResult, StripeCardElement} from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import SearchContext from "../../../context/search-context";

interface BookingFormProps {
    currUser: userType;
    paymentIntent: paymentIntentResponseFromBackend;
}

export type bookingValidation = {
    firstName: string;
    lastName: string;
    email: string;
    numAdults: number;
    numChildren: number;
    checkIn: Date;
    checkOut: Date;
};

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#ffffff", // text-white
            fontSize: "16px", // text-base
            "::placeholder": {
                color: "#aab7c4", // text-gray-400
            },
            backgroundColor: "#1f2937", // bg-gray-800
            
        },
        invalid: {
            color: "#fa755a", // text-red-500
        },
    },
};

export default function BookingForm({ currUser, paymentIntent }: BookingFormProps) {

    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const search: SearchContext | undefined = useContext(SearchContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const form = useForm<bookingValidation>({
        defaultValues: {
            email: currUser.email,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
            numAdults: search?.numAdults,
            numChildren: search?.numChildren,
            checkIn: search?.checkIn,
            checkOut: search?.checkOut,
        },
    });

    const bookRoom = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${id}/bookings`,
                {
                    paymentIntentId: paymentIntent.paymentIntentId,
                    firstName: form.getValues("firstName"),
                    lastName: form.getValues("lastName"),
                    email: form.getValues("email"),
                    totalPrice: paymentIntent.totalAmount,
                    checkIn: search?.checkIn,
                    checkOut: search?.checkOut,
                    numAdults: search?.numAdults,
                    numChildren: search?.numChildren,
                },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setIsPaymentSuccessful(true);
                toast.success("Booking Successful. We have sent you an email with the booking details.", {duration: 20000});
            }
        } catch (e) {
            setIsPaymentSuccessful(false);
            console.error(e);
            toast.error("Something went wrong");
        }
    };

    const onSubmit = async () => {
        try {
            setIsSubmitting(true);

            const cardElement = elements?.getElement(CardElement) as StripeCardElement;
            const { paymentMethod, error } = await stripe?.createPaymentMethod({
                type: "card",
                card: cardElement,
            }) as PaymentMethodResult;

            if (error) {
                toast.error(error.message as string);
                setIsSubmitting(false);
                return;
            }

            const result = await stripe?.confirmCardPayment(paymentIntent.clientSecret, {
                payment_method: paymentMethod?.id,
            });

            if (result?.paymentIntent?.status === "succeeded") {
                await bookRoom();
            } else {
                toast.error("Payment failed");
            }
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <CardWrapper title="Confirm Your Booking 🎉" formTopic={"Booking 🏨"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-3 md:flex-row md:gap-x-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                                            First Name
                                            <User />
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type={"text"} disabled={true} readOnly={true} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                                            Last Name
                                            <User />
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type={"text"} disabled={true} readOnly={true} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2"}>
                                        Email
                                        <Mail />
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type={"text"} disabled={true} readOnly={true} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Net Amount</h2>
                            <div className="bg-gray-800 p-4 rounded-md">
                                <div className="font-semibold text-lg text-pretty">
                                    Total Cost: ${paymentIntent.totalAmount.toFixed(2)}
                                </div>
                                <div className="text-xs">Taxes Included</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Card Details</h3>
                            <CardElement id="payment-element" options={CARD_ELEMENT_OPTIONS} className="shadow-lg shadow-gray-800" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <Button type="submit" className="w-full md:w-1/2" size={"sm"} disabled={isSubmitting || isPaymentSuccessful}>
                            Confirm Booking
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
}
