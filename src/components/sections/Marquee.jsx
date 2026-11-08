import { siteConfig } from "../../config/siteConfig";

/** Slow decorative ticker of class names — pure CSS transform animation. */
export default function Marquee() {
    const items = siteConfig.classes.map((c) => c.title);
    const row = [...items, ...items];

    return (
        <div aria-hidden="true" className="mask-fade-x overflow-hidden border-y border-brand-900/[0.07] bg-cream py-6">
            <div className="flex w-max animate-marquee">
                {[0, 1].map((dup) => (
                    <div key={dup} className="flex shrink-0 items-center">
                        {row.map((t, i) => (
                            <span key={`${dup}-${i}`} className="flex items-center font-display text-3xl font-medium text-brand-800/80 italic sm:text-4xl">
                                <span className="px-8">{t}</span>
                                <span className="text-xl text-accent not-italic">✦</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
