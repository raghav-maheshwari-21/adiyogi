import {
    Users,
    ShieldCheck,
    Clock,
    Sparkles,
    Laptop,
    UserCheck,
} from "lucide-react";

const features = [
    {
        title: "Personalized Attention",
        icon: UserCheck,
    },
    {
        title: "Small Batch Sizes",
        icon: Users,
    },
    {
        title: "Certified Instructor",
        icon: ShieldCheck,
    },
    {
        title: "Flexible Timings",
        icon: Clock,
    },
    {
        title: "Traditional + Modern Techniques",
        icon: Sparkles,
    },
    {
        title: "Online & Offline Classes",
        icon: Laptop,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="section-padding bg-green-50">
            <div className="container-custom">

                <div className="text-center mb-14">
                    <span className="text-green-700 font-semibold">
                        Why Choose AdiYogi
                    </span>

                    <h2 className="text-4xl font-bold mt-3">
                        Experience the Difference
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="glass-card rounded-3xl p-8 flex items-center gap-4 hover:-translate-y-2 transition"
                            >
                                <div className="bg-green-100 rounded-2xl p-4">
                                    <Icon className="text-green-700" />
                                </div>

                                <span className="font-semibold">
                                    {feature.title}
                                </span>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}