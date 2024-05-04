import React, { useEffect, useState } from "react";
import "./jobBoard.scss";

import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getJobList } from "../../services/apis";
import JobCard from "../jobCard/jobCard";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

function JobBoard() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.JobCardReducer.totalCount);

  useEffect(() => {
    dispatch(getJobList({ limit, offset }));
  }, []);

  return (
    <div className="jobboard-container">
      <div className="filter-container">
        <Autocomplete
          className="filter-input"
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Roles" />}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Number Of Employees" />
          )}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Experience" />}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Remote" />}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Minimum Base Salary" />
          )}
        />
        <TextField label="Search Company Name" className="filter-input" />
      </div>
      <div className="job-cards">
        <JobCard />
      </div>
    </div>
  );
}

export default JobBoard;
