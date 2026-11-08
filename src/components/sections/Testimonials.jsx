import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { initials } from "../../lib/utils";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import Stars from "../common/Stars";

const avatarColors = ["#6E7F4C", "#C4815F", "#3A4628", "#8C9E6B", "#A1613F"];

/** Native scroll-snap carousel: buttery on touch devices, zero JS animation. */
export default function Testimonials() {
    const list = siteConfig.testimonials || [];
    const rating = siteConfig.googleRating;
    const track = useRef(null);
    if (!list.length) return null;

    const scroll = (dir) => {
        const el = track.current;
        if (!el) return;
        const card = el.querySelector("li");
        el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : el.clientWidth), behavior: "smooth" });
    };

    return (
        <section id="reviews" className="section overflow-hidden">
            <div className="container-x">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <SectionHeading
                        align="left"
                        eyebrow="Testimonials"
                        title="Real Stories From Our Students"
                        subtitle="People of every age and fitness level have found strength and calm with us."
                    />
                    <div className="flex items-center gap-4">
                        {rating?.enabled && (
                            <a
                                href={rating.reviewsUrl || undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mr-2 rounded-2xl bg-white px-5 py-3 shadow-soft ring-1 ring-brand-900/5"
                            >
                                <p className="flex items-center gap-2 font-display text-3xl font-semibold text-brand-900">
                                    {rating.value} <Stars size={15} />
                                </p>
                                <p className="text-xs font-medium text-muted">{rating.count} reviews on Google</p>
                            </a>
                        )}
                        {list.length > 1 && (
                            <div className={`flex gap-2 ${list.length <= 3 ? "lg:hidden" : ""} ${list.length <= 2 ? "sm:hidden" : ""}`}>
                                {[-1, 1].map((dir) => (
                                    <button
                                        key={dir}
                                        type="button"
                                        onClick={() => scroll(dir)}
                                        aria-label={dir < 0 ? "Previous review" : "Next review"}
                                        className="flex size-12 items-center justify-center rounded-full bg-white text-brand-900 shadow-soft ring-1 ring-brand-900/10 transition-colors hover:bg-brand-800 hover:text-cream"
                                    >
                                        {dir < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Reveal>
                    <ul
                        ref={track}
                        className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pt-2 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
                    >
                        {list.map((t, i) => (
                            <li
                                key={t.name}
                                className="card flex w-[86%] shrink-0 snap-start flex-col p-8 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                            >
                                <div className="flex items-center justify-between">
                                    <Stars count={t.rating || 5} />
                                    <Quote size={32} className="text-brand-100" aria-hidden="true" />
                                </div>
                                <p className="mt-5 flex-1 font-display text-[1.45rem] leading-snug text-brand-900">“{t.review}”</p>
                                <div className="mt-7 flex items-center gap-3 border-t border-brand-900/[0.07] pt-5">
                                    {t.image ? (
                                        <img src={t.image} alt="" width="48" height="48" loading="lazy" decoding="async" className="size-12 rounded-full object-cover" />
                                    ) : (
                                        <span
                                            className="flex size-12 items-center justify-center rounded-full font-semibold text-white"
                                            style={{ background: avatarColors[i % avatarColors.length] }}
                                            aria-hidden="true"
                                        >
                                            {initials(t.name)}
                                        </span>
                                    )}
                                    <div>
                                        <p className="font-semibold text-brand-900">{t.name}</p>
                                        {t.detail && <p className="text-sm text-muted">{t.detail}</p>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
