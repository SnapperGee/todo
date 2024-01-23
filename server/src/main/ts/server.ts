import { apiRoute } from "./route/index.js";
import { resolve as resolvePath } from "node:path";
import express from "express";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoute);

if (process.env.NODE_ENV === "production")
{
    const REACT_DIR = resolvePath("..", "client", "dist");
    const REACT_INDEX_HTML = resolvePath(REACT_DIR, "index.html");

    app.use(express.static(REACT_DIR));
    app.get("*", (_req, res) => res.sendFile(REACT_INDEX_HTML));
}

export default app;
