"use client";
import "./swpr.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Mousewheel } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import Card from "../card/Card";

export default function Swpr({ reviews }) {
  return (
    <Swiper
      effect={"cards"}
      direction={"vertical"}
      grabCursor={true}
      mousewheel={true}
      navigation={false}
      loop={false}
      initialSlide={0}
      cardsEffect={{
        perSlideRotate: 0,
      }}
      modules={[EffectCards, Navigation, Mousewheel]}
      className="swiper"
    >
      {reviews?.map((review, index) => (
        <SwiperSlide key={index} className="card">
          <Card review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
