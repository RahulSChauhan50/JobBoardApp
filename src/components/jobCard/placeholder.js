import { Skeleton } from "@mui/material";
import React from "react";

function Placeholder() {
  return (
    <div className="job-card-container">
      <div className="posted-info">
        <Skeleton variant="rounded" width={100} height={10} />
      </div>
      <div className="company-info-header">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="company-info">
          <div className="name">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className="role">
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className="location">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        </div>
      </div>
      <div className="salary-range">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </div>
      <div className="about-company">
        <div className="title">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
        <div className="description">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </div>
      <div className="experience-section">
        <div className="title">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
        <div className="value">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </div>
      <div className="job-actions">
        <a className="easy-apply">
          <Skeleton variant="rounded" />
        </a>
        <a className="referral">
          <Skeleton variant="rounded" />
        </a>
      </div>
    </div>
  );
}

export default Placeholder;
