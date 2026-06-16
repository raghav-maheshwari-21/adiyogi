import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [visible, setVisible] =
        useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener(
            "scroll",
            toggleVisibility
        );

        return () =>
            window.removeEventListener(
                "scroll",
                toggleVisibility
            );
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            className="fixed bottom-24 right-6 z-50 bg-green-700 text-white p-3 rounded-full shadow-lg"
        >
            <ChevronUp />
        </button>
    );
}