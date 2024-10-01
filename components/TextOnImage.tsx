import React from "react";
import { BannerCarousel } from "./main/banner";

const TextOnImage = () => {
  const bannerData = [
    {
      backgroundUrl:
      "/img-main/background-img-main.png"
    },
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
