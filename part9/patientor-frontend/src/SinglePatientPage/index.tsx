import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientInfo } from "../state";
import Axios from "axios";
import { Patient, Entry } from "../types";
import EntryInfo from "./EntryInfo";

const SinglePatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await Axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatientInfo(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
     void getPatientDetails();
    }
  }, [patient, id, dispatch]);

  return (
    <section>
      <div>
        <h2>{patient?.name}</h2> {patient?.gender}
      </div>
      <div>
        <span>ssn:</span> <span>{patient?.ssn}</span>
      </div>
      <div>
        <span>occupation:</span> <span>{patient?.occupation}</span>
      </div>
      <h3>Entries</h3>
      {patient?.entries?.map((entry: Entry) => (
        <EntryInfo key={entry.id} entry={entry} />
      ))}
    </section>
  );
};

export default SinglePatientPage;