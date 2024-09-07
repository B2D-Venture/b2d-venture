// "use client";
// import { useSession, signIn, signOut } from "next-auth/react";
// import React from "react";
// import { FcGoogle } from "react-icons/fc";
// import { IoPeopleCircleOutline } from "react-icons/io5";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth";
// import Image from "next/image";


// export default async function GoogleSignInButton() {
//   const session = await getServerSession(authConfig);

//   const signInClick = async () => {
//     try {
//       await signIn("google", { callbackUrl: "/" });
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={signInClick} className="google-button">
//         <div className="google-label">
//           <FcGoogle className="mr-3 text-lg" />
//           Sign in with Google
//         </div>
//         <div className="flex justify-center text-yellow-500 text-2xl">
//           <IoPeopleCircleOutline />
//         </div>
//       </button>
//     </div>
//   );
// };


// // +++++++=

// // const GoogleSignInButton = () => {
// //   const signInClick = async () => {
// //     try {
// //       await signIn("google", { callbackUrl: "/" });
// //     } catch (error) {
// //       console.error("Sign-in failed:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <button onClick={signInClick} className="google-button">
// //         <div className="google-label">
// //           <FcGoogle className="mr-3 text-lg" />
// //           Sign in with Google
// //         </div>
// //         <div className="flex justify-center text-yellow-500 text-2xl">
// //           <IoPeopleCircleOutline />
// //         </div>
// //       </button>
// //     </div>
// //   );
// // };

// // export default GoogleSignInButton;


// // "use client";
// // import { signIn, useSession } from "next-auth/react";
// // import React from "react";
// // import { FcGoogle } from "react-icons/fc";
// // import { IoPeopleCircleOutline } from "react-icons/io5";

// // const GoogleSignInButton = () => {
// //   // const { data: session } = useSession();

// //   const signInClick = () => {
// //     signIn("google", { callbackUrl: "/" });
// //   };

// //   return (
// //     <button onClick={signInClick} className="google-button">
// //       <div className="google-label">
// //         <FcGoogle className="mr-3 text-lg" />
// //         Sign in with Google
// //       </div>
// //       <div className="flex justify-center text-yellow-500 text-2xl">
// //         <IoPeopleCircleOutline />
// //       </div>
// //     </button>
// //   );
// // };

// // export default GoogleSignInButton;

"use client"; // This is a client-side component

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { IoPeopleCircleOutline } from "react-icons/io5";

const GoogleSignInButton = () => {
  const signInClick = () => {
    signIn("google");
  };

  return (
    <div>
      <button onClick={signInClick} className="google-button">
        <div className="google-label">
          <FcGoogle className="mr-3 text-lg" />
          Sign in with Google
        </div>
        <div className="flex justify-center text-yellow-500 text-2xl">
          <IoPeopleCircleOutline />
        </div>
      </button>
    </div>
  );
};

export default GoogleSignInButton;