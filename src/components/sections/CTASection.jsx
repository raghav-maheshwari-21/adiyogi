import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";

export default function CTASection() {
    return (
        <section className="section-padding">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-green-700 to-green-500 rounded-[40px] px-8 py-16 text-center text-white"
                >
                    <h2 className="text-4xl md:text-5xl font-bold">
                        Begin Your Yoga Journey Today
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-green-50">
                        Experience the benefits of yoga through expert guidance,
                        personalized attention, and a supportive community.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
                        <a
                            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
                        >
                            <FaWhatsapp size={20} />
                            Enquire on WhatsApp
                        </a>

                        <a
                            href={`tel:${siteConfig.phone}`}
                            className="border border-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-green-700 transition"
                        >
                            <Phone size={20} />
                            Call Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}