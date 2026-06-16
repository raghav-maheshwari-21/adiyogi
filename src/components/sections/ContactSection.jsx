import { useState } from "react";
import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    MessageCircle,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "../../config/siteConfig";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        const phoneRegex = /^[6-9]\d{9}$/;

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone =
                "Enter a valid 10-digit mobile number";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const whatsappText = `
Namaste 🙏

Name: ${formData.name}

Phone: ${formData.phone}

Message:
${formData.message}
        `;

        const whatsappURL = `https://wa.me/${
            siteConfig.whatsapp
        }?text=${encodeURIComponent(
            whatsappText
        )}`;

        window.open(whatsappURL, "_blank");

        setFormData({
            name: "",
            phone: "",
            message: "",
        });
    };

    return (
        <section
            id="contact"
            className="section-padding bg-green-50"
        >
            <div className="container-custom">

                {/* Heading */}

                <div className="text-center mb-14">

                    <span className="text-green-700 font-semibold">
                        Contact Us
                    </span>

                    <h2 className="text-4xl font-bold mt-3">
                        Start Your Wellness Journey
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Book your free trial class or
                        connect with us directly on
                        WhatsApp.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Form */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true }}
                        className="glass-card rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold mb-6">
                            Send an Enquiry
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full p-4 rounded-2xl border outline-none"
                                />

                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full p-4 rounded-2xl border outline-none"
                                />

                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <textarea
                                    rows="5"
                                    name="message"
                                    placeholder="How can we help you?"
                                    value={
                                        formData.message
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full p-4 rounded-2xl border outline-none resize-none"
                                />

                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="primary-btn w-full flex items-center justify-center gap-2"
                            >
                                <FaWhatsapp />

                                Enquire on WhatsApp
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="glass-card rounded-3xl p-6 flex gap-4">
                            <div className="bg-green-100 p-4 rounded-2xl">
                                <Phone className="text-green-700" />
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    Call Us
                                </h4>

                                <a
                                    href={`tel:${siteConfig.phone}`}
                                    className="text-gray-600"
                                >
                                    {siteConfig.phone}
                                </a>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-6 flex gap-4">
                            <div className="bg-green-100 p-4 rounded-2xl">
                                <Mail className="text-green-700" />
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    Email
                                </h4>

                                <a
                                    href={`mailto:${siteConfig.email}`}
                                    className="text-gray-600"
                                >
                                    {siteConfig.email}
                                </a>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl p-6 flex gap-4">
                            <div className="bg-green-100 p-4 rounded-2xl">
                                <MapPin className="text-green-700" />
                            </div>

                            <div>
                                <h4 className="font-semibold">
                                    Address
                                </h4>

                                <p className="text-gray-600">
                                    {
                                        siteConfig.address
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="glass-card rounded-3xl overflow-hidden">
                            <iframe
                                title="Google Map"
                                src={
                                    siteConfig.mapEmbedUrl
                                }
                                width="100%"
                                height="300"
                                loading="lazy"
                                className="border-0"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}