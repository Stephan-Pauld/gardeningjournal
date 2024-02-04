import React from "react";
import { useParams } from "react-router-dom";

export const SeasonPage = (props) => {
  let { id } = useParams();
  return <div>{id}</div>;
};
