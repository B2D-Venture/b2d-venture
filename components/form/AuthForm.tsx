import React, { useState, useEffect, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SignInLoading from "@/components/loading/SignInLoading";
import SideImage from "@/components/registration/SideImage";
import GoogleButton from "@/components/registration/GoogleButton";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormMessage,
    FormControl,
    FormItem,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import PasswordField from "./elements/PasswordField";
import { getUser } from "@/lib/db/index";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import ReCAPTCHA from "react-google-recaptcha";
import { AbideAlert } from "../registration/AbideAlert";
import { AuthFormProps, FormValues } from "@/types/form/index.d";
import { User } from "@/types/user";
import { Checkbox } from "../ui/checkbox";

const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
});

const signUpSchema = signInSchema.extend({
    checkboxAbide: z.boolean().refine((value) => value === true, {
        message: "Please agree to the terms of service and privacy policy",
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const otpFormSchema = z.object({
    pin: z
        .string()
        .regex(/^\d+$/, { message: "Your one-time password must contain only numbers." })
        .length(6, { message: "Your one-time password must be exactly 6 digits." })
});

const generateOTP = () => {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};

const sendOtpCode = async (otp: string, email: string) => {
    try {
        const response = await fetch("/api/mail/otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                validationCode: otp,
                email: email,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error: ${errorData.message || "Failed to send email"}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const AuthForm: React.FC<AuthFormProps> = ({ title, apiPath, redirectPath, linkPath, linkText }) => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResendOTP, setCanResendOTP] = useState(false);
    const [otp, setOtp] = useState<string | null>(null);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [captchaValid, setCaptchaValid] = useState(false);
    const [captchaError, setCaptchaError] = useState<string | null>(null);

    const callbackUrlRef = useRef<string>(searchParams.get('callbackUrl') || pathname);

    const form = useForm<FormValues>({
        resolver: zodResolver(title === "Sign In" ? signInSchema : signUpSchema),
        defaultValues: title === "Sign Up"
            ? { email: "", password: "", confirmPassword: "", checkboxAbide: false }
            : { email: "", password: "" },
    });

    const otpForm = useForm<z.infer<typeof otpFormSchema>>({
        resolver: zodResolver(otpFormSchema),
        defaultValues: {
            pin: "",
        },
    });

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/user');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [status, pathname, router]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (showOTPModal && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setCanResendOTP(true);
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [showOTPModal, timeLeft]);

    if ((callbackUrlRef.current === "/signup" || callbackUrlRef.current === "/signin") && user) {
        if (user.roleId === 2) {
            router.push(`/investor-profile`);
        } else if (user.roleId === 3) {
            router.push(`/company/${user.roleIdNumber}`);
        } else if (user.roleId === 1) {
            router.push(`/`);
        }
    }

    if (status === "loading") return <SignInLoading />;

    const handleAuth = async () => {
        const email = form.getValues("email");
        setError(null);

        try {
            if (title === "Sign In") {
                const password = form.getValues("password");

                const res = await fetch("/api/auth/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || "Sign-in failed.");
                    return;
                }

                if (res.ok) {
                    const signInRes = await signIn("credentials", {
                        redirect: false,
                        email: form.getValues("email"),
                        password: form.getValues("password"),
                    });

                    if (signInRes?.error) {
                        alert("Error signing in after registration: " + signInRes.error);
                    }
                    else {
                        router.push(callbackUrlRef.current === "/signin" ? "/" : callbackUrlRef.current);
                    }
                } else {
                    setError(data.error || "Sign-in failed.");
                    return;
                }
            }
            else if (title === "Sign Up") {
                const user = await getUser(email);
                if (user) {
                    setError("User already exists");
                    return;
                }

                if (!captchaValid) {
                    setCaptchaError("Please complete the reCAPTCHA.");
                    return;
                }
                setShowOTPModal(true);
                const otp = generateOTP();
                sendOtpCode(otp, email);
                setOtp(otp);
            }
            else if (title === "Reset Password") {
                if (!captchaValid) {
                    setCaptchaError("Please complete the reCAPTCHA.");
                    return;
                }

                setShowOTPModal(true);
                const otp = generateOTP();
                sendOtpCode(otp, email);
                setOtp(otp);
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    };

    const handleResendOTP = () => {
        setTimeLeft(60);
        setCanResendOTP(false);
        const otp = generateOTP();
        sendOtpCode(otp, form.getValues("email"));
        setOtp(otp);
    };

    const handleCaptchaChange = (value: string | null) => {
        if (value) {
            setCaptchaValid(true); // Captcha is valid
        } else {
            setCaptchaValid(false); // Captcha not completed
        }
    };

    async function handleVerifyOTP(data: z.infer<typeof otpFormSchema>) {
        if (data.pin === otp) {
            const res = await fetch(apiPath, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.getValues("email"),
                    password: form.getValues("password"),
                }),
            });

            if (title === "Sign Up") {
                if (res.ok) {
                    const signInRes = await signIn("credentials", {
                        redirect: false,
                        email: form.getValues("email"),
                        password: form.getValues("password"),
                    });

                    if (signInRes?.error) {
                        alert("Error signing in after registration: " + signInRes.error);
                    }
                    else {
                        router.push(callbackUrlRef.current === "/signup" ? "/" : callbackUrlRef.current);
                    }
                } else {
                    const error = await res.json();
                    alert(error.error);
                }
            } else if (title === "Reset Password") {
                if (res.ok) {
                    router.push("/signin");
                }
            }

            setShowOTPModal(false);
        } else {
            setOtpError("Invalid OTP");
        }
    }

    return (
        <div className="h-screen flex justify-center bg-[#c9c9c9]">
            <div className="flex h-full w-full lg:w-3/5">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-gray-100 text-black">
                    <SideImage />
                </div>
                <div className="w-full bg-white lg:w-1/2 flex items-center justify-center">
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">{title}</h1>
                        {title === "Reset Password" && (
                            <p className="text-sm text-gray-500 mt-2">
                                Enter your username and a new password.
                            </p>
                        )}
                        <div className="w-full flex-1 mt-4">
                            {title !== "Reset Password" && (
                                <div>
                                    <div className="flex flex-col items-center">
                                        <GoogleButton callbackUrl={callbackUrlRef.current} title={title} />
                                    </div>
                                    <div className="my-3 border-b text-center">
                                        <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                            Or {title.toLowerCase()} with email
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="w-72 max-w-xs">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleAuth) as any}
                                        className="space-y-3">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Email" className="w-full px-8 py-6 rounded-lg bg-gray-100 border text-sm focus:outline-none" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <PasswordField form={form} name="password" />

                                        {title === "Sign In" && (
                                            <div className="flex justify-end">
                                                <Link href="/reset-password">
                                                    <span className="text-xs text-gray-500 hover:underline">Reset password?</span>
                                                </Link>
                                            </div>
                                        )}
                                        {title !== "Sign In" && (<PasswordField form={form} name="confirmPassword" />)}
                                        {error && (
                                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                                        )}
                                        {title !== "Sign In" && (
                                            <div>
                                                <ReCAPTCHA sitekey={process.env.RECAPTCHA_PUBLIC_KEY!} onChange={handleCaptchaChange} className="flex justify-center items-center mx-auto" />
                                                {captchaError && <p className="text-red-500 text-sm">{captchaError}</p>}
                                            </div>
                                        )}
                                        {title === "Sign Up" && (
                                            <FormField
                                                key={title}
                                                control={form.control}
                                                name="checkboxAbide"
                                                render={({ field }) => (
                                                    <FormItem className="space-x-3 space-y-0 rounded-md border p-4">
                                                        <div className="flex space-x-3">
                                                            <FormControl>
                                                                <Checkbox
                                                                    id="checkboxAbide"
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <p className="text-sm text-gray-600">
                                                                <label htmlFor="checkboxAbide">
                                                                    I agree to&nbsp;
                                                                    <AbideAlert type="tos" /> and&nbsp;
                                                                    <AbideAlert type="privacy" />
                                                                </label>
                                                            </p>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        )}
                                        <Button
                                            className="mt-5 h-30 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            type="submit"
                                        >
                                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-3">
                                                {title}
                                            </span>
                                        </Button>
                                        <p className="text-center text-sm mt-5 text-gray-500">
                                            {linkText}&nbsp;
                                            <Link href={linkPath} className="font-semibold text-gray-600 hover:underline focus:text-gray-800">here</Link>.
                                        </p>
                                    </form>
                                </Form >
                            </div>
                            {showOTPModal && (title !== "Sign In") && (
                                <Dialog open={showOTPModal} onOpenChange={setShowOTPModal}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Enter OTP Code</DialogTitle>
                                            <DialogDescription>
                                                Please enter the code sent to your email.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-center items-center w-full">
                                            <Form {...otpForm}>
                                                <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="w-2/3 space-y-6">
                                                    <div className="flex justify-center items-center">
                                                        <FormField
                                                            control={otpForm.control}
                                                            name="pin"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <InputOTP maxLength={6} {...field}>
                                                                            <div className="flex space-x-2">
                                                                                <InputOTPGroup>
                                                                                    <InputOTPSlot index={0} />
                                                                                </InputOTPGroup>
                                                                                <InputOTPGroup>
                                                                                    <InputOTPSlot index={1} />
                                                                                </InputOTPGroup>
                                                                                <InputOTPGroup>
                                                                                    <InputOTPSlot index={2} />
                                                                                </InputOTPGroup>
                                                                                <InputOTPGroup>
                                                                                    <InputOTPSlot index={3} />
                                                                                </InputOTPGroup>
                                                                                <InputOTPGroup>
                                                                                    <InputOTPSlot index={4} />
                                                                                </InputOTPGroup>
                                                                                <InputOTPGroup>
                                                                                    <InputOTPSlot index={5} />
                                                                                </InputOTPGroup>
                                                                            </div>
                                                                        </InputOTP>
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    {otpError && (
                                                        <p className="text-red-500 text-sm text-center">{otpError}</p>
                                                    )}
                                                    <div className="text-center text-sm text-gray-500">
                                                        {canResendOTP ? (
                                                            <button
                                                                onClick={handleResendOTP}
                                                                className="text-indigo-600 hover:underline"
                                                            >
                                                                Resend OTP
                                                            </button>
                                                        ) : (
                                                            <span>Resend OTP in {timeLeft} seconds</span>
                                                        )}
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            className="w-full bg-indigo-500 text-white rounded-lg"
                                                            type="submit"
                                                        >
                                                            Verify
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </Form>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AuthForm;
export const dynamic = "force-dynamic";