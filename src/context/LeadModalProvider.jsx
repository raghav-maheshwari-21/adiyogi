import { useCallback, useMemo, useState } from "react";
import { LeadModalContext } from "./leadContext";
import LeadModal from "../components/common/LeadModal";
import { trackEvent } from "../lib/utils";

export default function LeadModalProvider({ children }) {
    const [state, setState] = useState({ open: false, source: "", interest: "", variant: "default" });

    const openLeadModal = useCallback((opts = {}) => {
        const source = opts.source || "cta";
        setState({ open: true, source, interest: opts.interest || "", variant: opts.variant || "default" });
        trackEvent("open_lead_form", { source });
    }, []);

    const closeLeadModal = useCallback(() => setState((s) => ({ ...s, open: false })), []);

    const value = useMemo(
        () => ({ openLeadModal, closeLeadModal, isOpen: state.open }),
        [openLeadModal, closeLeadModal, state.open]
    );

    return (
        <LeadModalContext.Provider value={value}>
            {children}
            <LeadModal {...state} onClose={closeLeadModal} />
        </LeadModalContext.Provider>
    );
}
