import { useId, useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { trackEvent, whatsappLink } from "../../lib/utils";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);
    const uid = useId();
    const faqs = siteConfig.faqs || [];
    if (!faqs.length) return null;

    return (
        <section id="faq" className="section">
            <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <SectionHeading
                        align="left"
                        eyebrow="FAQs"
                        title="Questions, Answered"
                        subtitle="Everything you need to know before your first class."
                    />
                    <Reveal className="mt-8 rounded-3xl bg-brand-50 p-7 ring-1 ring-brand-100">
                        <p className="font-display text-2xl font-semibold text-brand-900">Still have a question?</p>
                        <p className="mt-2 text-muted">We usually reply within an hour during studio timings.</p>
                        <a
                            href={whatsappLink("Namaste 🙏 I have a question about your yoga classes.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent("contact_click", { method: "whatsapp", source: "faq" })}
                            className="btn mt-5 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
                        >
                            <FaWhatsapp size={19} aria-hidden="true" /> Ask on WhatsApp
                        </a>
                    </Reveal>
                </div>

                <Reveal className="divide-y divide-brand-900/10 border-y border-brand-900/10">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        const panelId = `${uid}-panel-${i}`;
                        return (
                            <div key={faq.question}>
                                <h3 className="font-sans">
                                    <button
                                        type="button"
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-brand-900 transition-colors hover:text-accent-dark"
                                    >
                                        {faq.question}
                                        <span
                                            className={clsx(
                                                "flex size-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300",
                                                isOpen ? "rotate-45 bg-brand-800 text-cream" : "bg-brand-50 text-brand-800"
                                            )}
                                        >
                                            <Plus size={18} aria-hidden="true" />
                                        </span>
                                    </button>
                                </h3>
                                {/* CSS grid-rows trick: smooth height animation with no JS measuring */}
                                <div
                                    id={panelId}
                                    role="region"
                                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="pr-14 pb-6 leading-relaxed text-muted">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Reveal>
            </div>
        </section>
    );
}
