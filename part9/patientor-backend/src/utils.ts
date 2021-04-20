import {
  NewPatientEntry,
  Gender,
  Entry,
  NewEntry,
  HealthCheckRating,
  BaseEntry,
  Discharge,
  SickLeave,
  Diagnosis,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (stringa: unknown): string => {
  if (!stringa || !isString(stringa)) {
    throw new Error('Incorrect or missing comment');
  }

  return stringa;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isEntry = (entry: any): entry is Entry => {
  const possibleVal = ["Hospital", "HealthCheck", "OccupationalHealthcare"];
  return possibleVal.includes(entry.type);
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: []
  };

  return newEntry;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isEntry(entry)) {
    throw new Error("Incorrect or missing entry type: " + entry);
  }
  return entry;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }

  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing description: " + specialist);
  }

  return specialist;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === "undefined" ||
    rating === null ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employername");
  }
  return name;
};


const parseDischarge = (discharge: any): Discharge => {
  if (!discharge) throw new Error("Missing discharge");

  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria),
  };
};

const parseDiagnosisCode = (diagnosisCode: any): Array<Diagnosis["code"]> => {
  if (!diagnosisCode) throw new Error("Missing diagnosis");

  if (!Array.isArray(diagnosisCode)) {
    throw new Error("Incorrect diagnosisCode");
  }

  const validDiagnosisCodes = diagnosisCode.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return diagnosisCode as Array<Diagnosis["code"]>;
  } else {
    throw new Error("Incorrect diagnosisCode");
  }
};


const parseSickLeave = (sickleave: any): SickLeave => {
  if (!sickleave) throw new Error("Missing sick leave");

  return {
    startDate: parseDate(sickleave.startDate),
    endDate: parseDate(sickleave.endDate),
  };
};

export const toNewEntry = (newEntry: unknown): NewEntry => {
  const validEntry = parseEntry(newEntry);
  if (!validEntry) throw new Error("Entry has not correct type");

  const entry: Omit<BaseEntry, "id"> = {
    date: parseDate(validEntry.date),
    description: parseDescription(validEntry.description),
    specialist: parseSpecialist(validEntry.specialist),
    diagnosisCodes: parseDiagnosisCode(validEntry.diagnosisCodes),
  };

  switch (validEntry.type) {
    case "Hospital":
      return {
        ...entry,
        type: validEntry.type,
        discharge: parseDischarge(validEntry.discharge),
      };
    case "HealthCheck":
      return {
        ...entry,
        type: validEntry.type,
        healthCheckRating: parseHealthCheckRating(
          validEntry.healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        type: validEntry.type,
        employerName: parseEmployerName(validEntry.employerName),
        sickLeave: parseSickLeave(validEntry.sickLeave),
      };
    default:
      return assertNever(validEntry);
  }
};

// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewPatientEntry;



