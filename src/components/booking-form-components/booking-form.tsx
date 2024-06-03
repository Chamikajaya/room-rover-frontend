import {userType} from "@/types/userType";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Mail, User} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/auth-components/card-wrapper";
import {useState} from "react";
import toast from "react-hot-toast";


interface BookingFormProps {
    currUser: userType
}

export type  bookingValidation = {
    firstName: string;
    lastName: string;
    email: string;
}

export default function BookingForm({currUser}: BookingFormProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);


    const form = useForm<bookingValidation>({
        defaultValues: {
            email: currUser.email,
            firstName: currUser.firstName,
            lastName: currUser.lastName,
        }
    })


    // ! CHANGE TYPE ARG LATER for onSubmit function
    const onSubmit = async (formData: bookingValidation) => {
        try {
            setIsSubmitting(true);
            console.log(formData);
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