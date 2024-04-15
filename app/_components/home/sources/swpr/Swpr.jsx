"use client";
import "./swpr.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Card from "../card/Card";

export default function Swpr({ users }) {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={0}
      centeredSlides={false}
      loop={true}
      draggable={true}
      navigation={true}
      modules={[Navigation]}
      className="swiper"
    >
      {users?.map((user, index) => (
        <SwiperSlide key={index}>
          <Card user={user} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
