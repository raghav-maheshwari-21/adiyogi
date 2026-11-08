import { useEffect, useSyncExternalStore } from "react";

/*
 * One shared, passive, rAF-throttled scroll listener for the whole app.
 * Components subscribe to a boolean, so they re-render only when it flips —
 * never on every scroll frame.
 */
const listeners = new Set();
let ticking = false;

const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        ticking = false;
        listeners.forEach((l) => l());
    });
};

const subscribe = (cb) => {
    if (listeners.size === 0) window.addEventListener("scroll", onScroll, { passive: true });
    listeners.add(cb);
    return () => {
        listeners.delete(cb);
        if (listeners.size === 0) window.removeEventListener("scroll", onScroll);
    };
};

export function useScrolledPast(threshold) {
    return useSyncExternalStore(
        subscribe,
        () => window.scrollY > threshold,
        () => false
    );
}

/* Body scroll lock with a counter, so nested overlays (menu + modal) don't conflict. */
let lockCount = 0;

export function useLockBodyScroll(active) {
    useEffect(() => {
        if (!active) return;
        const html = document.documentElement;
        if (lockCount === 0) {
            const scrollbar = window.innerWidth - html.clientWidth;
            html.style.overflow = "hidden";
            if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;
        }
        lockCount++;
        return () => {
            lockCount--;
            if (lockCount === 0) {
                html.style.overflow = "";
                html.style.paddingRight = "";
            }
        };
    }, [active]);
}
