import { ArrowRight } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import Icon from "../common/Icon";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function HowItWorks() {
    const p = siteConfig.process;
    const { openLeadModal } = useLeadModal();
    if (!p?.enabled) return null;

    return (
        <section className="section">
            <div className="container-x">
                <SectionHeading eyebrow={p.eyebrow} title={p.title} />

                <div className="relative mt-16">
                <div className="absolute top-8 right-[16%] left-[16%] hidden h-px border-t-2 border-dashed border-brand-200 md:block" aria-hidden="true" />
                <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
                    {p.steps.map((s, i) => (
                        <Reveal as="li" key={s.title} delay={i * 0.12} className="relative text-center">
                            <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-cream text-brand-800 ring-1 ring-brand-200">
                                <Icon name={s.icon} size={26} />
                                <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                                    {i + 1}
                                </span>
                            </div>
                            <h3 className="mt-6 text-2xl font-semibold">{s.title}</h3>
                            <p className="mx-auto mt-2 max-w-xs leading-relaxed text-muted">{s.description}</p>
                        </Reveal>
                    ))}
                </ol>
                </div>

                <Reveal className="mt-14 text-center">
                    <button type="button" onClick={() => openLeadModal({ source: "how_it_works" })} className="btn-primary px-8 py-4 text-base">
                        Start With Step One <ArrowRight size={18} aria-hidden="true" />
                    </button>
                </Reveal>
            </div>
        </section>
    );
}
