import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function Gallery() {
    const images = siteConfig.gallery;

    const [selectedIndex, setSelectedIndex] = useState(null);

    const closeLightbox = () => {
        setSelectedIndex(null);
    };

    const nextImage = () => {
        setSelectedIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;

            if (e.key === "Escape") {
                closeLightbox();
            }

            if (e.key === "ArrowRight") {
                nextImage();
            }

            if (e.key === "ArrowLeft") {
                prevImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [selectedIndex]);

    return (
        <>
            <section className="section-padding">
                <div className="container-custom">

                    <div className="text-center mb-14">

                        <span className="text-green-700 font-semibold">
                            Gallery
                        </span>

                        <h2 className="text-4xl font-bold mt-3">
                            Glimpses of Our Yoga Journey
                        </h2>

                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Explore moments of transformation,
                            mindfulness, and community.
                        </p>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {images.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -8,
                                }}
                                className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
                                onClick={() =>
                                    setSelectedIndex(index)
                                }
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="font-semibold text-xl">
                                        {item.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}

                    </div>

                </div>
            </section>

            {/* Lightbox */}

            <AnimatePresence>

                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-6"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white"
                        >
                            <X size={36} />
                        </button>

                        <button
                            onClick={prevImage}
                            className="absolute left-4 md:left-8 text-white"
                        >
                            <ChevronLeft size={44} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-4 md:right-8 text-white"
                        >
                            <ChevronRight size={44} />
                        </button>

                        <motion.div
                            key={selectedIndex}
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                            }}
                            className="max-w-5xl w-full text-center"
                        >
                            <img
                                src={
                                    images[selectedIndex].image
                                }
                                alt={
                                    images[selectedIndex].title
                                }
                                className="max-h-[75vh] w-full object-contain rounded-3xl"
                            />

                            <h3 className="text-white text-2xl font-semibold mt-6">
                                {
                                    images[selectedIndex]
                                        .title
                                }
                            </h3>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </>
    );
}