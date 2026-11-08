import { Star } from "lucide-react";

export default function Stars({ count = 5, size = 16, className = "" }) {
    return (
        <div className={`flex gap-0.5 ${className}`} aria-label={`${count} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    size={size}
                    aria-hidden="true"
                    className={i < count ? "fill-amber-400 text-amber-400" : "fill-brand-100 text-brand-100"}
                />
            ))}
        </div>
    );
}
