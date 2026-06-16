import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex((prev) =>
            prev === index ? null : index
        );
    };

    return (
        <section
            className="section-padding bg-green-50"
        >
            <div className="container-custom">

                <div className="text-center mb-14">

                    <span className="text-green-700 font-semibold">
                        FAQs
                    </span>

                    <h2 className="text-4xl font-bold mt-3">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Have questions? We've answered the most common ones below.
                    </p>

                </div>

                <div className="max-w-4xl mx-auto space-y-5">

                    {siteConfig.faqs.map((faq, index) => {
                        const isOpen =
                            activeIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className="glass-card rounded-3xl overflow-hidden"
                            >
                                <button
                                    onClick={() =>
                                        toggleFAQ(index)
                                    }
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-semibold">
                                        {faq.question}
                                    </span>

                                    {isOpen ? (
                                        <Minus className="text-green-700" />
                                    ) : (
                                        <Plus className="text-green-700" />
                                    )}
                                </button>

                                <AnimatePresence initial={false}>

                                    {isOpen && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}

                                </AnimatePresence>
                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}