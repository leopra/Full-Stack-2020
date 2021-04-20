import React from "react";
import { Segment, Icon } from "semantic-ui-react";
import { HospitalEntry } from "../types";

import Diagnoses from "./Diagnoses";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Segment>
      <div>
        <p>{entry.date}</p>
        <span>
          <Icon name="hospital" size="large" />
        </span>
      </div>

      <p>{entry.description}</p>

      {entry.diagnosisCodes && <Diagnoses entry={entry} />}

      {entry.discharge && (
        <div>
          <span>Discharge:</span>{" "}
          <span>{entry.discharge.criteria}</span>{" "}
          <span>{entry.discharge.date}</span>
        </div>
      )}
    </Segment>
  );
};

export default Hospital;