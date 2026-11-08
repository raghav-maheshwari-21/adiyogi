import { m } from "framer-motion";
import { ArrowRight, Award, CalendarDays, CircleCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { initials, trackEvent, whatsappLink } from "../../lib/utils";
import Stars from "../common/Stars";

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
});

export default function HeroSection() {
    const { hero, instructor, googleRating, stats } = siteConfig;
    const { openLeadModal } = useLeadModal();
    const students = stats?.[0];
    const avatars = (siteConfig.testimonials || []).slice(0, 4).map((t) => initials(t.name).charAt(0));

    return (
        <section id="home" className="bg-grain relative overflow-hidden pt-32 pb-20 md:pt-40 lg:pt-44 lg:pb-28">
            <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                {/* Copy */}
                <div className="max-w-2xl">
                    <m.div {...fadeUp(0.05)}>
                        {googleRating?.enabled ? (
                            <a
                                href={googleRating.reviewsUrl || "#reviews"}
                                target={googleRating.reviewsUrl ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full bg-white/80 py-1.5 pr-4 pl-2 text-sm font-semibold text-brand-900 shadow-soft ring-1 ring-brand-900/5"
                            >
                                <span className="rounded-full bg-brand-800 px-2.5 py-1 text-xs text-cream">{googleRating.value}</span>
                                <Stars size={14} />
                                <span className="text-muted">{googleRating.count} Google reviews</span>
                            </a>
                        ) : (
                            <span className="eyebrow">{hero.eyebrow}</span>
                        )}
                    </m.div>

                    <m.h1
                        {...fadeUp(0.15)}
                        className="mt-6 text-[2.75rem] leading-[1.02] font-semibold sm:text-6xl lg:text-[4.6rem]"
                    >
                        {hero.titleLines.map((line) => (
                            <span key={line} className="block">{line}</span>
                        ))}
                        <span className="block text-accent-dark italic">{hero.titleHighlight}</span>
                    </m.h1>

                    <m.p {...fadeUp(0.25)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                        {hero.subtitle}
                    </m.p>

                    <m.div {...fadeUp(0.35)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <button type="button" onClick={() => openLeadModal({ source: "hero" })} className="btn-accent px-8 py-4 text-base">
                            {hero.primaryCta} <ArrowRight size={18} aria-hidden="true" />
                        </button>
                        <a
                            href={whatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "hero" })}
                            className="btn-outline px-7 py-4 text-base"
                        >
                            <FaWhatsapp size={20} className="text-[#1faa53]" aria-hidden="true" /> {hero.secondaryCta}
                        </a>
                    </m.div>

                    <m.ul {...fadeUp(0.45)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                        {hero.highlights.map((h) => (
                            <li key={h} className="flex items-center gap-2 text-[0.95rem] font-medium text-brand-900">
                                <CircleCheck size={18} className="text-brand-600" aria-hidden="true" /> {h}
                            </li>
                        ))}
                    </m.ul>

                    {students && avatars.length > 0 && (
                        <m.div {...fadeUp(0.55)} className="mt-10 flex items-center gap-4 border-t border-brand-900/10 pt-8">
                            <div className="flex -space-x-3" aria-hidden="true">
                                {avatars.map((l, i) => (
                                    <span
                                        key={`${l}-${i}`}
                                        className="flex size-11 items-center justify-center rounded-full font-display text-lg font-semibold text-white ring-[3px] ring-cream"
                                        style={{ background: ["#6E7F4C", "#C4815F", "#3A4628", "#AFC096"][i] }}
                                    >
                                        {l}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm leading-snug text-muted">
                                <span className="block font-display text-2xl font-semibold text-brand-900">
                                    {students.value}
                                    {students.suffix} {students.label.toLowerCase()}
                                </span>
                                have started their journey with us
                            </p>
                        </m.div>
                    )}
                </div>

                {/* Visual */}
                <m.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease }}
                    className="relative mx-auto w-full max-w-md lg:max-w-none"
                >
                    <div className="absolute -inset-4 -z-10 rounded-t-[50%_38%] rounded-b-[48px] border border-brand-300/60 sm:-inset-6" aria-hidden="true" />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-t-[50%_38%] rounded-b-[40px] bg-brand-100 shadow-lift">
                        <img
                            src={hero.image}
                            alt={hero.imageAlt}
                            width="1000"
                            height="1250"
                            fetchPriority="high"
                            decoding="async"
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-900/40 to-transparent" />
                    </div>

                    {/* Floating cards */}
                    <div className="absolute top-[18%] -left-3 animate-float sm:-left-10">
                        <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift ring-1 ring-brand-900/5">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
                                <CalendarDays size={20} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-xs font-medium text-muted">{hero.nextBatchLabel}</p>
                                <p className="text-sm font-bold text-brand-900">{hero.nextBatchValue}</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -right-2 bottom-[12%] animate-float [animation-delay:-3s] sm:-right-8">
                        <div className="flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift ring-1 ring-brand-900/5">
                            <img
                                src={instructor.image}
                                alt=""
                                width="44"
                                height="44"
                                loading="lazy"
                                decoding="async"
                                className="size-11 rounded-xl object-cover"
                            />
                            <div>
                                <p className="flex items-center gap-1 text-sm font-bold text-brand-900">
                                    {instructor.name.split(" ")[0]} <Award size={14} className="text-accent" aria-hidden="true" />
                                </p>
                                <p className="text-xs font-medium text-muted">Certified · {instructor.experience.replace(" Experience", "")}</p>
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
