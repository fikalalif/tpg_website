import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../styles/global.css';
// Import CSS untuk Swiper kustom (jika Anda akan menambahkan lebih banyak gaya)

const items = [
    { img: "/eleventh-carousel.png", alt: "Logo 1", instagramUrl: "https://www.instagram.com/11throastery/" },
    { img: "/peraduan-carousel.png", alt: "Logo 2", instagramUrl: "https://www.instagram.com/tempatperaduan/" },
    { img: "/njajan-carousel.png", alt: "Logo 3", instagramUrl: "https://www.instagram.com/njajan.co/" },
    { img: "/socialdilema-carousel.png", alt: "Logo 4", instagramUrl: "https://www.instagram.com/scldilemma/" },
    { img: "/l2katering-carousel.png", alt: "Logo 5", instagramUrl: "https://www.instagram.com/l2katering/" },
    { img: "/belumtidur-carousel.png", alt: "Logo 6", instagramUrl: "https://www.instagram.com/belumtidurcreative/" }
];

export default function SwiperCarousel() {
    // Gunakan useState dan useEffect untuk memastikan window.innerWidth diakses setelah komponen ter-mount
    const [slidesPerView, setSlidesPerView] = React.useState(5);

    React.useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(window.innerWidth < 768 ? 1 : 3);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial value

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleImageClick = (url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="carousel-container" style={{ padding: '2rem 0' }}>
            <Swiper
                modules={[Navigation, EffectCoverflow]}
                navigation
                loop={true}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={slidesPerView} // Menggunakan state yang responsif
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
                            className="swiper-slide-content" // Tambahkan kelas untuk styling hover
                            class=" transition duration-500 hover:scale-125 py-16 pt-20"
                            style={{
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                cursor: item.instagramUrl ? 'pointer' : 'default', // Ubah kursor jika ada URL
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Transisi untuk hover
                            
                            }}
                            onClick={() => handleImageClick(item.instagramUrl)}
                        >
                            <img
                                src={item.img}
                                alt={item.alt}
                                style={{ width: '100%', display: 'block' }} // display block untuk menghindari celah di bawah gambar
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}