import React from "react";
import { Entry } from "../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";
import { assertNever } from "../utils";


const EntryDetails = ({ entry }: {entry: Entry }) => {
  const entryComponent = () => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        assertNever(entry);
    }
  };

  return <React.Fragment>{entryComponent()}</React.Fragment>;
};

export default EntryDetails;