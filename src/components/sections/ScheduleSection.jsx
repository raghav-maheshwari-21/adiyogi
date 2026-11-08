import clsx from "clsx";
import { Check, Clock, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";

export default function ScheduleSection() {
    const { schedule, pricing } = siteConfig;
    const { openLeadModal } = useLeadModal();
    if (!schedule?.enabled) return null;

    return (
        <section id="schedule" className="section bg-sand/70">
            <div className="container-x">
                <SectionHeading eyebrow={schedule.eyebrow} title={schedule.title} subtitle={schedule.subtitle} />

                {/* Batches */}
                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {schedule.batches.map((b, i) => (
                        <Reveal key={b.name} delay={i * 0.06} className="card relative p-6">
                            {b.note && (
                                <span className="absolute top-5 right-5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold tracking-wide text-accent-dark uppercase">
                                    {b.note}
                                </span>
                            )}
                            <p className="text-sm font-semibold text-muted">{b.name}</p>
                            <p className="mt-2 font-display text-[1.7rem] leading-tight font-semibold text-brand-900">{b.time}</p>
                            <div className="mt-4 space-y-1.5 text-sm text-muted">
                                <p className="flex items-center gap-2"><Clock size={14} aria-hidden="true" /> {b.days}</p>
                                <p className="flex items-center gap-2"><MapPin size={14} aria-hidden="true" /> {b.mode}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Pricing */}
                {pricing?.enabled && (
                    <>
                        <div className="mt-20 grid items-stretch gap-6 lg:grid-cols-3">
                            {pricing.plans.map((plan, i) => (
                                <Reveal
                                    key={plan.name}
                                    delay={i * 0.08}
                                    className={clsx(
                                        "relative flex flex-col rounded-[28px] p-8 sm:p-9",
                                        plan.popular
                                            ? "bg-brand-900 text-cream shadow-lift lg:-my-4 lg:py-12"
                                            : "bg-white shadow-soft ring-1 ring-brand-900/[0.06]"
                                    )}
                                >
                                    {plan.popular && (
                                        <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase shadow-md">
                                            <Sparkles size={13} aria-hidden="true" /> Most Popular
                                        </span>
                                    )}
                                    <h3 className={clsx("text-2xl font-semibold", plan.popular && "text-cream")}>{plan.name}</h3>
                                    <p className={clsx("mt-1 text-sm", plan.popular ? "text-cream/70" : "text-muted")}>{plan.description}</p>
                                    <p className="mt-6 flex items-baseline gap-2">
                                        <span className={clsx("font-display text-5xl font-semibold", plan.popular ? "text-cream" : "text-brand-900")}>{plan.price}</span>
                                        <span className={clsx("text-sm font-medium", plan.popular ? "text-cream/70" : "text-muted")}>{plan.period}</span>
                                    </p>
                                    <ul className="mt-7 flex-1 space-y-3">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-start gap-3 text-[0.95rem]">
                                                <span className={clsx("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full", plan.popular ? "bg-accent text-white" : "bg-brand-50 text-brand-700")}>
                                                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                                                </span>
                                                <span className={plan.popular ? "text-cream/90" : "text-ink"}>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        onClick={() => openLeadModal({ source: "pricing", interest: `${plan.name} plan` })}
                                        className={clsx("mt-8 w-full py-4", plan.popular ? "btn-accent" : "btn-outline")}
                                    >
                                        {plan.cta}
                                    </button>
                                </Reveal>
                            ))}
                        </div>
                        {pricing.note && <p className="mt-10 text-center text-sm text-muted">{pricing.note}</p>}
                    </>
                )}
            </div>
        </section>
    );
}
