import React from 'react'
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TopUpFields from './elements/TopUpFields';
import { increaseInvestorAmount } from "@/lib/db/index";
import { TopUpFormProps } from '@/types/form/index.d';

const formSchema = z.object({
    email: z.string()
        .email("Invalid email address")
        .min(1, "Email is required"),
    nameOnCard: z.string()
        .regex(/^[a-zA-Z\s]*$/, "Name on card must be alphabetic")
        .min(1, "Name on card is required")
        .max(100, "Name on card cannot exceed 100 characters"),
    address: z.string()
        .min(1, "Address is required")
        .max(100, "Address cannot exceed 100 characters"),
    cardNumber: z.string()
        .length(16, "Credit Card number must be exactly 16 digits")
        .regex(/^\d+$/, "Credit Card number must be numeric"),
    city: z.string()
        .min(1, "City is required")
        .max(100, "City cannot exceed 100 characters"),
    expMonth: z.string()
    .regex(
        /^(0[1-9]|1[0-2])$/,
        "Expiry month must be a valid month between 01 and 12"
      )
      .nonempty("Expiry month is required"),
    state: z.string()
        .min(1, "State is required")
        .max(100, "State cannot exceed 100 characters"),
    zipCode: z.string()
        .regex(/^\d+$/, "Zip code must be numeric")
        .min(1, "Zip code is required"),
    expYear: z.string() // must be only 4 digits
        .length(4, "Expiry year must be exactly 4 digits")
        .regex(/^\d+$/, "Expiry year must be numeric"),
    cvv: z.string()
        .regex(/^\d+$/, "CVV must be numeric")
        .length(3, "CVV must be exactly 3 digits"),
    topUpAmount: z.number()
        .min(1, "Top up amount is required")
        .max(100000, "Top up amount cannot exceed 100000"),
});


const TopUpForm = ({ investorId, email, closeDialog }: TopUpFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email,
            nameOnCard: "",
            address: "",
            cardNumber: "",
            city: "",
            expMonth: "",
            state: "",
            zipCode: "",
            expYear: "",
            cvv: "",
            topUpAmount: 0,
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        increaseInvestorAmount({ investorId, amount: data.topUpAmount });
        closeDialog();
        window.location.reload();
    };

    return (
        <div className="container">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className="inputBox">
                            <span>Cards Accepted :</span>
                            <Image src="/img-payment/card_img.png" alt="" width={200} height={100} />
                        </div>
                        <TopUpFields
                            control={form.control}
                            name="email"
                            label="Email"
                            dataId="email-input"
                            type="text"
                            placeholder="example@example.com"
                            disabled={true}
                        />
                        <TopUpFields
                            control={form.control}
                            name="nameOnCard"
                            label="Name on Card"
                            dataId="nameOnCard-input"
                            type="text"
                        />
                        <TopUpFields
                            control={form.control}
                            name="address"
                            label="Address"
                            dataId="address-input"
                            type="text"
                            placeholder="room - street - locality"
                        />
                        <TopUpFields
                            control={form.control}
                            name="cardNumber"
                            label="Credit Card Number"
                            dataId="cardNumber-input"
                            type="text"
                        />
                        <TopUpFields
                            control={form.control}
                            name="city"
                            label="City"
                            dataId="city-input"
                            type="text"
                        />
                        <TopUpFields
                            control={form.control}
                            name="expMonth"
                            label="Exp Month"
                            dataId="expMonth-input"
                            type="text"
                            placeholder="xx"
                        />
                        <TopUpFields
                            control={form.control}
                            name="topUpAmount"
                            label="Top Up Amount ($)"
                            dataId="topUpAmount-input"
                            type="number"
                        />
                        <div className="flex col-span-2 gap-2">
                            <TopUpFields
                                control={form.control}
                                name="state"
                                label="State"
                                dataId="state-input"
                                type="text"
                            />
                            <TopUpFields
                                control={form.control}
                                name="zipCode"
                                label="Zip Code"
                                dataId="zipCode-input"
                                type="text"
                                placeholder='xxxx'
                            />
                            <TopUpFields
                                control={form.control}
                                name="expYear"
                                label="Exp Year"
                                dataId="expYear-input"
                                type="text"
                                placeholder='xxxx'
                            />
                            <TopUpFields
                                control={form.control}
                                name="cvv"
                                label="CVV"
                                dataId="cvv-input"
                                type="text"
                                placeholder='xxx'
                            />
                        </div>
                    </div>

                    <Button type="submit" className="submit-btn">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default TopUpForm;