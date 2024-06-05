"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewPasswordSchema, newPasswordSchema } from "@/schemas/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import CardWrapper from "@/components/auth-components/card-wrapper";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: ""
        }
    });

    const onSubmit = async (formData: NewPasswordSchema) => {
        if (success) {
            setError("You have already reset your password. Please login with your new password.");
            setSuccess("")
            return;
        }

        setError("");
        setIsPending(true);

        if (!token) {
            setIsPending(false);
            setError("Token not found");
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/reset-password`,
                {
                    newPassword: formData.password,
                    token
                }
            );

            if (response.status === 200) {
                setSuccess("Password reset successfully. Please login with your new password.");
                form.reset();
            }
        } catch (e) {
            console.log(e);
            toast.error("Could not reset password. Please try again later.");
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <CardWrapper formTopic={"Password Reset 🔑"} title={"Reset your password"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2 items-center"}>
                                        New Password
                                        <Lock />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="*****"
                                            type="password"
                                            autoCorrect="off"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={"font-normal flex gap-2 items-center"}>
                                        Confirm New Password
                                        <Lock />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="*****"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage className={"text-red-400 font-normal"} />
                                </FormItem>
                            )}
                        />
                    </div>
                    {error && <FormError errMessage={error} />}
                    {success && <FormSuccess successMessage={success} />}
                    <Button type="submit" disabled={isPending} className="w-full">
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}
