import express from "express";
import { getPatients, addPatient, getPatientById, addEntry } from "../services/patientServices";
import toNewPatientEntry, {toNewEntry} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  const patient = getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = getPatientById(req.params.id);

    const confEntry = toNewEntry(req.body);

    if (patient && confEntry) {
      const newEntry = addEntry(patient, confEntry);
      res.json(newEntry);
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;