import { ArrowRight, Clock, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { trackEvent, whatsappLink } from "../../lib/utils";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function ClassesSection() {
    const { openLeadModal } = useLeadModal();

    return (
        <section id="classes" className="section bg-sand/70">
            <div className="container-x">
                <SectionHeading
                    eyebrow="Our Classes"
                    title="Find Your Perfect Practice"
                    subtitle="Programs for every body, age and goal — each one guided personally by a certified instructor."
                />

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {siteConfig.classes.map((item, i) => (
                        <Reveal key={item.title} delay={(i % 3) * 0.08} className="card card-hover group flex flex-col overflow-hidden">
                            <div className="relative aspect-[4/3] overflow-hidden bg-brand-100">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        width="800"
                                        height="600"
                                        loading="lazy"
                                        decoding="async"
                                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                )}
                                {item.level && (
                                    <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold text-brand-900 shadow-sm">
                                        {item.level}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col p-6 sm:p-7">
                                <h3 className="text-[1.75rem] font-semibold">{item.title}</h3>
                                <p className="mt-2 flex-1 leading-relaxed text-muted">{item.description}</p>

                                {(item.duration || item.mode) && (
                                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-brand-700">
                                        {item.duration && (
                                            <span className="flex items-center gap-1.5"><Clock size={15} aria-hidden="true" /> {item.duration}</span>
                                        )}
                                        {item.mode && (
                                            <span className="flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" /> {item.mode}</span>
                                        )}
                                    </div>
                                )}

                                <div className="mt-6 flex items-center gap-3 border-t border-brand-900/[0.07] pt-5">
                                    <button
                                        type="button"
                                        onClick={() => openLeadModal({ source: "class_card", interest: item.title })}
                                        className="group/btn flex flex-1 items-center gap-2 font-semibold text-brand-900 hover:text-accent-dark"
                                    >
                                        Book free trial
                                        <ArrowRight size={17} className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
                                    </button>
                                    <a
                                        href={whatsappLink(`Namaste 🙏 I'm interested in ${item.title} classes. Could you share the details?`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "class_card", interest: item.title })}
                                        aria-label={`Ask about ${item.title} on WhatsApp`}
                                        className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-[#1faa53] ring-1 ring-brand-100 transition-colors hover:bg-[#25D366] hover:text-white"
                                    >
                                        <FaWhatsapp size={19} aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
