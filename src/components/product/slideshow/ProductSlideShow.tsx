"use client";

import { Swiper as SwiperObject } from 'swiper'
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import './slideshow.css'

import Image from "next/image";
import { useState } from "react";
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


  return (
    <div className={className}>
      <Swiper
        // style={{
        //     '--swiper-navigation-color': '#fff',
        //     '--swiper-pagination-color': '#fff',
        //   } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3500,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.length === 0 ? (
          <SwiperSlide>
            <ProductImage
              src={""}
              height={800}
              width={1024}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ) : (
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                height={800}
                width={1024}
                alt={title}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              height={300}
              width={300}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
