import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../styles/global.css';

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
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 7 ? 1 : 3);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const currentCategory = items[activeIndex]?.category || "F&B";
  const label = categoryLabelMap[currentCategory] || currentCategory;

  return (
    <div className="bg-gradient-to-t from-black  via-neutral-700 to-white text-black px-1 py-4" id="client">
      {/* Header */}
      <div className="flex justify-between items-center m-6 gap-3 sm:flex-row sm:m-11 sm:gap-0 sm:text-left">
        <h2 className="text-2xl font-bold order-1 sm:text-3xl sm:order-none">Our Client</h2>
        <img src="tpg-divbot-black.png" alt="Center Icon" className="h-8 order-2 sm:h-10 sm:order-none" />
      </div>

      {/* Kategori dinamis di atas carousel */}
      <div className="flex justify-center mt-6 pt-2">
        <div className="px-4 py-3 bg-black text-white text-xs sm:text-sm font-bold rounded-full shadow-md">
          {label}
        </div>
      </div>

      {/* Carousel */}
      <div style={{ padding: '2rem 0' }}>
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          navigation
          loop={true}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={slidesPerView}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          className="mySwiper"
          onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex; // supaya looping tetap benar
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
    </div>
  );
}
