import { ArrowRight, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { telLink, trackEvent, whatsappLink } from "../../lib/utils";
import Reveal from "../common/Reveal";

export default function CTASection() {
    const { cta } = siteConfig;
    const { openLeadModal } = useLeadModal();

    return (
        <section className="pb-20 md:pb-28">
            <div className="container-x">
                <Reveal className="relative isolate overflow-hidden rounded-[36px] bg-brand-900 px-6 py-16 text-center sm:px-12 md:py-24">
                    {cta.image && (
                        <img src={cta.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-10 size-full object-cover opacity-35" />
                    )}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900/95 via-brand-900/75 to-brand-800/60" aria-hidden="true" />

                    <span className="eyebrow text-accent-soft before:bg-accent-soft">First Class Free</span>
                    <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.08] font-semibold text-cream sm:text-5xl lg:text-6xl">{cta.title}</h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/75">{cta.subtitle}</p>

                    <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                        <button type="button" onClick={() => openLeadModal({ source: "final_cta" })} className="btn-accent px-8 py-4 text-base">
                            {siteConfig.hero.primaryCta} <ArrowRight size={18} aria-hidden="true" />
                        </button>
                        <a
                            href={whatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "final_cta" })}
                            className="btn-light px-7 py-4 text-base"
                        >
                            <FaWhatsapp size={20} className="text-[#1faa53]" aria-hidden="true" /> WhatsApp
                        </a>
                        <a
                            href={telLink()}
                            onClick={() => trackEvent("contact_click", { method: "phone", source: "final_cta" })}
                            className="btn-ghost-light px-7 py-4 text-base"
                        >
                            <Phone size={18} aria-hidden="true" /> Call Now
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
