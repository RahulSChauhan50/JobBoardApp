import React from "react";
import "./jobCard.scss";

import { useSelector } from "react-redux";

function JobCard() {
  const jdList = useSelector((state) => state.JobCardReducer.jdList);
  const jdLoading = useSelector((state) => state.JobCardReducer.jdLoading);

  return <div>JobCard</div>;
}

export default JobCard;
