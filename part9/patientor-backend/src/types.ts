export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male= "male",
  Female= "female",
  Other= "other",
}
export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[];
}


export type SafePatient = Omit<PatientEntry, "ssn">;

export type NewPatientEntry = Omit<PatientEntry, "id">;

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: { date: string; criteria: string };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;