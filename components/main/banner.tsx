import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function BannerCarousel({
  bannerData,
  length_banners,
}: {
  bannerData: Array<{ backgroundUrl: string }>;
  length_banners: number;
}) {
  return (
    <>
      <Carousel className="w-full h-1/2">
        <CarouselContent className="w-full">
          {bannerData.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="h-full w-full">
                {" "}
                  <div
                    className="w-full h-[400px] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${banner.backgroundUrl})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Optionally uncomment these for navigation */}
        <CarouselPrevious className="left-4 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="right-4 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </>
  );
}
