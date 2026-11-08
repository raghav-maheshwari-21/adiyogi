import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { mapsEmbed, mapsLink, telLink, trackEvent, whatsappLink } from "../../lib/utils";
import LeadForm from "../common/LeadForm";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function ContactSection() {
    const lc = siteConfig.leadCapture;

    const items = [
        {
            icon: Phone,
            label: "Call us",
            value: siteConfig.phoneDisplay || siteConfig.phone,
            href: telLink(),
            track: "phone",
        },
        {
            icon: FaWhatsapp,
            label: "WhatsApp",
            value: "Chat instantly",
            href: whatsappLink(),
            external: true,
            track: "whatsapp",
        },
        { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, track: "email" },
        { icon: MapPin, label: "Studio", value: siteConfig.address, href: mapsLink(), external: true, track: "directions" },
    ];

    return (
        <section id="contact" className="section bg-sand/70">
            <div className="container-x">
                <SectionHeading
                    eyebrow="Contact"
                    title="Start Your Wellness Journey"
                    subtitle="Book your free trial or reach out with any question — we'd love to hear from you."
                />

                <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <Reveal className="card p-6 sm:p-10">
                        <h3 className="text-3xl font-semibold">{lc.formTitle}</h3>
                        <p className="mt-2 mb-8 text-muted">{lc.formSubtitle}</p>
                        <LeadForm source="contact_section" />
                    </Reveal>

                    <Reveal delay={0.1} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            {items.map(({ icon: Icon, label, value, href, external, track }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noopener noreferrer" : undefined}
                                    onClick={() => trackEvent("contact_click", { method: track, source: "contact_section" })}
                                    className="card card-hover flex flex-col gap-3 p-5"
                                >
                                    <span className="icon-chip size-11">
                                        <Icon size={19} aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block text-xs font-semibold tracking-wide text-muted uppercase">{label}</span>
                                        <span className="mt-0.5 block text-[0.95rem] font-semibold break-words text-brand-900">{value}</span>
                                    </span>
                                </a>
                            ))}
                        </div>

                        <div className="card flex items-start gap-4 p-5">
                            <span className="icon-chip size-11">
                                <Clock size={19} aria-hidden="true" />
                            </span>
                            <div>
                                <p className="text-xs font-semibold tracking-wide text-muted uppercase">Studio timings</p>
                                {siteConfig.timings.map((t) => (
                                    <p key={t} className="mt-1 font-semibold text-brand-900">{t}</p>
                                ))}
                            </div>
                        </div>

                        <div className="card relative min-h-[260px] flex-1 overflow-hidden">
                            <iframe
                                title={`${siteConfig.businessName} location map`}
                                src={mapsEmbed()}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 size-full border-0 grayscale-[30%]"
                                allowFullScreen
                            />
                            <a
                                href={mapsLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary absolute right-4 bottom-4 px-4 py-2.5 text-sm"
                            >
                                <Navigation size={15} aria-hidden="true" /> Get Directions
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
