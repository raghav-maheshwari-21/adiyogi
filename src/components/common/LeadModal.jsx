import { useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { CircleCheck, X } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { useLockBodyScroll } from "../../hooks/useScroll";
import LeadForm from "./LeadForm";

const lc = siteConfig.leadCapture;
const popup = siteConfig.popup;

export default function LeadModal({ open, source, interest, variant, onClose }) {
    const panelRef = useRef(null);
    const isPopup = variant === "popup";
    useLockBodyScroll(open);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        // Focus the first field after the entrance animation starts.
        const t = setTimeout(() => panelRef.current?.querySelector("input")?.focus({ preventScroll: true }), 250);
        return () => {
            window.removeEventListener("keydown", onKey);
            clearTimeout(t);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <m.div
                    key="lead-modal"
                    className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        tabIndex={-1}
                        onClick={onClose}
                        className="absolute inset-0 cursor-default bg-brand-900/60"
                    />

                    <m.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="lead-modal-title"
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[28px] md:overflow-hidden bg-cream shadow-2xl sm:rounded-[28px] md:grid-cols-[0.9fr_1.1fr]"
                    >
                        {/* Visual side */}
                        <div className="relative hidden overflow-hidden md:block">
                            <img
                                src={popup.image || siteConfig.hero.image}
                                alt=""
                                className="absolute inset-0 size-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-brand-900/10" />
                            <div className="relative flex h-full flex-col justify-end p-8 text-cream">
                                {popup.badge && (
                                    <span className="mb-4 w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                                        {popup.badge}
                                    </span>
                                )}
                                <p className="font-display text-3xl leading-tight font-semibold">{popup.title}</p>
                                <ul className="mt-5 space-y-2.5 text-sm text-cream/90">
                                    {siteConfig.hero.highlights.map((h) => (
                                        <li key={h} className="flex items-center gap-2">
                                            <CircleCheck size={16} className="text-brand-200" aria-hidden="true" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Form side */}
                        <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-9 md:max-h-[92dvh] md:overflow-y-auto md:overscroll-contain">
                            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-brand-900/15 sm:hidden" aria-hidden="true" />
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close form"
                                className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-brand-900 shadow-sm transition-colors hover:bg-white md:bg-brand-50 md:hover:bg-brand-100"
                            >
                                <X size={20} />
                            </button>

                            {isPopup && popup.badge && (
                                <span className="mb-3 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold tracking-wide text-accent-dark uppercase md:hidden">
                                    {popup.badge}
                                </span>
                            )}
                            <h2 id="lead-modal-title" className="pr-10 text-3xl font-semibold sm:text-4xl">
                                {isPopup ? popup.title : lc.formTitle}
                            </h2>
                            <p className="mt-2 mb-6 text-muted">{isPopup ? popup.subtitle : lc.formSubtitle}</p>

                            <LeadForm compact defaultInterest={interest} source={source} />
                        </div>
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
