import { Router } from "express";

export const apiRoute = Router();

apiRoute.get("/api", (_req, res) => res.send("<h1>API Route hit</h1>"));

export default apiRoute;
