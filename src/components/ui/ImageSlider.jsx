import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function ImageSlider({ images = [], name }) {
    const hasMultipleImages = images.length > 1;

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={hasMultipleImages}
            pagination={
                hasMultipleImages
                    ? { clickable: true }
                    : false
            }
            autoplay={
                hasMultipleImages
                    ? {
                        delay: 3000,
                        disableOnInteraction: false,
                    }
                    : false
            }
            slidesPerView={1}
        >
            {images.map((image) => (
                <SwiperSlide key={image.url}>
                    <img
                        src={image.url}
                        alt={name}
                        className="w-full h-70 object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}