import patientEntries from "../../data/patients";
import { PatientEntry, SafePatient, NewPatientEntry } from "../types";
import {v1 as uuid} from 'uuid';

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

export const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const id : string = uuid();

  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};