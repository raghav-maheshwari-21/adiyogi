import clsx from "clsx";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false, className }) {
    const centered = align === "center";
    return (
        <Reveal className={clsx("max-w-2xl", centered && "mx-auto text-center", className)}>
            {eyebrow && <span className={clsx("eyebrow", light && "text-accent-soft before:bg-accent-soft")}>{eyebrow}</span>}
            <h2 className={clsx("heading-xl mt-4", light && "text-cream")}>{title}</h2>
            {subtitle && (
                <p className={clsx("mt-5 text-lg leading-relaxed", light ? "text-cream/75" : "text-muted")}>{subtitle}</p>
            )}
        </Reveal>
    );
}
