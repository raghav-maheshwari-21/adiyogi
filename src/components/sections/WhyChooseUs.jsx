import { siteConfig } from "../../config/siteConfig";
import Icon from "../common/Icon";
import Reveal from "../common/Reveal";

export default function WhyChooseUs() {
    const w = siteConfig.whyChooseUs;
    if (!w?.enabled) return null;

    return (
        <section className="section relative overflow-clip bg-brand-900 text-cream">
            <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{ background: "radial-gradient(50rem 30rem at 100% 0%, rgb(110 127 76 / 0.45), transparent 60%)" }}
                aria-hidden="true"
            />
            <div className="container-x relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                <Reveal className="lg:sticky lg:top-28 lg:self-start">
                    <span className="eyebrow text-accent-soft before:bg-accent-soft">{w.eyebrow}</span>
                    <h2 className="heading-xl mt-4 text-cream">{w.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-cream/70">{w.subtitle}</p>
                    {w.image && (
                        <div className="mt-10 hidden aspect-[4/3] overflow-hidden rounded-[28px] lg:block">
                            <img src={w.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
                        </div>
                    )}
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2">
                    {w.features.map((f, i) => (
                        <Reveal
                            key={f.title}
                            delay={(i % 2) * 0.08}
                            className="rounded-3xl border border-cream/10 bg-cream/[0.04] p-7 transition-colors duration-300 hover:border-cream/20 hover:bg-cream/[0.07]"
                        >
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/90 text-white">
                                <Icon name={f.icon} size={22} />
                            </div>
                            <h3 className="mt-6 text-2xl font-semibold text-cream">{f.title}</h3>
                            {f.description && <p className="mt-2 leading-relaxed text-cream/65">{f.description}</p>}
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
