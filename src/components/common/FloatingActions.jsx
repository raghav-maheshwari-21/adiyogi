import clsx from "clsx";
import { CalendarCheck, ChevronUp, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { useScrolledPast } from "../../hooks/useScroll";
import { telLink, trackEvent, whatsappLink } from "../../lib/utils";

export default function FloatingActions() {
    const { openLeadModal } = useLeadModal();
    const showTop = useScrolledPast(700);
    const wa = whatsappLink();

    return (
        <>
            {/* Desktop: WhatsApp bubble + back to top */}
            <div className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 md:flex">
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    tabIndex={showTop ? 0 : -1}
                    className={clsx(
                        "flex size-11 items-center justify-center rounded-full bg-white text-brand-900 shadow-soft ring-1 ring-brand-900/10 transition-[opacity,transform] duration-300 hover:bg-brand-50",
                        showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                    )}
                >
                    <ChevronUp size={20} />
                </button>

                <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "floating" })}
                    aria-label="Chat with us on WhatsApp"
                    className="group relative flex items-center"
                >
                    <span className="pointer-events-none absolute right-full mr-3 origin-right scale-95 rounded-full bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-brand-900 opacity-0 shadow-soft transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100">
                        Chat with us
                    </span>
                    <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.7)] transition-transform duration-300 group-hover:scale-105">
                        <span className="absolute inset-0 animate-ping-soft rounded-full bg-[#25D366]" aria-hidden="true" />
                        <FaWhatsapp size={28} className="relative" aria-hidden="true" />
                    </span>
                </a>
            </div>

            {/* Mobile: sticky action bar */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-900/10 bg-cream/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgb(38_46_27/0.25)] backdrop-blur-md md:hidden">
                <div className="grid grid-cols-[auto_auto_1fr] gap-2">
                    <a
                        href={telLink()}
                        onClick={() => trackEvent("contact_click", { method: "phone", source: "mobile_bar" })}
                        aria-label="Call us"
                        className="flex size-12 items-center justify-center rounded-full bg-white text-brand-900 ring-1 ring-brand-900/10"
                    >
                        <Phone size={20} />
                    </a>
                    <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "mobile_bar" })}
                        aria-label="WhatsApp us"
                        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white"
                    >
                        <FaWhatsapp size={24} />
                    </a>
                    <button
                        type="button"
                        onClick={() => openLeadModal({ source: "mobile_bar" })}
                        className="btn-accent h-12 px-4 py-0 text-[0.95rem]"
                    >
                        <CalendarCheck size={18} aria-hidden="true" /> {siteConfig.enquiryButtonText}
                    </button>
                </div>
            </div>
        </>
    );
}
