import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function InstructorSection() {
    return (
        <section
            id="about"
            className="section-padding"
        >
            <div className="container-custom grid lg:grid-cols-2 gap-14 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src={siteConfig.instructor.image}
                        alt={siteConfig.instructor.name}
                        className="rounded-[40px] shadow-2xl w-full"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://placehold.co/600x700?text=Instructor";
                        }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-green-700 font-semibold">
                        Meet Your Instructor
                    </span>

                    <h2 className="text-4xl font-bold mt-4">
                        {siteConfig.instructor.name}
                    </h2>

                    <p className="mt-6 text-gray-600">
                        {siteConfig.instructor.description}
                    </p>

                    <div className="mt-8 space-y-4">

                        {siteConfig.instructor.qualifications.map(
                            (qualification) => (
                                <div
                                    key={qualification}
                                    className="flex items-center gap-3"
                                >
                                    <BadgeCheck
                                        className="text-green-700"
                                    />

                                    <span>
                                        {qualification}
                                    </span>
                                </div>
                            )
                        )}

                    </div>

                    <div className="mt-8 flex items-center gap-4 glass-card rounded-2xl p-5">
                        <Award className="text-amber-500" />

                        <div>
                            <h4 className="font-semibold">
                                Experience
                            </h4>

                            <p>
                                {siteConfig.instructor.experience}
                            </p>
                        </div>
                    </div>

                    <a
                        href="#contact"
                        className="primary-btn inline-block mt-8"
                    >
                        Talk to Instructor
                    </a>
                </motion.div>

            </div>
        </section>
    );
}