import {userType} from "@/types/userType";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Mail, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/auth-components/card-wrapper";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {paymentIntentResponseFromBackend} from "@/types/paymentIntentResponse";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";


interface BookingFormProps {
    currUser: userType
    paymentIntent: paymentIntentResponseFromBackend

}

export type  bookingValidation = {
    firstName: string;
    lastName: string;
    email: string;
}

export default function BookingForm({currUser, paymentIntent}: BookingFormProps) {

    const stripe = useStripe();
    const elements = useElements();


    const [isSubmitting, setIsSubmitting] = useState(false);


    const form = useForm<bookingValidation>({
        defaultValues: {
            email: currUser.email,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
        }
    })


    const onSubmit = async (formData: bookingValidation) => {
        try {
            setIsSubmitting(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/hotels/${paymentIntent.hotelId}/bookings`, {);

        } catch (e) {
            console.log(e);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }




    return (
        <CardWrapper
            title="Confirm Your Booking 🎉"
            backBtnLabel="Don't have an account ? "
            backBtnLink="/register"
            formTopic={"Booking 🏨"}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="space-y-4">
                        <div className="flex flex-col gap-3 md:flex-row md:gap-x-6">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                                            First Name
                                            <User/>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={"text"}
                                                disabled={true}
                                                readOnly={true}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={"font-normal flex gap-2 items-center"}>
                                            Last Name
                                            <User/>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={"text"}
                                                disabled={true}
                                                readOnly={true}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2"}>
                                        Email
                                        <Mail/>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={"text"}
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/*    STRIPE RELATED  */}
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">Net Amount</h2>

                            <div className="bg-gray-800 p-4 rounded-md">
                                <div className="font-semibold text-lg text-pretty">
                                    Total Cost: ${paymentIntent.totalAmount.toFixed(2)}
                                </div>
                                <div className="text-xs">Includes taxes and charges</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold"> Payment Details</h3>
                            <CardElement
                                id="payment-element"
                                className=" p-2 text-sm border rounded-md shadow-lg shadow-gray-800"
                            />
                        </div>

                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size={"sm"}
                        disabled={isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )

}