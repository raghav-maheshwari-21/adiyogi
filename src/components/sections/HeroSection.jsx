import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";

export default function HeroSection() {
    const whatsappLink = `https://wa.me/${siteConfig.whatsapp
        }?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

    return (
        <section
            id="home"
            className="relative overflow-hidden pt-36 pb-24"
        >
            {/* Background Blobs */}

            <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-green-200 blur-3xl opacity-40" />

            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-200 blur-3xl opacity-30" />

            <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">

                {/* Left */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 font-semibold text-sm">
                        🧘 Begin Your Wellness Journey
                    </span>

                    <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight">
                        Transform Your Body,
                        <br />
                        Calm Your Mind,
                        <br />
                        Discover Inner Peace.
                    </h1>

                    <p className="mt-6 text-lg text-gray-600 max-w-xl">
                        Join AdiYogi and experience authentic yoga
                        practices that improve your health,
                        reduce stress, and create a balanced life.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <a
                            href="#contact"
                            className="primary-btn flex items-center gap-2"
                        >
                            Book Free Trial
                            <ArrowRight size={18} />
                        </a>

                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="secondary-btn flex items-center gap-2"
                        >
                            <FaWhatsapp size={22} />
                            WhatsApp Us
                        </a>

                    </div>

                    <div className="mt-12 flex flex-wrap gap-8">

                        <div>
                            <h3 className="text-2xl font-bold">
                                {siteConfig.stats.students}
                            </h3>

                            <p className="text-gray-600">
                                Happy Students
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">
                                {siteConfig.stats.experience}
                            </h3>

                            <p className="text-gray-600">
                                Years Experience
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">
                                {siteConfig.stats.sessions}
                            </h3>

                            <p className="text-gray-600">
                                Sessions Conducted
                            </p>
                        </div>

                    </div>
                </motion.div>

                {/* Right */}

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <img
                        src={siteConfig.instructor.image}
                        alt={siteConfig.instructor.name}
                        className="w-full rounded-[40px] shadow-2xl object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x800?text=AdiYogi";
                        }}
                    />

                    <div className="absolute top-6 left-6 glass-card rounded-2xl px-5 py-3">
                        <p className="font-semibold">
                            ⭐ Certified Instructor
                        </p>
                    </div>

                    <div className="absolute bottom-6 right-6 glass-card rounded-2xl px-5 py-3">
                        <p className="font-semibold">
                            {siteConfig.instructor.experience}
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}