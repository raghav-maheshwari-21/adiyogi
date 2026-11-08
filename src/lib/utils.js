import { siteConfig } from "../config/siteConfig";

export const whatsappLink = (text = siteConfig.whatsappMessage) =>
    `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;

export const telLink = () => `tel:${siteConfig.phone}`;

export const mapsLink = () =>
    siteConfig.mapLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${siteConfig.businessName} ${siteConfig.address}`
    )}`;

export const mapsEmbed = () => {
    const url = siteConfig.mapEmbedUrl;
    if (url && url.includes("/maps/embed") && !url.includes("YOUR_EMBED_URL")) return url;
    return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;
};

export const initials = (name = "") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");

/** Opens a URL in a new tab, falling back to same-tab navigation if a popup blocker interferes. */
export const openExternal = (url) => {
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
};

/* -------- Safe storage (private mode / blocked storage never breaks the site) -------- */
export const storage = {
    get(key, session = false) {
        try {
            return (session ? sessionStorage : localStorage).getItem(key);
        } catch {
            return null;
        }
    },
    set(key, value, session = false) {
        try {
            (session ? sessionStorage : localStorage).setItem(key, value);
        } catch {
            /* ignore */
        }
    },
};

/* -------- Conversion tracking (works only if analytics IDs are configured) -------- */
export const trackEvent = (name, params = {}) => {
    try {
        if (typeof window.gtag === "function") window.gtag("event", name, params);
        if (typeof window.fbq === "function") {
            if (name === "generate_lead") window.fbq("track", "Lead", params);
            else if (name === "contact_click") window.fbq("track", "Contact", params);
            else window.fbq("trackCustom", name, params);
        }
    } catch {
        /* never let analytics break the UI */
    }
};
