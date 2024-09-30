// import React from "react";
// import Image from "next/image";
// import { BannerCarousel } from "./main/banner";

// const TextOnImage = () => {
//   return (
//     <div className="">
//       {/* <Image
//         className="w-full h-auto"
//         src="/img-main/background-img-main.png"
//         alt="Background"
//         width={1440}
//         height={630}
//       /> */}
//       <BannerCarousel 
//         bannerData={[1, 2, 3, 4, 5]}
//         length_banners={5}
//       />
//       {/* <div className="text-container-on-image">
//         <span className="text-on-image-white">
//           Invest for Future in
//           <br></br>
//           Stable Platform and
//         </span>
//         <br></br>
//         <span className="text-on-image-orange">Make Fast Money</span>
//       </div> */}
//     </div>
//   );
// };

// export default TextOnImage;

import React from "react";
import { BannerCarousel } from "./main/banner";

const TextOnImage = () => {
  const bannerData = [
    {
      backgroundUrl:
        "https://images.workpointtoday.com/workpointnews/2022/11/15081905/1668475141_74922_52345681_10156606559473124_7930833184248299520_n.jpeg",
    },
    {
      backgroundUrl:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/1766/production/_99709950_english.jpg",
    },
  ];

  return (
      <BannerCarousel bannerData={bannerData} length_banners={bannerData.length} />
  );
};

export default TextOnImage;
