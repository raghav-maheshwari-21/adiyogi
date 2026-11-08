import { ArrowRight, BadgeCheck, Quote } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { trackEvent, whatsappLink } from "../../lib/utils";
import Reveal from "../common/Reveal";

export default function InstructorSection() {
    const ins = siteConfig.instructor;
    const { openLeadModal } = useLeadModal();
    const firstName = ins.name.split(" ")[0];

    return (
        <section id="about" className="section overflow-hidden">
            <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
                    <div className="absolute -top-5 -left-5 size-full rounded-[36px] bg-accent-soft" aria-hidden="true" />
                    <div className="relative aspect-[5/4] overflow-hidden rounded-[36px] bg-brand-100 shadow-lift sm:aspect-[4/3.4]">
                        <img
                            src={ins.image}
                            alt={`${ins.name}, ${ins.role}`}
                            width="612"
                            height="408"
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover object-[50%_30%]"
                        />
                    </div>
                    <div className="absolute -right-3 -bottom-6 rounded-3xl bg-brand-900 px-6 py-5 text-cream shadow-lift sm:-right-6">
                        <p className="font-display text-4xl leading-none font-semibold">{ins.experience.split(" ")[0]}</p>
                        <p className="mt-1 text-sm text-cream/75">Years of teaching</p>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <span className="eyebrow">Meet Your Instructor</span>
                    <h2 className="heading-xl mt-4">{ins.name}</h2>
                    {ins.role && <p className="mt-2 font-semibold text-accent-dark">{ins.role}</p>}
                    <p className="mt-6 text-lg leading-relaxed text-muted">{ins.description}</p>

                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                        {ins.qualifications.map((q) => (
                            <li key={q} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 font-medium text-brand-900 shadow-soft ring-1 ring-brand-900/5">
                                <BadgeCheck size={20} className="shrink-0 text-brand-600" aria-hidden="true" /> {q}
                            </li>
                        ))}
                    </ul>

                    {ins.quote && (
                        <blockquote className="relative mt-8 border-l-2 border-accent pl-6">
                            <Quote size={22} className="absolute -top-1 -left-3 bg-cream text-accent" aria-hidden="true" />
                            <p className="font-display text-2xl leading-snug text-brand-800 italic">“{ins.quote}”</p>
                        </blockquote>
                    )}

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <button type="button" onClick={() => openLeadModal({ source: "instructor" })} className="btn-primary">
                            Book a Class with {firstName} <ArrowRight size={18} aria-hidden="true" />
                        </button>
                        <a
                            href={whatsappLink(`Namaste ${firstName} 🙏 I'd like to talk to you about joining yoga classes.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "instructor" })}
                            className="btn-outline"
                        >
                            <FaWhatsapp size={19} className="text-[#1faa53]" aria-hidden="true" /> Talk to {firstName}
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
