import { useEffect, useRef } from "react";

/**
 * Counts up when scrolled into view. Writes straight to the DOM node
 * (no React re-render per frame) so it stays smooth on low-end phones.
 */
export default function CountUp({ end, suffix = "", prefix = "", decimals = 0, duration = 1800 }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const format = (v) => `${prefix}${v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let raf;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                io.disconnect();
                if (reduce) {
                    el.textContent = format(end);
                    return;
                }
                const start = performance.now();
                const tick = (now) => {
                    const p = Math.min((now - start) / duration, 1);
                    el.textContent = format(end * (1 - Math.pow(1 - p, 3)));
                    if (p < 1) raf = requestAnimationFrame(tick);
                };
                raf = requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );

        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [end, suffix, prefix, decimals, duration]);

    return (
        <span ref={ref} aria-label={`${prefix}${end}${suffix}`}>
            {prefix}0{suffix}
        </span>
    );
}
