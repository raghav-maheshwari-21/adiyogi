import { createContext, useContext } from "react";

export const LeadModalContext = createContext({ openLeadModal: () => {} });

/** openLeadModal({ source, interest }) opens the free-trial form anywhere on the page. */
export const useLeadModal = () => useContext(LeadModalContext);
