import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";


const Diagnoses =  ({ entry }: {entry: Entry}) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <ul>
      {entry.diagnosisCodes?.map((diagnosisCode: string, i: number) => {
        const diagnose = diagnosis?.filter(
          (diagnosis) => diagnosis.code === diagnosisCode
        );
        return (
          <li key={`${entry.id}-${i}`}>
            <span>{diagnosisCode}</span>{" "}
            <span>{diagnose?.length > 0 && diagnose[0].name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Diagnoses;