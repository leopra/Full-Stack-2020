import express from "express";
import { getPatients } from "../services/patientServices";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(getPatients());
});

export default router;