import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FlowProvider } from "./flow.jsx";
import { SCREENS } from "./screens/index.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlowProvider total={SCREENS.length}>
      <App />
    </FlowProvider>
  </React.StrictMode>
);
