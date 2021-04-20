import diagnoseEntries from "../../data/diagnoses";

import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnoseEntries; 

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

//export default getDiagnoses;
