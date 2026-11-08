import clsx from "clsx";
import { siteConfig } from "../../config/siteConfig";

export default function Logo({ light = false, className }) {
    return (
        <a href="#home" className={clsx("flex items-center gap-3", className)} aria-label={`${siteConfig.businessName} home`}>
            <img
                src={siteConfig.logo}
                alt=""
                width="44"
                height="44"
                className="size-11 rounded-full shadow-sm"
                decoding="async"
            />
            <span className={clsx("font-display text-2xl font-semibold tracking-wide", light ? "text-cream" : "text-brand-900")}>
                {siteConfig.businessName}
            </span>
        </a>
    );
}
