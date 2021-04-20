
import React from "react";
import { CourseEntry } from "../types";


const Total = ({courseParts}  : {courseParts : CourseEntry[]}) => {
  return (<p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>)
};

export default Total;
