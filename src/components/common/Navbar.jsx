import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../../config/siteConfig";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Classes", href: "#classes" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/80 backdrop-blur-lg shadow-lg"
                    : "bg-transparent"
            }`}
        >
            <div className="container-custom h-20 flex items-center justify-between">

                <a
                    href="#home"
                    className="text-3xl font-bold text-green-900"
                >
                    {siteConfig.businessName}
                </a>

                <div className="hidden md:flex items-center gap-10">

                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="font-medium hover:text-green-700 transition"
                        >
                            {link.label}
                        </a>
                    ))}

                    <a
                        href="#contact"
                        className="primary-btn"
                    >
                        {siteConfig.enquiryButtonText}
                    </a>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="md:hidden bg-white shadow-lg"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block px-6 py-4 border-b"
                            >
                                {link.label}
                            </a>
                        ))}

                        <div className="p-6">
                            <a
                                href="#contact"
                                className="primary-btn inline-block w-full text-center"
                            >
                                {siteConfig.enquiryButtonText}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}