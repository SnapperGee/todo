import ReactDOM from "react-dom/client";
import router from "./router";
import "./index.scss";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
