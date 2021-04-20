import { NewPatientEntry, Gender, Entry } from './types';

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

const parseEntries = (entries: any): Entry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!entries || entries.map((en: unknown) => isEntry(en))) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries as Entry[];
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientEntry => {

  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries) || []
  };

  return newEntry;
};

export default toNewPatientEntry;



