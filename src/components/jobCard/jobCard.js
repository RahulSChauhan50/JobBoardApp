import React from "react";
import "./jobCard.scss";

import { FaCheckSquare } from "react-icons/fa";
import { IoHourglassOutline } from "react-icons/io5";
import { MdOutlineElectricBolt } from "react-icons/md";
import { useSelector } from "react-redux";
import Placeholder from "./placeholder";

const currencySymbol = {
  INR: {
    symbol: "₹",
    yearly: "LPA",
  },
  USD: {
    symbol: "$",
    yearly: "LPA",
  },
};

function JobCard({ data }) {
  const jdLoading = useSelector((state) => state.JobCardReducer.jdLoading);

  if (jdLoading) {
    return <Placeholder />;
  }
  return (
    <div className="job-card-container">
      <div className="posted-info">
        <IoHourglassOutline size={15} />
        <div>Posted 10 days ago</div>
      </div>
      <div className="company-info-header">
        <img src={data.logoUrl} alt="company-logo" className="company-logo" />
        <div className="company-info">
          <div className="name">{data.companyName}</div>
          <div className="role"> {data.jobRole}</div>
          <div className="location">{data.location}</div>
        </div>
      </div>
      <div className="salary-range">
        Estimates salary: {currencySymbol[data.salaryCurrencyCode].symbol}
        {data.minJdSalary} - {data.maxJdSalary}{" "}
        {currencySymbol[data.salaryCurrencyCode].yearly}{" "}
        <FaCheckSquare size={15} />
      </div>
      <div className="about-company">
        <div className="title">About company</div>
        <div className="description">{data.jobDetailsFromCompany}</div>
        <div className="blur" />
        <button
          className="view-job"
          onClick={() => {
            window.open(data.jdLink);
          }}
        >
          View job
        </button>
      </div>
      <div className="experience-section">
        <div className="title">Minimum Experience</div>
        <div className="value">{data.minExp} years</div>
      </div>
      <div className="job-actions">
        <a href={data.jdLink} className="easy-apply">
          <MdOutlineElectricBolt size={15} />
          <div>Easy Apply</div>
        </a>
        <a href={data.jdLink} className="referral">
          Unlock referral asks
        </a>
      </div>
    </div>
  );
}

export default JobCard;
