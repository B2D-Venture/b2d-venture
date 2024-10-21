// 'use client';

// import React, { useState, useEffect } from "react";
// import { useFormState } from "../FormContext";
// import RoleSelectForm from "../RoleSelectForm";
// import InvestorForm from "./InvestorForm";
// import CompanyForm from "./CompanyForm";
// import SuccessForm from "../SuccessForm";
// import { Skeleton } from "@/components/ui/skeleton"
// import { getInvestorRequestById } from "@/lib/db/index";

// export default function FormStep() {
//   const [user, setUser] = useState<User | null>(null);
//   const [roleSelected, setRoleSelected] = useState<string | null>("");
//   const { step } = useFormState();
//   const [loading, setLoading] = useState(true);
//   const [successRole, setSuccessRole] = useState<string | null>(null);
//   const [hasApproval, setHasApproval] = useState<boolean | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch('/api/user');
//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//       } else {
//         window.location.href = `/signup?callbackUrl=/role-register`;
//       }
//       setLoading(false);
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (step === 2) {
//       setRoleSelected("Investor");
//     } else if (step === 3) {
//       setRoleSelected("Company");
//     }
//   }, [step]);

//   if (loading) {
//     return (
//       <div className="w-full h-[600px] flex flex-col items-center">
//         <div className="w-full max-w-7xl text-left">
//           <Skeleton className="w-1/4 h-8 mb-12 mt-5 rounded-[30px]" />
//         </div>

//         <div className="bg-[#D9D9D9] rounded-xl shadow-lg p-8 max-w-7xl w-full max-h-7xl h-full">
//           <div className="w-full flex justify-center mb-8">
//             <Skeleton className="w-[562px] h-[72px] rounded-xl" />
//           </div>
//           <div className="flex justify-center items-center mb-8">
//             <Skeleton className="w-[300px] h-[300px] rounded-xl" />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (user) {
//     if (user.roleId !== 1) {
//       if (user.roleId === 2) {
//         const fetchInvestorRequest = async () => {
//           const investorRequest = await getInvestorRequestById(user.roleIdNumber);
//           setHasApproval(investorRequest.approval);
//           setSuccessRole("Investor");
//         };
//         fetchInvestorRequest();
//       }
//       else if (user.roleId === 3) {
//         (async () => {
//           const fundingRequest = await getInvestorRequestById(user.roleIdNumber);
//           return <SuccessForm role="Company" hasApproval={fundingRequest.approval} />;
//         })();
//         // return <SuccessForm role="Company" />;
//       }
//     }
//   }

//   if (step === 1) {
//     return <RoleSelectForm />;
//   }
//   if (step === 2) {
//     return <InvestorForm />;
//   }
//   if (step === 3) {
//     return <CompanyForm />;
//   }
//   if (step === 4) {
//     return <SuccessForm role={roleSelected || ""} hasApproval={null} />;
//   }

//   return null;
// };


'use client';

import React, { useState, useEffect } from "react";
import { useFormState } from "../FormContext";
import RoleSelectForm from "../RoleSelectForm";
import InvestorForm from "./InvestorForm";
import CompanyForm from "./CompanyForm";
import SuccessForm from "../SuccessForm";
import { 
  getInvestorRequestById, 
  getRecentRaiseFundingByCompanyId,
  getRaiseFundingRequestById,
} from "@/lib/db/index";
import FormSubmitLoading from "@/components/loading/FormSubmitLoading";

export default function FormStep() {
  const [user, setUser] = useState<User | null>(null);
  const [roleSelected, setRoleSelected] = useState<string | null>("");
  const { step } = useFormState();
  const [loading, setLoading] = useState(true);
  const [successRole, setSuccessRole] = useState<string | null>(null);
  const [hasApproval, setHasApproval] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        window.location.href = `/signup?callbackUrl=/role-register`;
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (step === 2) {
      setRoleSelected("Investor");
    } else if (step === 3) {
      setRoleSelected("Company");
    }
  }, [step]);

  useEffect(() => {
    const fetchApprovalStatus = async () => {
      if (user) {
        if (user.roleId === 2) {
          const requestData = await getInvestorRequestById(user.roleIdNumber);
          setHasApproval(requestData.approval);
          setSuccessRole("Investor");
        } else if (user.roleId === 3) {
          const recentFunding = await getRecentRaiseFundingByCompanyId(user.roleIdNumber);
          const fundingRequest = await getRaiseFundingRequestById(recentFunding.id);
          setHasApproval(fundingRequest.approval);
          setSuccessRole("Company");
        }
      }
    };

    fetchApprovalStatus();
  }, [user]);

  if (loading) {
    return (
      <FormSubmitLoading />
    );
  }

  if (user && user.roleId !== 1) {
    return <SuccessForm role={successRole || ""} hasApproval={hasApproval} />;
  }

  if (step === 1) {
    return <RoleSelectForm />;
  }
  if (step === 2) {
    return <InvestorForm />;
  }
  if (step === 3) {
    return <CompanyForm />;
  }

  return null;
}
