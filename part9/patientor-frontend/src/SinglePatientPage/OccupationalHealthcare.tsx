import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";

import Diagnoses from "./Diagnoses";

const OccupationalHealthcare = ({entry} : {entry: OccupationalHealthcareEntry}) => {
  return (
    <Segment>
      <div>
        <p>{entry.date}</p>
        <span>
          <Icon name="stethoscope" size="large" />
        </span>
        <span>{entry.employerName}</span>
      </div>

      <p>{entry.description}</p>

      {entry.diagnosisCodes && <Diagnoses entry={entry} />}

      {entry.sickLeave && (
        <div>
          <span>From:</span>
          <span>
            {entry.sickLeave.startDate}
          </span>
          <span>To:</span>
          <span>
            {entry.sickLeave.endDate}
          </span>
        </div>
      )}
    </Segment>
  );
};

export default OccupationalHealthcare;