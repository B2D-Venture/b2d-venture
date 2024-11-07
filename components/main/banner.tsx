import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RedirectLoading from "../loading/RedirectLoading";

export function BannerCarousel({
  bannerData,
  length_banners,
}: {
  bannerData: Array<{ backgroundUrl: string }>;
  length_banners: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRedirectRegisterPage = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/role-register");
  };

  return (
    <>
      <Carousel className="w-full h-1/2">
        <CarouselContent className="w-full">
          {bannerData.map((banner, index) => (
            <CarouselItem key={index}>
              <div className="h-full w-full">
                {" "}
                <div
                  className="w-full h-[550px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${banner.backgroundUrl})`,
                    backgroundSize: "cover",
                  }}
                >
                  {index === 0 ? (
                    <div className="pl-8">
                      <span className="text-on-image-white">
                        Invest for Future in
                        <br></br>
                        Stable Platform and
                      </span>
                      <br></br>
                      <span className="text-on-image-orange">
                        Make Fast Money
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Optionally uncomment these for navigation */}
        {isLoading && <RedirectLoading />}
        <Link href="/role-register" onClick={handleRedirectRegisterPage}>
          <Button
            size="lg"
            className="absolute bottom-8 left-8 transform translate-y-0 border border-input bg-[#E8A117] shadow-sm hover:bg-accent hover:text-accent-foreground text-black"
          >
            Register
          </Button>
        </Link>
        <CarouselPrevious className="left-4 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="right-4 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </>
  );
}
