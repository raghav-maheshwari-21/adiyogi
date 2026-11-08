import { siteConfig } from "../config/siteConfig";

/** Applies colour tokens from siteConfig.theme to the page (overrides the CSS defaults). */
export function applyTheme() {
    const root = document.documentElement;
    Object.entries(siteConfig.theme || {}).forEach(([key, value]) => {
        if (value) root.style.setProperty(`--color-${key}`, value);
    });
}

const loadScript = (src) => {
    const s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
};

/** Loads analytics only after the page is idle, so it never slows the first paint. */
export function loadAnalytics() {
    const { googleAnalyticsId, metaPixelId } = siteConfig.analytics || {};
    if (!googleAnalyticsId && !metaPixelId) return;

    const run = () => {
        if (googleAnalyticsId) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag("js", new Date());
            window.gtag("config", googleAnalyticsId);
            loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`);
        }

        if (metaPixelId && !window.fbq) {
            const fbq = function () {
                fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
            };
            fbq.push = fbq;
            fbq.loaded = true;
            fbq.version = "2.0";
            fbq.queue = [];
            window.fbq = window._fbq = fbq;
            loadScript("https://connect.facebook.net/en_US/fbevents.js");
            window.fbq("init", metaPixelId);
            window.fbq("track", "PageView");
        }
    };

    if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 4000 });
    else window.addEventListener("load", () => setTimeout(run, 1500), { once: true });
}
