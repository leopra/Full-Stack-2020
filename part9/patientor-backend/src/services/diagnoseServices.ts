import diagnoseEntries from "../../data/diagnoses";

import { DiagnoseEntry } from "../types";

const diagnoses: Array<DiagnoseEntry> = diagnoseEntries; 

export const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

//export default getDiagnoses;
