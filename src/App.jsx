import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import LeadModalProvider from "./context/LeadModalProvider";
import Home from "./pages/Home";

export default function App() {
    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
                <LeadModalProvider>
                    <Home />
                </LeadModalProvider>
            </MotionConfig>
        </LazyMotion>
    );
}
