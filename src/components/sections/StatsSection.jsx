import { siteConfig } from "../../config/siteConfig";

export default function StatsSection() {
    const stats = [
        {
            label: "Happy Students",
            value: siteConfig.stats.students,
        },
        {
            label: "Years Experience",
            value: siteConfig.stats.experience,
        },
        {
            label: "Sessions Conducted",
            value: siteConfig.stats.sessions,
        },
    ];

    return (
        <section className="section-padding bg-green-50">
            <div className="container-custom grid md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="glass-card rounded-3xl p-8 text-center hover:-translate-y-2 transition"
                    >
                        <h3 className="text-5xl font-bold text-green-800">
                            {stat.value}
                        </h3>

                        <p className="mt-3 text-gray-600">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}