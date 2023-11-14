import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { ProductButton } from "./ProductButton";

export const ProductCarousel = ({ products, direction = "ltr" }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 2,
      direction,
      duration: 5000,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: true })]
  );

  return (
    <div className="embla w-full" ref={emblaRef}>
      <div
        className="embla__container flex items-center w-full justify-between gap-8"
        dir={direction}
      >
        {products.map((product, index) => (
          <ProductButton
            className="flex-[0_0_auto] min-w-0 ml-4"
            key={index}
            name={product}
          />
        ))}
      </div>
    </div>
  );
};
