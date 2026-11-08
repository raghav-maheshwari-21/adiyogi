import { siteConfig } from "../../config/siteConfig";
import Icon from "../common/Icon";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function BenefitsSection() {
    const b = siteConfig.benefits;
    if (!b?.enabled) return null;

    return (
        <section className="section">
            <div className="container-x">
                <SectionHeading eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />

                <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-brand-900/[0.08] ring-1 ring-brand-900/[0.08] sm:grid-cols-2 lg:grid-cols-3">
                    {b.items.map((item, i) => (
                        <Reveal key={item.title} delay={(i % 3) * 0.08} className="group bg-cream p-8 transition-colors duration-300 hover:bg-white sm:p-10">
                            <div className="icon-chip transition-colors duration-300 group-hover:bg-brand-800 group-hover:text-cream">
                                <Icon name={item.icon} size={22} />
                            </div>
                            <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                            <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
