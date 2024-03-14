"use client";
import "./swpr.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Card from "../card/Card";

export default function Swpr({ reviews }) {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards, Navigation]}
      navigation={false}
      cardsEffect={{
        perSlideRotate: 0,
      }}
      loop={false}
      initialSlide={0}
      direction={"vertical"}
      className="swiper"
    >
      {reviews.slice(0, 5).map((review, index) => (
        <SwiperSlide key={index} className="card">
          <Card review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
