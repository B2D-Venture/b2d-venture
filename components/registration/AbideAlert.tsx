import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import TermMessage from "./document/TermMessage";
import PrivacyMessage from "./document/PrivacyMessage";


export function AbideAlert({ type }: { type: "tos" | "privacy" }) {
    const title = type === "tos" ? "Terms of Service" : "Privacy Policy";
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <a className="border-b border-gray-500 border-dotted">
                    {title}
                </a>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="max-h-96 overflow-y-auto border-2 rounded-lg p-4">
                        {type === "tos" ? <TermMessage /> : <PrivacyMessage />}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
