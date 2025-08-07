"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const items = [
  { img: "/Eleventh Hour.png", alt: "Logo 1", instagramUrl: "https://www.instagram.com/11throastery/", category: "ROASTERY" },
  { img: "/TP.png", alt: "Logo 2", instagramUrl: "https://www.instagram.com/tempatperaduan/", category: "COFFEE SHOP" },
  { img: "/Njajan.png", alt: "Logo 3", instagramUrl: "https://www.instagram.com/njajan.co/", category: "F&B" },
  { img: "/Social Dilemma.png", alt: "Logo 4", instagramUrl: "https://www.instagram.com/scldilemma/", category: "CREATIVE" },
  { img: "/Langsung Lahap.png", alt: "Logo 5", instagramUrl: "https://www.instagram.com/l2katering/", category: "CATERING" },
  { img: "/Jet- Li.png", alt: "Logo 6", instagramUrl: "https://www.instagram.com/taichanjetli/", category: "F&B" },
  { img: "/BOC.png", alt: "Logo 7", instagramUrl: "https://maps.app.goo.gl/aPAsxRJAZ3r5P9Av7", category: "COFFEE SHOP" },
  { img: "/Pribumie.png", alt: "Logo 8", instagramUrl: "https://www.instagram.com/njajan.co/", category: "F&B" },
  { img: "/Rakjat Sipil.png", alt: "Logo 9", instagramUrl: "https://maps.app.goo.gl/o7SxJGmtkPUBvjZX9", category: "COFFEE SHOP" },
  { img: "/Wartap.png", alt: "Logo 10", instagramUrl: "https://www.instagram.com/46wartap/", category: "F&B" },
  { img: "/Wrkoplo.png", alt: "Logo 11", instagramUrl: "https://www.instagram.com/wrkoplo/", category: "COFFEE SHOP" }
];

const categoryLabelMap = {
  "F&B": "KEDAI MAKANAN",
  "COFFEE SHOP": "KAFE",
  "ROASTERY": "ROASTERY",
  "CATERING": "KATERING",
  "FASHION": "FASHION",
  "CREATIVE": "KREATIF",
  "OTHER": "LAINNYA"
};

export default function SwiperCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const currentCategory = items[activeIndex]?.category || "F&B";
  const label = categoryLabelMap[currentCategory] || currentCategory;

  return (
    <div className="bg-gradient-to-b from-black via-neutral-900 to-white text-white px-1 pt-10" id="brands">
      {/* Header */}
      <div className="flex justify-between items-center m-6 gap-3 sm:flex-row sm:m-11 sm:gap-0 sm:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">Our Brands</h2>
        <img src="tpg-divbot.png" alt="Center Icon" className="h-9 md:h-16 lg:h-20 filter drop-shadow-2xl hover:scale-110 transition-all duration-500 animate-pulse" />
      </div>

      {/* Kategori dinamis */}
      <div className="flex justify-center mt-6 pt-2">
        <div className="px-4 py-3 bg-white text-black text-xs sm:text-sm font-bold rounded-full shadow-md">
          {label}
        </div>
      </div>

      {/* Carousel */}
      <div className="py-8">
        <Swiper
          modules={[Navigation, EffectCoverflow, Autoplay]}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            loop:true,
          }}
          effect="coverflow"
          grabCursor
          centeredSlides
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex;
            setActiveIndex(realIndex);
          }}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="transition duration-500 hover:scale-105 pt-10 pb-5 lg:hover:scale-110"
                style={{
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  cursor: item.instagramUrl ? 'pointer' : 'default',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                }}
                onClick={() => handleImageClick(item.instagramUrl)}
              >
                <img src={item.img} alt={item.alt} style={{ width: '100%', display: 'block' }} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper navigation style */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          transition: transform 0.3s ease;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.3);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 50px;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            top: 55%;
          }
        }
      `}</style>
    </div>
  );
}
