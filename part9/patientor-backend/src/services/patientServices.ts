import patientEntries from "../../data/patients";
import { PatientEntry, SafePatient } from "../types";

const patients: Array<PatientEntry> = patientEntries;

export const getPatients = (): SafePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

