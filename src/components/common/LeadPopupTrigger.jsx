import { useEffect } from "react";
import { siteConfig } from "../../config/siteConfig";
import { useLeadModal } from "../../context/leadContext";
import { storage } from "../../lib/utils";

/**
 * Opens the free-trial offer once per visit — after a delay, or when a
 * desktop visitor moves to close the tab. Never shown to people who already
 * enquired or who already opened the form themselves.
 */
export default function LeadPopupTrigger() {
    const { openLeadModal, isOpen } = useLeadModal();
    const cfg = siteConfig.popup;

    useEffect(() => {
        if (!cfg?.enabled || isOpen) return;
        if (storage.get("lead_submitted") || storage.get("popup_seen", true)) return;

        let fired = false;
        const fire = () => {
            if (fired) return;
            fired = true;
            storage.set("popup_seen", "1", true);
            openLeadModal({ source: "popup", variant: "popup" });
        };

        const timer = setTimeout(fire, Math.max(5, cfg.delaySeconds || 25) * 1000);
        const onLeave = (e) => {
            if (e.clientY <= 0 && !e.relatedTarget) fire();
        };
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        // Give visitors a few seconds before exit-intent can trigger.
        let armTimer;
        if (cfg.onExitIntent && canHover) {
            armTimer = setTimeout(() => document.addEventListener("mouseout", onLeave), 8000);
        }

        return () => {
            clearTimeout(timer);
            clearTimeout(armTimer);
            document.removeEventListener("mouseout", onLeave);
        };
    }, [cfg, isOpen, openLeadModal]);

    // Any manual open counts as "seen" so the popup never interrupts a user mid-form.
    useEffect(() => {
        if (isOpen) storage.set("popup_seen", "1", true);
    }, [isOpen]);

    return null;
}
