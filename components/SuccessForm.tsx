import React from "react";
import { motion, useMotionValue } from "framer-motion";
import VerifyAnimation from "./VerifyAnimation";
import Link from "next/link";
import ShowStep from "@/components/ShowStepForm";

const SuccessForm = ({ role, hasApproval }: { role: string, hasApproval: boolean | null }) => {
  const progress = useMotionValue(90);
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");

  console.log("hasApproval", hasApproval);

  if (!hasApproval) {
    console.log("Waiting for admin approval of your information");
    // Reject Create Information

    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   setLoading(true);
    //   setMessage("");

    // try {

    //   // const response = await fetch("/api/mail", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   },
    //   //   body: JSON.stringify({
    //   //     email: "email.com",
    //   //     userFirstname: "firstName",
    //   //   }),
    //   // });

    //   // if (response.ok) {
    //   //   setMessage("Email sent successfully!");
    //   // } else {
    //   //   const errorData = await response.json();
    //   //   setMessage(`Error: ${errorData.message || "Failed to send email"}`);
    //   // }
    // }
    // catch (error) {
    //   console.error("Error:", error);
    //   // setMessage("Failed to send email");
    // }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl text-left text-black dark:text-white text-5xl font-bold mb-12 mt-5">
        {role} Profile
      </div>

      <div className="bg-[#D9D9D9] rounded-[30px] shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
        <div className="w-full flex justify-center mb-8">
          <ShowStep step={3} />
        </div>
        <div className="flex justify-center items-center mb-8">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 100 }}
            style={{ x: progress }}
            transition={{ duration: 1 }}
          />
          <VerifyAnimation progress={progress} />
        </div>
        <div className="text-center text-black text-4xl font-bold mb-4">
          Submit Success
        </div>

        {hasApproval === true ? (
          <div className="text-center text-[#939191] text-2xl mb-8">
            Your information has been approved successfully
          </div>
        ) : hasApproval === false ? (
          <div className="text-center text-[#939191] text-2xl mb-8">
            Your information has been rejected by admin
          </div>
        ) : (
          <div className="text-center text-[#939191] text-2xl mb-8">
            Waiting for admin approval of your information
          </div>
        )}

        <div className="w-full flex justify-center">
          <Link
            href={(role === "Investor") ? "/investor-profile" : (role === "Company") ? "/company-profile" : "/"}
            className="w-[211px] h-[51px] bg-black text-white text-xl font-bold rounded-full text-center transition duration-300 hover:bg-gray-800 flex items-center justify-center"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessForm;
