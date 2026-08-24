import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import img_1 from "../../assets/hero_img1.webp";
import img_2 from "../../assets/hero_img2.webp";
import img_3 from "../../assets/hero_img3.webp";
import {Button} from '@mui/material'
import {Link} from 'react-router-dom'
const slides = [img_1, img_2, img_3];

export default function Hero() {
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
    <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
      <div ref={emblaRef}>
        <div className="flex">
          {slides.map((image, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%] px-1 relative">
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                className="h-48 w-full rounded-xl object-cover sm:h-64 md:h-80 lg:h-[420px] xl:h-[480px]"
              />
               
              <Button variant="contained" component={Link}
              to='/shop'
              sx = {{
                position:"absolute",
                bottom:100,
                left:50,
                
              }}
              >
                shop now
              </Button>
              
           
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
