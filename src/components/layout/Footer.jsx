import {
    Phone,
    Mail,
    MapPin,
} from "lucide-react";

import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
} from "react-icons/fa";

import { siteConfig } from "../../config/siteConfig";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom py-16">

                <div className="grid md:grid-cols-3 gap-10">

                    {/* Brand */}

                    <div>
                        <h3 className="text-3xl font-bold">
                            {siteConfig.name}
                        </h3>

                        <p className="text-gray-400 mt-4 leading-relaxed">
                            Helping people transform their lives through yoga,
                            mindfulness, and holistic wellness.
                        </p>
                    </div>

                    {/* Quick Links */}

                    <div>
                        <h4 className="font-semibold text-xl mb-5">
                            Quick Links
                        </h4>

                        <ul className="space-y-3 text-gray-400">
                            <li>
                                <a href="#home">Home</a>
                            </li>

                            <li>
                                <a href="#classes">
                                    Classes
                                </a>
                            </li>

                            <li>
                                <a href="#reviews">
                                    Reviews
                                </a>
                            </li>

                            <li>
                                <a href="#contact">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}

                    <div>
                        <h4 className="font-semibold text-xl mb-5">
                            Contact
                        </h4>

                        <div className="space-y-4 text-gray-400">

                            <div className="flex gap-3">
                                <Phone size={18} />

                                <a href={`tel:${siteConfig.phone}`}>
                                    {siteConfig.phone}
                                </a>
                            </div>

                            <div className="flex gap-3">
                                <Mail size={18} />

                                <a href={`mailto:${siteConfig.email}`}>
                                    {siteConfig.email}
                                </a>
                            </div>

                            <div className="flex gap-3">
                                <MapPin size={18} />

                                <span>
                                    {siteConfig.address}
                                </span>
                            </div>

                        </div>

                        <div className="flex gap-4 mt-6">

                            <a
                                href={siteConfig.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href={siteConfig.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href={siteConfig.socialLinks.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube />
                            </a>

                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </div>

                <div className="text-center text-gray-500 mt-2">
                    Designed by{" "}
                    <a
                        href={siteConfig.designer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400"
                    >
                        {siteConfig.designer.name}
                    </a>
                </div>

            </div>
        </footer>
    );
}