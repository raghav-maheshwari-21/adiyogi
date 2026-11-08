import { m } from "framer-motion";

/**
 * Fade-up on scroll. Animates only opacity + transform (GPU friendly),
 * runs once, and respects the visitor's reduced-motion setting.
 */
export default function Reveal({ children, delay = 0, y = 28, className, as = "div", ...rest }) {
    const Cmp = m[as];
    return (
        <Cmp
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
            {...rest}
        >
            {children}
        </Cmp>
    );
}
