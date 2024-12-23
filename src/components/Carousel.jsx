"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Carousel({ slides }) {
  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      navigation={true}
      loop
      className="mx-auto content-center"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className='mx-auto max-w-max px-24 text-center'>
            <div className='font-heading'>{slide.body}</div>
            <br />
            <div className='font-heading'>- {slide.author}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
