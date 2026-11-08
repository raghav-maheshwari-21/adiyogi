import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { useLockBodyScroll } from "../../hooks/useScroll";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

// Bento pattern — repeats every 8 images; grid-flow-dense fills any gaps.
const spanFor = (i) => {
    const n = i % 8;
    if (n === 0) return "col-span-2 row-span-2";
    if (n === 5) return "col-span-2";
    return "";
};

export default function Gallery() {
    const images = siteConfig.gallery || [];
    const [index, setIndex] = useState(null);
    const touchX = useRef(null);
    const open = index !== null;
    useLockBodyScroll(open);

    const close = useCallback(() => setIndex(null), []);
    const go = useCallback(
        (dir) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
        [images.length]
    );

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, close, go]);

    if (!images.length) return null;

    return (
        <section id="gallery" className="section bg-sand/70">
            <div className="container-x">
                <SectionHeading
                    eyebrow="Gallery"
                    title="Moments From Our Mat"
                    subtitle="A glimpse into the calm, focused and joyful space our students practice in."
                />

                <div className="mt-14 grid auto-rows-[160px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4">
                    {images.map((img, i) => (
                        <Reveal key={`${img.image}-${i}`} delay={(i % 4) * 0.05} className={clsx("relative", spanFor(i))}>
                            <button
                                type="button"
                                onClick={() => setIndex(i)}
                                aria-label={`Open image: ${img.title}`}
                                className="group relative block size-full overflow-hidden rounded-3xl bg-brand-100"
                            >
                                <img
                                    src={img.image}
                                    alt={img.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <span className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                                <span className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-left text-cream">
                                    <span className="font-display text-base leading-tight font-semibold sm:text-xl">{img.title}</span>
                                    <Expand size={18} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                                </span>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <m.div
                        key="lightbox"
                        role="dialog"
                        aria-modal="true"
                        aria-label={images[index].title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-900/95 px-4"
                        onClick={close}
                        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                        onTouchEnd={(e) => {
                            if (touchX.current === null) return;
                            const dx = e.changedTouches[0].clientX - touchX.current;
                            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                            touchX.current = null;
                        }}
                    >
                        <button type="button" onClick={close} aria-label="Close" className="absolute top-5 right-5 z-10 flex size-11 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20">
                            <X size={24} />
                        </button>
                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); go(-1); }}
                                    aria-label="Previous image"
                                    className="absolute left-3 z-10 hidden size-12 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:flex md:left-8"
                                >
                                    <ChevronLeft size={26} />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); go(1); }}
                                    aria-label="Next image"
                                    className="absolute right-3 z-10 hidden size-12 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:flex md:right-8"
                                >
                                    <ChevronRight size={26} />
                                </button>
                            </>
                        )}

                        <AnimatePresence mode="wait" initial={false}>
                            <m.figure
                                key={index}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.25 }}
                                className="max-w-5xl text-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={images[index].image.replace(/w=\d+/, "w=1600")}
                                    alt={images[index].title}
                                    className="max-h-[78dvh] w-auto rounded-2xl object-contain"
                                />
                                <figcaption className="mt-4 font-display text-2xl text-cream">
                                    {images[index].title}
                                    <span className="ml-3 font-sans text-sm text-cream/50">
                                        {index + 1} / {images.length}
                                    </span>
                                </figcaption>
                            </m.figure>
                        </AnimatePresence>
                    </m.div>
                )}
            </AnimatePresence>
        </section>
    );
}
