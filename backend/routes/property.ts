import { Router } from "express";
import PropertyController from "../controllers/property";
const router = Router();

router.get("/properties", PropertyController.getAllProperties);
router.post("/properties", PropertyController.createProperty);

export default router;
