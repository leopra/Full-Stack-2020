import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientInfo, updatePatient } from "../state";
import Axios from "axios";
import { Patient, Entry, NewEntry } from "../types";
import EntryInfo from "./EntryInfo";
import { Button } from "semantic-ui-react";

import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const SinglePatientPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  if (!patient) return null;

  const submitNewEntry = async (values: NewEntry) => {

    try {
      const resultPatient = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(resultPatient.data));
      dispatch(setPatientInfo(resultPatient.data));

      console.log(resultPatient.data);
      closeModal();
    } catch (e) {
      console.error(e.response?.data);

      if (e.response?.status >= 400 && e.response?.status < 500) {
        setError(e.response?.data.error);
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add New Entry</Button>
      <h3>Entries</h3>
      {patient?.entries?.map((entry: Entry) => (
        <EntryInfo key={entry.id} entry={entry} />
      ))}

    </section>
  );
};

export default SinglePatientPage;