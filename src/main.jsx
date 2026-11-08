import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyTheme, loadAnalytics } from "./lib/bootstrap";
import "./index.css";

applyTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);

loadAnalytics();
