import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { useLockBodyScroll, useScrolledPast } from "../../hooks/useScroll";
import { storage, telLink, trackEvent, whatsappLink } from "../../lib/utils";
import Logo from "./Logo";

const navLinks = [
    { label: "Classes", href: "#classes" },
    { label: "About", href: "#about" },
    { label: "Schedule", href: "#schedule", show: siteConfig.schedule?.enabled },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
].filter((l) => l.show !== false);

function useActiveSection() {
    const [active, setActive] = useState("");
    useEffect(() => {
        const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);
    return active;
}

export default function Navbar() {
    const scrolled = useScrolledPast(24);
    const [menuOpen, setMenuOpen] = useState(false);
    const [barHidden, setBarHidden] = useState(() => !!storage.get("announce_closed", true));
    const { openLeadModal } = useLeadModal();
    const active = useActiveSection();
    const announce = siteConfig.announcement;
    const showBar = announce?.enabled && !barHidden && !scrolled && !menuOpen;
    useLockBodyScroll(menuOpen);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const close = () => mq.matches && setMenuOpen(false);
        mq.addEventListener("change", close);
        return () => mq.removeEventListener("change", close);
    }, []);

    const book = (source) => {
        setMenuOpen(false);
        openLeadModal({ source });
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Announcement bar — collapses smoothly on scroll */}
            {announce?.enabled && !barHidden && (
                <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: showBar ? "1fr" : "0fr" }}
                >
                    <div className="overflow-hidden">
                        <div className="relative bg-brand-900 px-10 py-2.5 text-center text-[13px] text-cream sm:text-sm">
                            <span>{announce.text}</span>{" "}
                            <button
                                type="button"
                                onClick={() => book("announcement")}
                                className="font-semibold text-accent-soft underline decoration-accent/60 underline-offset-4 hover:text-white"
                            >
                                {announce.ctaText} →
                            </button>
                            <button
                                type="button"
                                aria-label="Dismiss announcement"
                                onClick={() => {
                                    setBarHidden(true);
                                    storage.set("announce_closed", "1", true);
                                }}
                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-cream/70 hover:text-cream"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <nav
                aria-label="Main"
                className={clsx(
                    "transition-[background-color,box-shadow] duration-300",
                    scrolled || menuOpen
                        ? "bg-cream/90 shadow-[0_1px_0_rgb(38_46_27/0.08),0_8px_30px_-12px_rgb(38_46_27/0.18)] backdrop-blur-md"
                        : "bg-transparent"
                )}
            >
                <div className={clsx("container-x flex items-center justify-between transition-[height] duration-300", scrolled || menuOpen ? "h-16" : "h-20")}>
                    <Logo />

                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors",
                                    active === link.href ? "text-brand-900" : "text-muted hover:text-brand-900"
                                )}
                            >
                                {link.label}
                                <span
                                    className={clsx(
                                        "absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300",
                                        active === link.href ? "scale-x-100" : "scale-x-0"
                                    )}
                                />
                            </a>
                        ))}
                    </div>

                    <div className="hidden items-center gap-5 lg:flex">
                        <a
                            href={telLink()}
                            onClick={() => trackEvent("contact_click", { method: "phone", source: "navbar" })}
                            className="flex items-center gap-2 text-sm font-semibold text-brand-900 hover:text-accent-dark"
                        >
                            <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-100">
                                <Phone size={16} aria-hidden="true" />
                            </span>
                            {siteConfig.phoneDisplay || siteConfig.phone}
                        </a>
                        <button type="button" onClick={() => book("navbar")} className="btn-primary px-5 py-3">
                            {siteConfig.enquiryButtonText}
                        </button>
                    </div>

                    <button
                        type="button"
                        className="flex size-11 items-center justify-center rounded-full text-brand-900 lg:hidden"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        {menuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <m.div
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-brand-900/10 bg-cream lg:hidden"
                        >
                            <div className="container-x flex flex-col py-4">
                                {navLinks.map((link, i) => (
                                    <m.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.04 * i + 0.05 }}
                                        className="flex items-center justify-between border-b border-brand-900/[0.07] py-4 font-display text-2xl font-semibold text-brand-900"
                                    >
                                        {link.label}
                                        <ArrowRight size={18} className="text-accent" aria-hidden="true" />
                                    </m.a>
                                ))}
                                <button type="button" onClick={() => book("mobile_menu")} className="btn-accent mt-8 w-full py-4">
                                    {siteConfig.enquiryButtonText} — It's Free
                                </button>
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <a href={telLink()} className="btn-outline">
                                        <Phone size={17} aria-hidden="true" /> Call
                                    </a>
                                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
                                        <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
                                    </a>
                                </div>
                                <p className="mt-8 text-center text-sm text-muted">{siteConfig.timings.join(" · ")}</p>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
