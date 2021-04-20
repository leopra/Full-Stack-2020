export interface DiagnoseEntry {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;