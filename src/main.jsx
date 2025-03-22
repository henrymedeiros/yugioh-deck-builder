import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SelectedCardProvider } from "./contexts/SelectedCardContext";
import { DecksProvider } from "./contexts/DecksContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <DecksProvider>
            <SelectedCardProvider>
                <App />
            </SelectedCardProvider>
        </DecksProvider>
    </React.StrictMode>
);
