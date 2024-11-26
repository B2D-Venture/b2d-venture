// // "use client";

// // import React, { useEffect, useState } from "react";
// // import CompanyCard from "@/components/company/card/CompanyCard";
// // import SearchBar from "@/components/SearchBar";
// // import { getAllCompanies, getInvesmentByFundingId } from "@/lib/db/index";
// // import { useSearchParams } from "next/navigation";
// // import { CompanyWithRaiseFunding } from "@/types/company";
// // import CompanyPageLoading from "@/components/loading/CompanyPageLoading";
// // import { BiSearch } from "react-icons/bi";

// // const CompanyList = () => {
// //   const [allCompanies, setAllCompanies] = useState<CompanyWithRaiseFunding[]>(
// //     [],
// //   );
// //   const [filteredCompanies, setFilteredCompanies] = useState<
// //     CompanyWithRaiseFunding[]
// //   >([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const searchParams = useSearchParams();

// //   useEffect(() => {
// //     const fetchCompanies = async () => {
// //       try {
// //         const companiesData = await getAllCompanies();
// //         const companies = await Promise.all(
// //           companiesData.map(async (item) => {
// //             try {
// //               return {
// //                 ...item.company,
// //                 fundingTarget: item.raiseFunding?.fundingTarget ?? null,
// //                 minInvest: item.raiseFunding?.minInvest ?? null,
// //                 maxInvest: item.raiseFunding?.maxInvest ?? null,
// //                 deadline: item.raiseFunding?.deadline ?? null,
// //                 priceShare: item.raiseFunding?.priceShare ?? null,
// //                 valuation: item.raiseFunding?.valuation ?? null,
// //                 investorCount: (
// //                   await getInvesmentByFundingId(Number(item.raiseFunding?.id))
// //                 ).length,
// //               };
// //             } catch (mapError) {
// //               console.error("Error in mapping companies:", mapError);
// //               return null;
// //             }
// //           })
// //         );

// //         const validCompanies = companies.filter(Boolean);
// //         setAllCompanies(validCompanies);

// //         // setAllCompanies(companies);
// //         setFilteredCompanies(validCompanies);
// //       } catch (error) {
// //         console.error("Error fetching companies:", error);
// //         setError("Failed to load companies.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCompanies();
// //   }, []);

// //   useEffect(() => {
// //     const searchQuery = searchParams.get("search") || "";
// //     const searchPattern = searchQuery.toLowerCase();

// //     const filtered = allCompanies.filter((company) => {
// //       const name = company.name?.toLowerCase() || "";
// //       const description = company.description?.toLowerCase() || "";
    
// //       return (
// //         name.includes(searchPattern) ||
// //         description.includes(searchPattern)
// //       );
// //     });

// //     setFilteredCompanies(filtered);
// //   }, [searchParams, allCompanies]);

// //   const handleSort = (field: string, order: "asc" | "desc") => {
// //     const sortedCompanies = [...filteredCompanies].sort((a, b) => {
// //       const aValue = a[field];
// //       const bValue = b[field];

// //       if (typeof aValue === "number" && typeof bValue === "number") {
// //         return order === "asc" ? aValue - bValue : bValue - aValue;
// //       }

// //       if (typeof aValue === "string" && typeof bValue === "string") {
// //         return order === "asc"
// //           ? aValue.localeCompare(bValue)
// //           : bValue.localeCompare(aValue);
// //       }

// //       return 0;
// //     });

// //     setFilteredCompanies(sortedCompanies);
// //   };

// //   return (
// //     <div className="mb-20">
// //       <SearchBar
// //         initialSearch={searchParams.get("search") || ""}
// //         classSearch="search-sort"
// //         showSort={true}
// //         onSortChange={handleSort}
// //       />
// //       {loading && <CompanyPageLoading />}
// //       {error && (<div className="flex flex-wrap m-10 text-white">{error}</div>)}
// //       {filteredCompanies.length === 0 && !loading && (
// //         <div className="flex flex-col justify-center items-center mt-40 text-3xl font-bold space-y-4">
// //           <div className="animate-pulse">
// //             <BiSearch className="text-9xl" />
// //           </div>
// //           <p>No companies found.</p>
// //           <p className="text-lg text-gray-400">Try adjusting your search.</p>
// //         </div>
// //       )}

