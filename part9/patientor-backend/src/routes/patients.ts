import express from "express";
import { getPatients, addPatient } from "../services/patientServices";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(getPatients());
});

router.post('/', (req, res) => {
    try {
      const newPatientEntry = toNewPatientEntry(req.body);
  
      const addedPatient = patientServices.addPatient(newPatientEntry);
      res.json(addedPatient);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });
  
export default router;