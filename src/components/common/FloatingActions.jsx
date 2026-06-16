import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";

export default function FloatingActions() {
    const whatsappLink = `https://wa.me/${
        siteConfig.whatsapp
    }?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

    return (
        <>
            {/* Desktop */}

            <div className="hidden md:flex fixed bottom-8 right-6 z-50 flex-col gap-4">

                <a
                    href={`tel:${siteConfig.phone}`}
                    className="bg-green-800 text-white p-4 rounded-full shadow-xl hover:scale-110 transition animate-bounce"
                >
                    <Phone size={24} />
                </a>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25D366]
text-white
p-4
rounded-full
shadow-xl
hover:scale-110
transition
animate-bounce"
                >
                    <FaWhatsapp size={24} />
                </a>

            </div>

            {/* Mobile */}

            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex shadow-2xl">

                <a
                    href={`tel:${siteConfig.phone}`}
                    className="w-1/2 bg-green-800 text-white py-4 text-center font-semibold"
                >
                    Call Now
                </a>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-1/2 bg-green-600 text-white py-4 text-center font-semibold"
                >
                    WhatsApp
                </a>

            </div>
        </>
    );
}