// //       <div
// //         className="
// //         grid grid-cols-2 gap-4 
// //         md:grid-cols-3
// //         xl:grid-cols-4
// //         2xl:grid-cols-5
// //         3xl:grid-cols-6
// //         4xl:grid-cols-7
// //         5xl:grid-cols-9
// //         6xl:grid-cols-11
// //         7xl:grid-cols-12
// //         "
// //       >
// //         {filteredCompanies.map((company) => (
// //           <div key={company.id} className="flex-1">
// //             <CompanyCard company={company} className="w-[270px]" />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CompanyList;

// "use client";

// import React, { useEffect, useState } from "react";
// import CompanyCard from "@/components/company/card/CompanyCard";
// import SearchBar from "@/components/SearchBar";
// import { getAllCompanies, getInvesmentByFundingId } from "@/lib/db/index";
// import { useSearchParams } from "next/navigation";
// import { CompanyWithRaiseFunding } from "@/types/company";
// import CompanyPageLoading from "@/components/loading/CompanyPageLoading";
// import { BiSearch } from "react-icons/bi";

// const CompanyList = () => {
//   const [allCompanies, setAllCompanies] = useState<CompanyWithRaiseFunding[]>(
//     []
//   );
//   const [filteredCompanies, setFilteredCompanies] = useState<
//     CompanyWithRaiseFunding[]
//   >([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const companiesData = await getAllCompanies();
//         const companies = await Promise.all(
//           companiesData.map(async (item) => ({
//             ...item.company,
//             fundingTarget: item.raiseFunding?.fundingTarget ?? 0,
//             investorCount: (
//               await getInvesmentByFundingId(Number(item.raiseFunding?.id ?? 0))
//             )?.length || 0,
//           }))
//         );

//         const validCompanies = companies.filter(Boolean);
//         setAllCompanies(validCompanies);
//         setFilteredCompanies(validCompanies);
//       } catch (error) {
//         console.error("Error in getAllCompanies:", error);
//         setError("Failed to load companies.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   useEffect(() => {
//     const searchQuery = searchParams.get("search") || "";
//     const searchPattern = searchQuery.toLowerCase();

//     const filtered = allCompanies.filter((company) => {
//       const name = company.name?.toLowerCase() || "";
//       const description = company.description?.toLowerCase() || "";

//       return name.includes(searchPattern) || description.includes(searchPattern);
//     });

//     setFilteredCompanies(filtered);
//   }, [searchParams, allCompanies]);

//   const handleSort = (field: string, order: "asc" | "desc") => {
//     const sortedCompanies = [...filteredCompanies].sort((a, b) => {
//       const aValue = a[field];
//       const bValue = b[field];

//       if (typeof aValue === "number" && typeof bValue === "number") {
//         return order === "asc" ? aValue - bValue : bValue - aValue;
//       }

//       if (typeof aValue === "string" && typeof bValue === "string") {
//         return order === "asc"
//           ? aValue.localeCompare(bValue)
//           : bValue.localeCompare(aValue);
//       }

//       return 0;
//     });

//     setFilteredCompanies(sortedCompanies);
//   };

//   return (
//     <div className="mb-20">
//       <SearchBar
//         initialSearch={searchParams.get("search") || ""}
//         classSearch="search-sort"
//         showSort={true}
//         onSortChange={handleSort}
//       />
//       {loading && <CompanyPageLoading />}
//       {error && (
//         <div className="flex flex-wrap m-10 text-white bg-red-500 p-4 rounded">
//           {error}
//         </div>
//       )}
//       {filteredCompanies.length === 0 && !loading && (
//         <div className="flex flex-col justify-center items-center mt-40 text-3xl font-bold space-y-4">
//           <div className="animate-pulse">
//             <BiSearch className="text-9xl" />
//           </div>
//           <p>No companies found.</p>
//           <p className="text-lg text-gray-400">Try adjusting your search.</p>
//         </div>
//       )}

//       <div
//         className="
//         grid grid-cols-2 gap-4 
//         md:grid-cols-3
//         xl:grid-cols-4
//         2xl:grid-cols-5
//         3xl:grid-cols-6
//         4xl:grid-cols-7
//         5xl:grid-cols-9
//         6xl:grid-cols-11
//         7xl:grid-cols-12
//         "
//       >
//         {filteredCompanies.map((company) => (
//           <div key={company.id} className="flex-1">
//             <CompanyCard company={company} className="w-[270px]" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CompanyList;
// export const dynamic = "force-dynamic";

"use client";

import React, { Suspense } from "react";
import CompanyList from "@/components/company/CompanyList";

const CompanyPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CompanyList />
    </Suspense>
  );
};

export default CompanyPage;
