import {
    Heart,
    Moon,
    Brain,
    Activity,
    Smile,
    Dumbbell,
} from "lucide-react";

const benefits = [
    {
        title: "Reduce Stress",
        icon: Brain,
        description:
            "Calm your mind and improve emotional wellbeing.",
    },
    {
        title: "Better Sleep",
        icon: Moon,
        description:
            "Improve sleep quality naturally.",
    },
    {
        title: "Mental Clarity",
        icon: Smile,
        description:
            "Enhance focus and concentration.",
    },
    {
        title: "Improve Flexibility",
        icon: Activity,
        description:
            "Increase mobility and reduce stiffness.",
    },
    {
        title: "Weight Management",
        icon: Dumbbell,
        description:
            "Support your fitness goals.",
    },
    {
        title: "Heart Health",
        icon: Heart,
        description:
            "Improve circulation and vitality.",
    },
];

export default function BenefitsSection() {
    return (
        <section className="section-padding bg-green-50">
            <div className="container-custom">

                <div className="text-center mb-14">
                    <span className="text-green-700 font-semibold">
                        Benefits
                    </span>

                    <h2 className="text-4xl font-bold mt-3">
                        Why Practice Yoga?
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div
                                key={benefit.title}
                                className="glass-card rounded-3xl p-8 hover:-translate-y-2 transition"
                            >
                                <div className="bg-green-100 rounded-2xl w-14 h-14 flex items-center justify-center">
                                    <Icon className="text-green-700" />
                                </div>

                                <h3 className="mt-6 text-xl font-semibold">
                                    {benefit.title}
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}