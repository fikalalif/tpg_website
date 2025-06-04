import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../styles/global.css';

const items = [
    { img: "/eleventh-carousel.png", alt: "Logo 1", instagramUrl: "https://www.instagram.com/11throastery/", category: "ROASTERY" },
    { img: "/peraduan-carousel.png", alt: "Logo 2", instagramUrl: "https://www.instagram.com/tempatperaduan/", category: "COFFEE SHOP" },
    { img: "/njajan-carousel.png", alt: "Logo 3", instagramUrl: "https://www.instagram.com/njajan.co/", category: "F&B" },
    { img: "/socialdilema-carousel.png", alt: "Logo 4", instagramUrl: "https://www.instagram.com/scldilemma/", category: "CREATIVE" },
    { img: "/l2katering-carousel.png", alt: "Logo 5", instagramUrl: "https://www.instagram.com/l2katering/", category: "CATERING" },
    { img: "/belumtidur-carousel.png", alt: "Logo 6", instagramUrl: "https://www.instagram.com/belumtidurcreative/", category: "CREATIVE" }
];

const categories = ["ALL", "F&B", "COFFEE SHOP", "ROASTERY", "CATERING", "FASHION", "CREATIVE", "OTHER"];

export default function SwiperCarousel() {
    const [slidesPerView, setSlidesPerView] = React.useState(3);
    const [selectedCategory, setSelectedCategory] = React.useState("ALL");

    React.useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
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

    return (
        
        <div className="bg-gradient-to-b from-black via-black to-white text-white px-1 py-10 " id="brands">
            <div
					class="flex justify-between items-center m-6 gap-3
               sm:flex-row sm:m-11 sm:gap-0 sm:text-left"
				>
					<h2
						class="text-2xl font-bold order-1
                   sm:text-3xl sm:order-none"
					>
						Our Brands
					</h2>
					<img
						src="tpg-divbot2.png"
						alt="Center Icon"
						class="h-8 order-2 
                   sm:h-10 sm:order-none"
					/>
					
				</div>

            <div className="carousel-container">
            {/* Kategori Navbar */}
            <div className="w-full bg-gray-900 text-white p-4 text-base sm:text-xl md:text-2xl flex flex-wrap justify-center sm:justify-around gap-2 sm:gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`py-1 px-2 transition duration-300 hover:text-gray-400 ${
                            selectedCategory === cat ? 'border-b-2 border-white text-white' : 'text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
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
                >
                    {items
                        .filter(item => selectedCategory === "ALL" || item.category === selectedCategory)
                        .map((item, idx) => (
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
                                    <img
                                        src={item.img}
                                        alt={item.alt}
                                        style={{ width: '100%', display: 'block' }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>

        </div>

        
    );
}
