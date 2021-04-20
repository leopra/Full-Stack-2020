import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (<p>
        {coursePart.name} {coursePart.exerciseCount} {coursePart.description}
      </p>);
    case "groupProject":
      return (<p>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</p>);
    case "submission":
      return (<p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}
      </p>);
    case "special":
      return (<p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} requiredskills:{" "}{coursePart.requirements.toString()} </p>);
    default:
      return assertNever(coursePart);
  }
};

export default Part;

