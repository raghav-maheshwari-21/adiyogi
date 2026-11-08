import { useId, useState } from "react";
import clsx from "clsx";
import { ArrowRight, ChevronDown, CircleCheck, Lock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "../../config/siteConfig";
import { openExternal, storage, trackEvent, whatsappLink } from "../../lib/utils";

const lc = siteConfig.leadCapture;
const Select = (props) => (
    <div className="relative">
        <select {...props} />
        <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
    </div>
);

const NOT_SURE = "Not sure — help me choose";

/** Accepts 10-digit Indian mobiles (with optional +91/0) or international numbers. */
const normalizePhone = (raw) => {
    const trimmed = raw.trim();
    let digits = trimmed.replace(/\D/g, "");
    if (trimmed.startsWith("+") && !trimmed.startsWith("+91")) {
        return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
    }
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
    return /^[6-9]\d{9}$/.test(digits) ? digits : null;
};

const sendToEndpoint = (data) => {
    if (!lc.endpoint) return;
    try {
        fetch(lc.endpoint, {
            method: "POST",
            mode: "no-cors",
            keepalive: true,
            body: new URLSearchParams({ ...data, ...lc.extraFields }),
        }).catch(() => {});
    } catch {
        /* network issues must never block the WhatsApp hand-off */
    }
};

export default function LeadForm({ compact = false, defaultInterest = "", source = "form", onSuccess }) {
    const uid = useId();
    const classOptions = siteConfig.classes.map((c) => c.title);
    const interestOptions = [
        ...(defaultInterest && !classOptions.includes(defaultInterest) ? [defaultInterest] : []),
        ...classOptions,
        NOT_SURE,
    ];
    const batchOptions = siteConfig.schedule?.batches?.map((b) => `${b.name} (${b.time})`) || [];

    const [form, setForm] = useState({
        name: "",
        phone: "",
        interest: defaultInterest || "",
        batch: "",
        mode: lc.modes?.[0] || "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(null);

    const update = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const next = {};
        const phone = normalizePhone(form.phone);
        if (form.name.trim().length < 2) next.name = "Please enter your name";
        if (!phone) next.phone = "Please enter a valid mobile number";
        setErrors(next);
        if (Object.keys(next).length) return;

        const lines = [
            `*Name:* ${form.name.trim()}`,
            `*Phone:* ${phone}`,
            form.interest && `*Interested in:* ${form.interest}`,
            form.batch && `*Preferred batch:* ${form.batch}`,
            form.mode && `*Mode:* ${form.mode}`,
            form.message.trim() && `*Message:* ${form.message.trim()}`,
        ].filter(Boolean);
        const intro = `Namaste 🙏 I'd like to book a free trial class at ${siteConfig.businessName}.`;
        const waUrl = whatsappLink(`${intro}\n\n${lines.join("\n")}`);

        sendToEndpoint({
            name: form.name.trim(),
            phone,
            interest: form.interest,
            batch: form.batch,
            mode: form.mode,
            message: form.message.trim(),
            source,
            page: window.location.href,
            submittedAt: new Date().toISOString(),
        });

        trackEvent("generate_lead", { source, interest: form.interest || "unspecified" });
        storage.set("lead_submitted", "1");

        // Must run synchronously inside the click handler, or popup blockers stop it.
        if (lc.openWhatsApp) openExternal(waUrl);

        setDone({ name: form.name.trim().split(" ")[0], waUrl });
        onSuccess?.();
    };

    if (done) {
        return (
            <div className="py-6 text-center" role="status">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-8 ring-brand-50/50">
                    <CircleCheck size={34} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-3xl font-semibold">
                    {lc.successTitle.replace("!", `, ${done.name}!`)}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-muted">{lc.successMessage}</p>
                <a href={done.waUrl} target="_blank" rel="noopener noreferrer" className="btn mt-7 bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                    <FaWhatsapp size={20} aria-hidden="true" /> Open WhatsApp again
                </a>
                <button type="button" onClick={() => setDone(null)} className="mt-4 block w-full text-sm font-semibold text-muted underline-offset-4 hover:underline">
                    Submit another enquiry
                </button>
            </div>
        );
    }

    const id = (k) => `${uid}-${k}`;

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className={clsx("grid gap-4", !compact && "sm:grid-cols-2")}>
                <div>
                    <label htmlFor={id("name")} className="label">Your name *</label>
                    <input
                        id={id("name")}
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Priya Sharma"
                        value={form.name}
                        onChange={update("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? id("name-err") : undefined}
                        className="field"
                    />
                    {errors.name && <p id={id("name-err")} className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor={id("phone")} className="label">Mobile / WhatsApp number *</label>
                    <input
                        id={id("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={update("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? id("phone-err") : undefined}
                        className="field"
                    />
                    {errors.phone && <p id={id("phone-err")} className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor={id("interest")} className="label">I'm interested in</label>
                    <Select id={id("interest")} value={form.interest} onChange={update("interest")} className="field appearance-none pr-10">
                        <option value="">Select a class</option>
                        {interestOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </Select>
                </div>
                {batchOptions.length > 0 && (
                    <div>
                        <label htmlFor={id("batch")} className="label">Preferred batch</label>
                        <Select id={id("batch")} value={form.batch} onChange={update("batch")} className="field appearance-none pr-10">
                            <option value="">Any time works</option>
                            {batchOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </Select>
                    </div>
                )}
            </div>

            {lc.modes?.length > 0 && (
                <fieldset>
                    <legend className="label">How would you like to join?</legend>
                    <div className="grid grid-cols-2 gap-3">
                        {lc.modes.map((mode) => (
                            <label
                                key={mode}
                                className={clsx(
                                    "flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center text-sm font-semibold transition-colors",
                                    form.mode === mode
                                        ? "border-brand-700 bg-brand-50 text-brand-900"
                                        : "border-brand-900/10 bg-white text-muted hover:border-brand-300"
                                )}
                            >
                                <input type="radio" name={id("mode")} value={mode} checked={form.mode === mode} onChange={update("mode")} className="sr-only" />
                                {mode}
                            </label>
                        ))}
                    </div>
                </fieldset>
            )}

            {!compact && (
                <div>
                    <label htmlFor={id("message")} className="label">Anything we should know? <span className="font-normal text-muted">(optional)</span></label>
                    <textarea
                        id={id("message")}
                        rows={3}
                        placeholder="Goals, health conditions, questions…"
                        value={form.message}
                        onChange={update("message")}
                        className="field resize-none"
                    />
                </div>
            )}

            <button type="submit" className="btn-accent w-full py-4 text-base">
                {lc.submitText} <ArrowRight size={18} aria-hidden="true" />
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
                <Lock size={12} aria-hidden="true" /> {lc.privacyNote}
            </p>
        </form>
    );
}
