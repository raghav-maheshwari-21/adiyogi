import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../config/siteConfig";

export default function SEO({
    title,
    description,
}) {
    const pageTitle = title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name;

    return (
        <Helmet>
            <title>{pageTitle}</title>

            <meta
                name="description"
                content={description}
            />

            <meta
                property="og:title"
                content={pageTitle}
            />

            <meta
                property="og:description"
                content={description}
            />

            <meta
                property="og:type"
                content="website"
            />

            <meta
                property="og:image"
                content={siteConfig.logo}
            />

            <meta
                name="twitter:card"
                content="summary_large_image"
            />

            <link
                rel="canonical"
                href={siteConfig.website}
            />
        </Helmet>
    );
}