import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/global.css";
import App from "@components/providers/app";
import AuthProvider from "@components/providers/auth";

const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);

    root.render(
        <StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </StrictMode>
    );
}
