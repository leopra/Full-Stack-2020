import patientEntries from "../../data/patients";
import { PatientEntry, PublicPatient, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientEntries;

export const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();

  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export const getPatientById = (id: string): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};
