import { siteConfig } from "../../config/siteConfig";
import CountUp from "../common/CountUp";
import Reveal from "../common/Reveal";

export default function StatsSection() {
    const stats = siteConfig.stats || [];
    if (!stats.length) return null;

    return (
        <section aria-label="Our numbers" className="relative z-10 -mt-6 lg:-mt-10">
            <div className="container-x">
                <Reveal className="grid grid-cols-2 overflow-hidden rounded-[28px] bg-brand-900 text-cream shadow-lift lg:grid-cols-4">
                    {stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`relative px-6 py-8 text-center sm:py-10 ${i % 2 === 1 ? "border-l border-cream/10" : ""} ${i >= 2 ? "border-t border-cream/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                        >
                            <p className="font-display text-5xl font-semibold text-cream sm:text-6xl">
                                <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                            </p>
                            <p className="mt-2 text-sm font-medium tracking-wide text-cream/70">{s.label}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
