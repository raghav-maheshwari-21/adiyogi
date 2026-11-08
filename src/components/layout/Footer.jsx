import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { mapsLink, telLink, whatsappLink } from "../../lib/utils";
import Logo from "../common/Logo";

const socials = [
    { key: "instagram", icon: FaInstagram, label: "Instagram" },
    { key: "facebook", icon: FaFacebookF, label: "Facebook" },
    { key: "youtube", icon: FaYoutube, label: "YouTube" },
];

const quickLinks = [
    ["Classes", "#classes"],
    ["About", "#about"],
    ["Schedule & Plans", "#schedule"],
    ["Reviews", "#reviews"],
    ["Gallery", "#gallery"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-brand-900 text-cream/75">
            <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
                <div>
                    <Logo light />
                    <p className="mt-5 max-w-xs leading-relaxed">{siteConfig.footerAbout}</p>
                    <div className="mt-6 flex gap-3">
                        {socials.map(({ key, icon: Icon, label }) =>
                            siteConfig.socialLinks?.[key] ? (
                                <a
                                    key={key}
                                    href={siteConfig.socialLinks[key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex size-10 items-center justify-center rounded-full bg-cream/[0.08] text-cream ring-1 ring-cream/10 transition-colors hover:bg-accent"
                                >
                                    <Icon size={16} aria-hidden="true" />
                                </a>
                            ) : null
                        )}
                        <a
                            href={whatsappLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="flex size-10 items-center justify-center rounded-full bg-cream/[0.08] text-cream ring-1 ring-cream/10 transition-colors hover:bg-[#25D366]"
                        >
                            <FaWhatsapp size={17} aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-cream uppercase">Explore</h3>
                    <ul className="mt-5 space-y-3">
                        {quickLinks.map(([label, href]) => (
                            <li key={href}>
                                <a href={href} className="transition-colors hover:text-cream">{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-cream uppercase">Classes</h3>
                    <ul className="mt-5 space-y-3">
                        {siteConfig.classes.map((c) => (
                            <li key={c.title}>
                                <a href="#classes" className="transition-colors hover:text-cream">{c.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-sans text-sm font-bold tracking-[0.18em] text-cream uppercase">Visit & Contact</h3>
                    <ul className="mt-5 space-y-4">
                        <li>
                            <a href={telLink()} className="flex gap-3 transition-colors hover:text-cream">
                                <Phone size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                {siteConfig.phoneDisplay || siteConfig.phone}
                            </a>
                        </li>
                        <li>
                            <a href={`mailto:${siteConfig.email}`} className="flex gap-3 break-all transition-colors hover:text-cream">
                                <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                {siteConfig.email}
                            </a>
                        </li>
                        <li>
                            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-cream">
                                <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                                {siteConfig.address}
                            </a>
                        </li>
                        <li className="flex gap-3">
                            <Clock size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                            <span>
                                {siteConfig.timings.map((t) => (
                                    <span key={t} className="block">{t}</span>
                                ))}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-cream/10">
                <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm text-cream/55 sm:flex-row">
                    <p>© {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.</p>
                    {siteConfig.designer?.name && (
                        <p>
                            Designed by{" "}
                            <a href={siteConfig.designer.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-soft hover:text-white">
                                {siteConfig.designer.name}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
}
