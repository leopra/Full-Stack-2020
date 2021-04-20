import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT_INFO";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_INFO";
    payload: Diagnosis[];
  };

export const setDiagnosisInfo = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_INFO",
    payload: diagnosis,
  };
};


export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const setPatientInfo = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_INFO",
    payload: patient,
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_INFO":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_INFO":
      return {
        ...state,
        diagnosis: action.payload
      };

    default:
      return state;
  }
};
