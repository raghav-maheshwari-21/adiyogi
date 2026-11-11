/**
 * ============================================================
 *  SITE CONFIG — edit this one file to update the whole website.
 * ============================================================
 *  • Text, contact details, classes, batches, prices, reviews,
 *    FAQs, images and even brand colours all come from here.
 *  • Any section can be hidden with `enabled: false`.
 *  • Icons: use any name from https://lucide.dev/icons that is
 *    registered in src/components/common/Icon.jsx.
 *  • Images: paste a full URL, or put a file in /public/images
 *    and reference it as "/images/your-file.jpg".
 *  • SEO tags (title, description, share preview) are generated
 *    from this file at build time — restart `npm run dev` after
 *    editing the `seo` block to see the change in the page head.
 */

const unsplash = (id, w = 900, h = 0) => {
    const height = h ? "&h=" + h : "";
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${height}&q=75`;
};

export const siteConfig = {
    /* ---------------- Brand ---------------- */
    businessName: "AdiYogi",
    tagline: "Transform Your Body, Calm Your Mind",
    logo: "/images/logo.webp",
    // Your live domain (used for canonical URL & share previews). No trailing slash.
    website: "",

    /* ---------------- Contact ---------------- */
    phone: "+918349413347",
    phoneDisplay: "+91 83494 13347",
    whatsapp: "918349413347",
    whatsappMessage: "Namaste 🙏 I would like to know more about your yoga classes.",
    email: "info@adiyogi.com",
    address: "Jhabua, Madhya Pradesh",
    // Google Maps → Share → Embed a map → copy the src="…" URL. Leave empty to auto-generate from address.
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.4823585208514!2d74.58715527509607!3d22.76789317935309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39610dc96e3bdb1b%3A0x161f8dac4c4ff8c6!2sMitali's%20dance%20studio%20jhabua!5e1!3m2!1sen!2sin!4v1794304917609!5m2!1sen!2sin",
    // Link opened by "Get Directions". Leave empty to auto-generate from address.
    mapLink: "https://www.google.com/maps/dir/22.7778361,74.5814659/Mitali's+dance+studio+jhabua,+IndusInd+bank,+Rajwada,+2nd+floor%E2%9C%94%EF%B8%8F,+chok,+Jhabua,+Madhya+Pradesh+457661/@22.7728339,74.5804482,1610m/data=!3m2!1e3!4b1!4m18!1m7!3m6!1s0x39610dc96e3bdb1b:0x161f8dac4c4ff8c6!2sMitali's+dance+studio+jhabua!8m2!3d22.7678932!4d74.5897302!16s%2Fg%2F11t2c1n7vm!4m9!1m1!4e1!1m5!1m1!1s0x39610dc96e3bdb1b:0x161f8dac4c4ff8c6!2m2!1d74.5897302!2d22.7678932!3e9?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D",

    timings: ["Morning: 6:00 AM – 9:00 AM"],

    enquiryButtonText: "Book Free Trial",

    /* ---------------- SEO ---------------- */
    seo: {
        title: "AdiYogi Yoga Classes in Jhabua | Book a Free Trial",
        description:
            "Certified yoga classes in Jhabua — Hatha, Power Yoga, Meditation, Prenatal, Senior & Kids yoga. Online & offline batches. Book your free trial class today.",
        keywords:
            "yoga classes Jhabua, yoga near me, power yoga, prenatal yoga, meditation classes, online yoga classes",
        ogImage: "/images/og-image.jpg",
    },

    /* ---------------- Brand colours ----------------
     * Override any colour token here; the whole site updates.
     * brand-* = main green family, accent = terracotta highlights.
     */
    theme: {
        "brand-50": "#F3F5EE",
        "brand-100": "#E4EAD9",
        "brand-200": "#CBD6B8",
        "brand-300": "#AFC096",
        "brand-500": "#6E7F4C",
        "brand-600": "#5A6A3C",
        "brand-700": "#4A5832",
        "brand-800": "#3A4628",
        "brand-900": "#262E1B",
        accent: "#C4815F",
        "accent-dark": "#A1613F",
        "accent-soft": "#F4E4D8",
        cream: "#F9F6EF",
        sand: "#F1EADD",
        ink: "#23271C",
        muted: "#5F6455",
    },

    /* ---------------- Top announcement bar ---------------- */
    announcement: {
        enabled: true,
        text: "🌿 New batches starting this month — your first class is FREE.",
        ctaText: "Claim free trial",
    },

    /* ---------------- Hero ---------------- */
    hero: {
        eyebrow: "Certified Yoga Studio in Jhabua",
        titleLines: ["Transform Your Body,"],
        titleHighlight: "Calm Your Mind.",
        subtitle:
            "Authentic, personally guided yoga for every age and level. Build strength, flexibility and inner peace — in our studio or live online from home.",
        primaryCta: "Book Your Free Trial",
        secondaryCta: "Chat on WhatsApp",
        highlights: ["First class free", "All levels welcome", "Online & offline"],
        // image: unsplash("1575052814086-f385e2e2ad1b", 1000, 1250),
        image: "/images/hero.jpeg",
        imageAlt: "Yoga practice at AdiYogi studio",
        nextBatchLabel: "Next batch starts",
        nextBatchValue: "Monday · 6:00 AM",
    },

    /* ---------------- Google rating badge ----------------
     * Turn on once you have real Google reviews — shows a trust badge in the hero & reviews.
     */
    googleRating: {
        enabled: false,
        value: 4.9,
        count: "50+",
        reviewsUrl: "",
    },

    /* ---------------- Stats (animated counters) ---------------- */
    stats: [
        { value: 200, suffix: "+", label: "Happy Students" },
        { value: 5, suffix: "+", label: "Years of Experience" },
        { value: 100, suffix: "+", label: "Sessions Conducted" },
        { value: 6, suffix: "", label: "Specialised Programs" },
    ],

    /* ---------------- Instructor ---------------- */
    instructor: {
        name: "Aditi Kothari",
        role: "Founder & Lead Instructor",
        image: "/images/instructor-real.jpeg",
        experience: "5+ Years Experience",
        description:
            "Helping students achieve physical strength, mental clarity, and holistic wellness through traditional and modern yoga practices.",
        quote: "Yoga is not about touching your toes — it's about what you learn on the way down.",
        qualifications: [
            "Certified Yoga Instructor",
            "Diploma in Yogic Science",
            "Prenatal Yoga Specialist",
        ],
    },

    /* ---------------- Benefits ---------------- */
    benefits: {
        enabled: true,
        eyebrow: "Benefits",
        title: "What Regular Practice Does for You",
        subtitle: "Small, consistent sessions create lasting change — in your body and your mind.",
        items: [
            { icon: "Brain", title: "Reduce Stress", description: "Calm your nervous system and improve emotional wellbeing." },
            { icon: "Moon", title: "Better Sleep", description: "Fall asleep faster and wake up feeling truly rested." },
            { icon: "Sparkles", title: "Mental Clarity", description: "Sharpen focus and concentration for work and life." },
            { icon: "Activity", title: "Flexibility & Mobility", description: "Ease stiffness, improve posture and move freely." },
            { icon: "Flame", title: "Weight Management", description: "Build strength and burn calories the mindful way." },
            { icon: "HeartPulse", title: "Heart Health", description: "Improve circulation, breathing and overall vitality." },
        ],
    },

    /* ---------------- Classes ---------------- */
    classes: [
        {
            title: "Hatha Yoga",
            description: "Perfect for beginners seeking balance and flexibility.",
            level: "Beginner",
            duration: "60 min",
            mode: "Studio & Online",
            image: unsplash("1552196563-55cd4e45efb3", 800, 600),
        },
        {
            title: "Power Yoga",
            description: "Build strength and support weight management.",
            level: "Intermediate",
            duration: "60 min",
            mode: "Studio & Online",
            image: unsplash("1599447421416-3414500d18a5", 800, 600),
        },
        {
            title: "Meditation",
            description: "Improve focus and reduce stress.",
            level: "All Levels",
            duration: "45 min",
            mode: "Studio & Online",
            image: unsplash("1506126613408-eca07ce68773", 800, 600),
        },
        {
            title: "Prenatal Yoga",
            description: "Safe and guided wellness for mothers.",
            level: "Expecting Mothers",
            duration: "45 min",
            mode: "Studio & Online",
            image: unsplash("1510894347713-fc3ed6fdf539", 800, 600),
        },
        {
            title: "Senior Yoga",
            description: "Gentle sessions designed for seniors.",
            level: "Gentle",
            duration: "45 min",
            mode: "Studio",
            image: unsplash("1591228127791-8e2eaef098d3", 800, 600),
        },
        {
            title: "Kids Yoga",
            description: "Fun and engaging yoga for children.",
            level: "Ages 6–14",
            duration: "45 min",
            mode: "Studio",
            image: unsplash("1588286840104-8957b019727f", 800, 600),
        },
    ],

    /* ---------------- Why choose us ---------------- */
    whyChooseUs: {
        enabled: true,
        eyebrow: "Why AdiYogi",
        title: "Experience the Difference of Personal Guidance",
        subtitle:
            "We keep batches small so every student gets real attention, safe alignment and a practice that grows with them.",
        image: unsplash("1593811167562-9cef47bfc4d7", 900, 1100),
        features: [
            { icon: "UserCheck", title: "Personalized Attention", description: "Corrections and modifications tailored to your body." },
            { icon: "Users", title: "Small Batch Sizes", description: "A calm, focused space — never a crowded hall." },
            { icon: "ShieldCheck", title: "Certified Instructor", description: "Safe, structured sessions rooted in yogic science." },
            { icon: "Clock", title: "Flexible Timings", description: "Morning and evening batches to fit your routine." },
            { icon: "Leaf", title: "Traditional + Modern", description: "Classical asanas blended with modern wellness." },
            { icon: "Laptop", title: "Online & Offline", description: "Join at the studio or live from your living room." },
        ],
    },

    /* ---------------- How it works ---------------- */
    process: {
        enabled: true,
        eyebrow: "How It Works",
        title: "Start in Three Simple Steps",
        steps: [
            { icon: "CalendarCheck", title: "Book a Free Trial", description: "Fill a 30-second form or message us on WhatsApp." },
            { icon: "Flower2", title: "Attend Your First Class", description: "Meet your instructor and experience a session — no commitment." },
            { icon: "Sunrise", title: "Begin Your Transformation", description: "Pick the batch that suits you and feel the change within weeks." },
        ],
    },

    /* ---------------- Schedule (batches) ---------------- */
    schedule: {
        enabled: true,
        eyebrow: "Schedule & Plans",
        title: "Find a Batch That Fits Your Day",
        subtitle: "Morning batches, six days a week. Join in person or live online.",
        batches: [
            { name: "Early Morning", time: "6:00 – 7:00 AM", days: "Mon – Sat", mode: "Studio", note: "Few seats left" },
            { name: "Morning", time: "7:00 – 8:00 AM", days: "Mon – Sat", mode: "Studio", note: "Popular"},
            { name: "Morning", time: "8:00 – 9:00 AM", days: "Mon – Sat", mode: "Studio" },
            // { name: "Late Evening", time: "7:00 – 8:00 PM", days: "Mon – Sat", mode: "Online", note: "Popular" },
        ],
    },

    /* ---------------- Pricing ----------------
     * ⚠️ Update prices before going live, or set enabled: false to hide.
     */
    pricing: {
        enabled: true,
        note: "No hidden charges. Pause anytime with prior notice.",
        plans: [
            {
                name: "Free Trial",
                price: "₹0",
                period: "first class",
                description: "Experience a full session before you decide.",
                features: ["1 complete session", "Meet your instructor", "Personal goal discussion"],
                cta: "Book Free Trial",
            },
            {
                name: "Monthly",
                price: "₹1,500",
                period: "/ month",
                description: "Ideal to build a steady, consistent practice.",
                features: ["Unlimited classes in your batch", "Studio or online", "Progress check-ins", "WhatsApp support"],
                cta: "Start Monthly Plan",
                popular: true,
            },
            {
                name: "Quarterly",
                price: "₹4,300",
                period: "/ 3 months",
                description: "Best value for lasting transformation.",
                features: ["Everything in Monthly", "Save 10%", "Personalised diet tips", "Switch batches freely"],
                cta: "Choose Quarterly",
            },
        ],
    },

    /* ---------------- Testimonials ----------------
     * `image` is optional — initials are shown when it is empty.
     */
    testimonials: [
        {
            name: "Priya Sharma",
            review: "The sessions completely transformed my lifestyle. I feel healthier and calmer.",
            rating: 5,
            image: "",
        },
        {
            name: "Rahul Verma",
            review: "I lost weight and improved my flexibility within a few months.",
            rating: 5,
            image: "",
        },
        {
            name: "Sneha Gupta",
            review: "The instructor is patient, knowledgeable, and truly inspiring.",
            rating: 5,
            image: "",
        },
    ],

    /* ---------------- Gallery ---------------- */
    gallery: [
        { title: "Group Practice", image: "/images/studio/group.jpeg" },
        { title: "Strength & Flexibility", image: "images/studio/strech-flexiblity.jpeg" },
        { title: "Balance & Focus", image: "images/studio/balance-focus.jpeg" },
        { title: "Studio Session", image: "images/studio/studio-session.jpeg" },
        { title: "Meditation", image: "/images/instructor-real.jpeg" },
        { title: "Mindful Movement", image: "images/studio/mindful-movement.jpeg" },
        { title: "Sunrise Flow", image: "images/studio/sunrise-flow.jpeg" },
        { title: "Wellness Journey", image: "images/studio/wellness.jpeg" },
    ],

    /* ---------------- FAQs ---------------- */
    faqs: [
        {
            question: "Is yoga suitable for beginners?",
            answer: "Absolutely. Our classes are designed for all levels, and beginners receive step-by-step guidance to build confidence and consistency.",
        },
        {
            question: "Is the first class really free?",
            answer: "Yes. Your first session is completely free with no obligation — it helps you experience our teaching style and pick the right batch.",
        },
        {
            question: "Do you offer online classes?",
            answer: "Yes. We provide both online and offline sessions, allowing you to practice from the comfort of your home.",
        },
        {
            question: "What should I bring to class?",
            answer: "Wear comfortable clothing and bring a yoga mat. Water and a small towel are also recommended.",
        },
        {
            question: "Can senior citizens join?",
            answer: "Yes. We offer gentle yoga sessions tailored specifically for seniors with a focus on mobility, balance, and overall wellness.",
        },
        {
            question: "How often should I attend yoga classes?",
            answer: "Practicing 3–5 times a week is ideal for noticeable improvements, but even two sessions per week can provide benefits.",
        },
    ],

    /* ---------------- Final call-to-action ---------------- */
    cta: {
        title: "Your Healthiest Self Starts With One Class",
        subtitle:
            "Expert guidance, personal attention and a supportive community. Book a free trial today — seats in each batch are limited.",
        image: unsplash("1544367567-0f2fcb009e0b", 1600),
    },

    /* ---------------- Lead capture ----------------
     * Every enquiry opens WhatsApp with the details pre-filled.
     * Optionally ALSO save leads to a sheet/inbox by pasting a form endpoint:
     *   • Formspree:  https://formspree.io/f/xxxxxx
     *   • Google Sheets (Apps Script web app URL)
     *   • Web3Forms:  https://api.web3forms.com/submit  (+ extraFields: { access_key: "…" })
     */
    leadCapture: {
        endpoint: "",
        extraFields: {},
        openWhatsApp: true,
        modes: ["Studio (Offline)", "Live Online"],
        formTitle: "Book Your Free Trial Class",
        formSubtitle: "Share your details and we'll confirm your slot on WhatsApp within a few hours.",
        submitText: "Book My Free Trial",
        successTitle: "You're almost in!",
        successMessage: "We've opened WhatsApp with your details — just hit send and we'll confirm your free class.",
        privacyNote: "We respect your privacy. No spam, ever.",
    },

    /* ---------------- Lead popup ----------------
     * Shown once per visit after a delay, or when a desktop visitor is about to leave.
     */
    popup: {
        enabled: true,
        delaySeconds: 25,
        onExitIntent: true,
        badge: "Limited seats this month",
        title: "Your First Yoga Class Is On Us",
        subtitle: "Claim a free trial session — no payment, no commitment.",
        image: unsplash("1506126613408-eca07ce68773", 700, 900),
    },

    /* ---------------- Analytics (optional) ----------------
     * Paste IDs to track leads as conversions. Leave empty to disable.
     */
    analytics: {
        googleAnalyticsId: "", // e.g. "G-XXXXXXXXXX"
        metaPixelId: "", // e.g. "1234567890"
    },

    socialLinks: {
        instagram: "https://www.instagram.com/adiyogi_08_/",
        facebook: "https://www.instagram.com/adiyogi_08_/",
        youtube: "https://www.instagram.com/adiyogi_08_/",
    },

    footerAbout:
        "Helping people transform their lives through yoga, mindfulness, and holistic wellness — one breath at a time.",

    designer: {
        name: "Raghav Maheshwari",
        website: "https://raghav-maheshwari-21-raghav-portfol.vercel.app/",
    },
};
