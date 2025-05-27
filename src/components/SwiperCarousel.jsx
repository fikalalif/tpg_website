import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const items = [
  { img: "/eleventh-carousel.png", alt: "Logo 1" },
  { img: "/peraduan-carousel.png", alt: "Logo 2" },
  { img: "/njajan-carousel.png", alt: "Logo 3" }
];

export default function SwiperCarousel() {
  return (
    <div className="carousel-container" style={{ padding: '2rem 0' }}>
      <Swiper
        modules={[Navigation, EffectCoverflow]}
        navigation
        loop={true}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={window.innerWidth < 768 ? 1 : 3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        className="mySwiper"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              <img src={item.img} alt={item.alt} style={{ width: '100%' }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
