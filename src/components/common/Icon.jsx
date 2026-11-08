import {
    Activity,
    Award,
    Baby,
    BadgeCheck,
    Brain,
    CalendarCheck,
    CalendarDays,
    Clock,
    Dumbbell,
    Flame,
    Flower2,
    Heart,
    HeartPulse,
    Laptop,
    Leaf,
    Moon,
    ShieldCheck,
    Smile,
    Sparkles,
    Sun,
    Sunrise,
    UserCheck,
    Users,
    Wind,
} from "lucide-react";

/** Icons available to siteConfig by name. Add more from lucide-react here. */
const icons = {
    Activity,
    Award,
    Baby,
    BadgeCheck,
    Brain,
    CalendarCheck,
    CalendarDays,
    Clock,
    Dumbbell,
    Flame,
    Flower2,
    Heart,
    HeartPulse,
    Laptop,
    Leaf,
    Moon,
    ShieldCheck,
    Smile,
    Sparkles,
    Sun,
    Sunrise,
    UserCheck,
    Users,
    Wind,
};

export default function Icon({ name, ...props }) {
    const Cmp = icons[name] || Sparkles;
    return <Cmp aria-hidden="true" {...props} />;
}
