import React, { useEffect, useMemo, useRef, useState } from "react";
import "./jobBoard.scss";

import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { baseSalary, experience, numberOfEmployee } from "../../global/values";
import {
  setCompanyName,
  setExperienceFilter,
  setMinimumSalaryFilter,
  setNumberofEmployessFilter,
} from "../../redux/jobBoard";
import { getJobList } from "../../services/apis";
import JobCard from "../jobCard/jobCard";

function JobBoard() {
  const [offset, setOffset] = useState(0);
  const [role, setRole] = useState([]);
  const [location, setLocation] = useState([]);
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const jdList = useSelector((state) => state.JobCardReducer.jdList);
  const rolesFilter = useSelector((state) => state.JobBoardReducer.rolesFilter);
  const numberofEmployessFilter = useSelector(
    (state) => state.JobBoardReducer.numberofEmployessFilter
  );
  const experienceFilter = useSelector(
    (state) => state.JobBoardReducer.experienceFilter
  );
  const remoteFilter = useSelector(
    (state) => state.JobBoardReducer.remoteFilter
  );
  const minimumSalaryFilter = useSelector(
    (state) => state.JobBoardReducer.minimumSalaryFilter
  );
  const companyName = useSelector((state) => state.JobBoardReducer.companyName);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        if (scrollTop + clientHeight + 20 >= scrollHeight) {
          setOffset((prev) => prev + 10);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const filteredList = useMemo(() => {
    let tmpJdList = structuredClone(jdList);
    if (role.length) {
      tmpJdList = tmpJdList.filter((item) => role.includes(item.jobRole));
    }
    if (location.length) {
      tmpJdList = tmpJdList.filter((item) => location.includes(item.location));
    }
    if (minimumSalaryFilter.length) {
      tmpJdList = tmpJdList.filter(
        (item) =>
          (item?.minJdSalary ?? -Infinity) <= minimumSalaryFilter[0] &&
          (item?.maxJdSalary ?? Infinity) >= minimumSalaryFilter[1]
      );
    }
    if (companyName) {
      tmpJdList = tmpJdList.filter((item) =>
        item.companyName.toLowerCase().includes(companyName.toLowerCase())
      );
    }
    if (experienceFilter.length) {
      tmpJdList = tmpJdList.filter(
        (item) =>
          (item?.minExp ?? -Infinity) <= experienceFilter[0] &&
          (item?.maxExp ?? Infinity) >= experienceFilter[1]
      );
    }
    return tmpJdList;
  }, [
    role,
    numberofEmployessFilter,
    experienceFilter,
    location,
    minimumSalaryFilter,
    companyName,
    jdList,
  ]);

  useEffect(() => {
    dispatch(getJobList({ limit: 10, offset }));
  }, [offset]);

  return (
    <div className="jobboard-container" ref={scrollContainerRef}>
      <div className="filter-container">
        <Autocomplete
          className="filter-input"
          disablePortal
          options={rolesFilter}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Roles" />}
          value={role}
          onChange={(e, value) => {
            if (!value) {
              setRole([]);
              return;
            }
            if (role.includes(value)) {
              setRole(role.filter((item) => item !== value));
            } else {
              setRole([...role, value]);
            }
          }}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={numberOfEmployee}
          sx={{ width: 300 }}
          value={numberofEmployessFilter}
          renderInput={(params) => (
            <TextField {...params} label="Number Of Employees" />
          )}
          onChange={(e, value) => {
            if (value) {
              dispatch(setNumberofEmployessFilter(value.value));
            } else {
              dispatch(setNumberofEmployessFilter([]));
            }
          }}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={experience}
          sx={{ width: 300 }}
          value={experienceFilter}
          renderInput={(params) => <TextField {...params} label="Experience" />}
          onChange={(e, value) => {
            if (value) {
              dispatch(setExperienceFilter(value.value));
            } else {
              dispatch(setExperienceFilter([]));
            }
          }}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={remoteFilter}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Remote" />}
          value={location}
          onChange={(e, value) => {
            if (!value) {
              setLocation([]);
              return;
            }
            if (location.includes(value)) {
              setLocation(location.filter((item) => item !== value));
            } else {
              setLocation([...location, value]);
            }
          }}
        />
        <Autocomplete
          className="filter-input"
          disablePortal
          options={baseSalary}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Minimum Base Salary" />
          )}
          value={minimumSalaryFilter}
          onChange={(e, value) => {
            if (value) {
              dispatch(setMinimumSalaryFilter(value.value));
            } else {
              dispatch(setMinimumSalaryFilter([]));
            }
          }}
        />
        <TextField
          label="Search Company Name"
          className="filter-input"
          onChange={(e) => dispatch(setCompanyName(e.target.value))}
          value={companyName}
        />
      </div>
      <div className="job-cards">
        {filteredList.map((item, ind) => (
          <JobCard key={ind} data={item} />
        ))}
      </div>
    </div>
  );
}

export default JobBoard;
