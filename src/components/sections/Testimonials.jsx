import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function Testimonials() {
    const testimonials = siteConfig.testimonials;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="reviews"
            className="section-padding bg-green-50 overflow-hidden"
        >
            <div className="container-custom">

                {/* Heading */}

                <div className="text-center mb-14">

                    <span className="text-green-700 font-semibold">
                        Testimonials
                    </span>

                    <h2 className="text-4xl font-bold mt-3">
                        What Our Students Say
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Real stories from people who transformed their lives through yoga.
                    </p>

                </div>

                {/* Slider */}

                <div className="relative max-w-4xl mx-auto">

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4 }}
                            className="glass-card rounded-[32px] p-10 text-center"
                        >
                            {/* Avatar */}

                            <img
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                            />

                            {/* Stars */}

                            <div className="flex justify-center gap-1 mt-6">

                                {[...Array(testimonials[currentIndex].rating)].map(
                                    (_, index) => (
                                        <Star
                                            key={index}
                                            size={20}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    )
                                )}

                            </div>

                            {/* Review */}

                            <p className="text-lg text-gray-700 mt-6 italic leading-relaxed">
                                "{testimonials[currentIndex].review}"
                            </p>

                            {/* Name */}

                            <h4 className="mt-8 text-2xl font-semibold">
                                {testimonials[currentIndex].name}
                            </h4>

                        </motion.div>

                    </AnimatePresence>

                    {/* Controls */}

                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-16 bg-white shadow-lg p-3 rounded-full hover:scale-105 transition"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-16 bg-white shadow-lg p-3 rounded-full hover:scale-105 transition"
                    >
                        <ChevronRight />
                    </button>

                </div>

                {/* Dots */}

                <div className="flex justify-center gap-3 mt-10">

                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition ${
                                currentIndex === index
                                    ? "bg-green-700"
                                    : "bg-green-200"
                            }`}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
}