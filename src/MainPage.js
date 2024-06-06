import {
	atom,
	constSelector,
	selector,
	useRecoilValue,
	useSetRecoilState,
} from 'recoil';

import React, { useState, useEffect } from "react";
import "../styles/main_page.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { accessTokenState } from '../hooks/Auth.jsx';

// Import components
import Footer from "../components/footer.jsx"


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const MainPage = () => {
  console.log('hello? : ', useRecoilValue(accessTokenState));
  return (
    <div id="wrapper">
      <div id="navbar">
        <div id="navbar_content_wrapper">
          <div id="navbar_content_left">
            <div id="main_logo_text">또박이</div>
          </div>
          <div id="navbar_content_right">
            <a href="" className="navbar_a_text">
              회원가입
            </a>
            <div className="vertical_line"></div>
            <a href="" className="navbar_a_text">
              로그인
            </a>
          </div>
        </div>
      </div>
      <div id="slide_wrapper">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect={"coverflow"}
          navigation
          pagination={{ clickable: false }}
          slidesPerView={"auto"}
          centeredSlides={true}
          autoHeight={true}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 30,
            modifier: 1,
            slideShadows: true,
          }}
        >
          <SwiperSlide className="slide">
            <img
              className="slide_img"
              src="resource/img/test.png"
            ></img>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img
              className="slide_img"
              src="resource/img/test.png"
            ></img>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img
              className="slide_img"
              src="resource/img/test.png"
            ></img>
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img
              className="slide_img"
              src="resource/img/slide_example.png"
            ></img>
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainPage;
