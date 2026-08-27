import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import img_1 from "../../assets/hero_img1.webp";
import img_2 from "../../assets/hero_img2.webp";
import img_3 from "../../assets/hero_img3.webp";

const slides = [img_1, img_2, img_3];

export default function Hero() {
  const { t } = useTranslation();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden bg-white px-4 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div ref={emblaRef}>
        <div className="flex">
          {slides.map((image, index) => (
            <div
              key={index}
              className="relative min-w-0 flex-[0_0_100%] px-1"
            >
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="h-48 w-full rounded-xl object-cover sm:h-64 md:h-80 lg:h-[420px] xl:h-[480px]"
              />

              <div className="absolute inset-0 rounded-xl bg-black/20" />

              <Button
                variant="contained"
                component={Link}
                to="/shop"
                className="
                  !absolute !z-10
                  !bottom-4 sm:!bottom-8 md:!bottom-12 lg:!bottom-20
                  !left-1/2 !-translate-x-1/2
                  !rounded-lg
                  !px-4 sm:!px-6 md:!px-8
                  !py-2 sm:!py-3
                  !text-sm sm:!text-base
                "
              >
                {t("home.hero.shopNow")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
