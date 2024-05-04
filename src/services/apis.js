import { setRemoteFilter, setRolesFilter } from "../redux/jobBoard";
import { setJdList, setJdLoading, setTotalCount } from "../redux/jobCard";
import { URLS } from "./urls";

export const getJobList = ({ limit, offset }) => {
  return async (dispatch, getState) => {
    const jdList = getState().JobCardReducer.jdList;
    const totalCount = getState().JobCardReducer.totalCount;
    if (offset >= totalCount && totalCount > 0) return;

    dispatch(setJdLoading(true));
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(URLS.getJobList, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        const newJdList = [...structuredClone(jdList), ...res.jdList];
        dispatch(setJdList(newJdList));
        dispatch(setTotalCount(res.totalCount));

        let availableRoles = new Set();
        let availableLocations = new Set();
        newJdList.forEach((item) => {
          availableRoles.add(item.jobRole);
          availableLocations.add(item.location);
        });
        dispatch(setRolesFilter(Array.from(availableRoles)));
        dispatch(setRemoteFilter(Array.from(availableLocations)));
      })
      .catch((err) => {
        console.log("error in job list", err);
      })
      .finally(() => {
        dispatch(setJdLoading(false));
      });
  };
};
