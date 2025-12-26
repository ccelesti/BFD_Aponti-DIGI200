import { Router } from "express";
import { healthCheck } from "../controllers";

const router = Router();

router.get("/healthcheck", healthCheck);

export default router;