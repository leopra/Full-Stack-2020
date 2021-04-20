import React from "react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Segment, Icon } from "semantic-ui-react";

import Diagnoses from "./Diagnoses";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const getHealthCheckIcon = () => {
    if (entry.healthCheckRating === HealthCheckRating.Healthy) {
      return <Icon name="heart" size="small" color="green" />;
    } else if (entry.healthCheckRating === HealthCheckRating.LowRisk) {
      return <Icon name="heart" size="small" color="yellow" />;
    } else if (entry.healthCheckRating === HealthCheckRating.HighRisk) {
      return <Icon name="heart" size="small" color="orange" />;
    } else if (entry.healthCheckRating === HealthCheckRating.CriticalRisk) {
      return <Icon name="heart" size="small" color="red" />;
    }
  };
  return (
    <Segment>
      <div>
        <p>{entry.date}</p>
        <span>
          <Icon name="user md" size="large" />
        </span>
      </div>

      <p>{entry.description}</p>

      {entry.diagnosisCodes && <Diagnoses entry={entry} />}

      <div>{getHealthCheckIcon()}</div>
    </Segment>
  );
};

export default HealthCheck;

