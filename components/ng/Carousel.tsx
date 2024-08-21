import React, { useEffect, useState } from "react";
import { Series } from "@/interfaces/Series";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Badge } from "@/components/ui/badge";

interface CarouselProps {
    slides: Series[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ slides, autoSlide = false, autoSlideInterval = 5000 }) => {
    const [curr, setCurr] = useState(0);

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'ArrowRight') next();
            else if (event.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prev, next]);

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [autoSlide, autoSlideInterval, next]);

    return (
        <div className="w-full md:w-5/6 xl:w-4/5 h-[240px] md:h-[400px] xl:h-[520px] md:rounded-lg shadow-lg mx-auto relative overflow-hidden">
            <div className="absolute w-full h-full flex transition-transform ease-out duration-[600ms]" style={{ transform: `translateX(-${curr * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0 bg-black" onClick={() => location.href=`/watch/${slide.id}`}>
                        <img src={`images/series/horizontal/${slide.image}`} className="w-full h-full opacity-60" alt="..."/>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] flex flex-col items-center gap-4">
                            <h1 className="text-white text-md md:text-xl xl:text-2xl font-bold text-center">
                                {slide.title}
                            </h1>
                            <div className="w-[80%] md:flex items-center justify-center gap-3 hidden">
                                {slide.categories.slice(0, 5).map((category, index) => (
                                    <Badge className="cursor-pointer text-[12px]" variant={"secondary"} key={index}>{category.replace(' ', ' ')}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={prev} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full
                    transition-all duration-500 ease-out text-white hover:bg-white/10">
                <ChevronLeft size={40}/>
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full
                    transition-all duration-500 ease-out text-white hover:bg-white/10">
                <ChevronRight size={40} />
            </button>
            <div className="absolute w-[150px] bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <span key={i} onClick={() => setCurr(i)}
                              className={`cursor-pointer flex-1 transition-all duration-500 h-1 bg-white rounded-full 
                              ${curr === i ? "flex-[4]" : "bg-opacity-50"}`}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

// export const Carousel: React.FC<CarouselProps> = ({ slides }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//
//     const prevSlide = () => {
//         setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
//     };
//
//     const nextSlide = () => {
//         setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
//     };
//
//     useEffect(() => {
//         const intervalId = setInterval(nextSlide, 6000);
//         return () => clearInterval(intervalId);
//     }, [slides.length]);
//
//     return (
//         <div className="carousel-container w-full flex items-center justify-center">
//             <div className="carousel-wrapper relative w-4/5 h-[520px] bg-grey-500 shadow-lg rounded-lg">
//                 <div className="w-full h-full relative rounded-lg overflow-hidden">
//                     <div className="carousel-slides flex transition-transform duration-500 ease-in-out rounded-lg" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
//                         {slides.map((slide, index) => (
//                             <div key={index} className="carousel-slide relative w-full h-full cursor-pointer" onClick={() => location.href = `/watch/${slide.id}`}>
//                                 <img src={`/images/series/horizontal/${slide.image}`} alt="..." className="absolute w-full h-full" />
//                                 <h1 className="absolute max-w-[80%] text-center text-6xl font-bold text-outline" data-text={slide.title}>{slide.title}</h1>
//                                 <div className="absolute max-w-[80%] flex items-center justify-center gap-3 top-[30px]">
//                                     {
//                                         slide.categories.slice(0, 5).map((category, index) => (
//                                             <Badge key={index}>{category}</Badge>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button className="btn-carousel preview" onClick={prevSlide}>
//                     <i className="fas fa-chevron-left"></i>
//                 </button>
//                 <button className="btn-carousel next" onClick={nextSlide}>
//                     <i className="fas fa-chevron-right"></i>
//                 </button>
//             </div>
//         </div>
//     );
// };