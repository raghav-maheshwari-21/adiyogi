import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/siteConfig.js";

const esc = (s = "") =>
    String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const absolute = (path) => {
    if (!path || /^https?:\/\//.test(path)) return path;
    return siteConfig.website ? siteConfig.website.replace(/\/$/, "") + path : path;
};

/**
 * Writes <title>, meta description, social share preview (WhatsApp/Facebook/X)
 * and Google structured data into index.html from siteConfig — so crawlers and
 * link previews see them without running JavaScript.
 */
function siteMetaPlugin() {
    return {
        name: "site-meta",
        transformIndexHtml(html) {
            const c = siteConfig;
            const title = c.seo?.title || `${c.businessName} | ${c.tagline}`;
            const description = c.seo?.description || c.tagline;
            const image = absolute(c.seo?.ogImage || c.logo);

            const business = {
                "@context": "https://schema.org",
                "@type": "HealthClub",
                name: c.businessName,
                description,
                image,
                logo: absolute(c.logo),
                telephone: c.phone,
                email: c.email,
                address: { "@type": "PostalAddress", addressLocality: c.address, addressCountry: "IN" },
                ...(c.website && { url: c.website }),
                sameAs: Object.values(c.socialLinks || {}).filter((u) => u && !/\.com\/?$/.test(u)),
                ...(c.googleRating?.enabled && {
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: c.googleRating.value,
                        reviewCount: parseInt(c.googleRating.count, 10) || 1,
                    },
                }),
            };

            const faq = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: (c.faqs || []).map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
            };

            const ld = (obj) =>
                `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

            const tags = [
                `<title>${esc(title)}</title>`,
                `<meta name="description" content="${esc(description)}" />`,
                c.seo?.keywords && `<meta name="keywords" content="${esc(c.seo.keywords)}" />`,
                `<meta name="theme-color" content="${esc(c.theme?.["brand-900"] || "#262E1B")}" />`,
                c.website && `<link rel="canonical" href="${esc(c.website)}" />`,
                `<meta property="og:type" content="website" />`,
                `<meta property="og:site_name" content="${esc(c.businessName)}" />`,
                `<meta property="og:title" content="${esc(title)}" />`,
                `<meta property="og:description" content="${esc(description)}" />`,
                `<meta property="og:image" content="${esc(image)}" />`,
                c.website && `<meta property="og:url" content="${esc(c.website)}" />`,
                `<meta name="twitter:card" content="summary_large_image" />`,
                `<meta name="twitter:title" content="${esc(title)}" />`,
                `<meta name="twitter:description" content="${esc(description)}" />`,
                `<meta name="twitter:image" content="${esc(image)}" />`,
                `<link rel="preload" as="image" href="${esc(c.hero?.image)}" fetchpriority="high" />`,
                ld(business),
                faq.mainEntity.length && ld(faq),
            ].filter(Boolean);

            return html.replace("<!--SITE_META-->", tags.join("\n    "));
        },
    };
}

export default defineConfig({
    plugins: [react(), tailwindcss(), siteMetaPlugin()],
    base: "/",
    build: {
        target: "es2019",
        cssMinify: true,
        sourcemap: false,
    },
});
