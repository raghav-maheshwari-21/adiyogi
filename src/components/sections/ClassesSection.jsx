import { siteConfig } from "../../config/siteConfig";

export default function ClassesSection() {
    return (
        <section
            id="classes"
            className="section-padding"
        >
            <div className="container-custom">

                <div className="text-center mb-14">
                    <span className="text-green-700 font-semibold">
                        Our Classes
                    </span>

                    <h2 className="text-4xl font-bold mt-3">
                        Find Your Perfect Practice
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {siteConfig.classes.map((item) => (
                        <div
                            key={item.title}
                            className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition"
                        >
                            <h3 className="text-2xl font-semibold">
                                {item.title}
                            </h3>

                            <p className="mt-4 text-gray-600">
                                {item.description}
                            </p>

                            <button className="mt-6 text-green-700 font-semibold">
                                Learn More →
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}