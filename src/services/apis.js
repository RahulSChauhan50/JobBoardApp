import { setJdList, setJdLoading, setTotalCount } from "../redux/jobCard";
import { URLS } from "./urls";

export const getJobList = ({ limit, offset }) => {
  return async (dispatch, getState) => {
    const jdList = getState().JobCardReducer.jdList;
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
        console.log(res);
        const newJdList = [...structuredClone(jdList), ...res.jdList];
        dispatch(setJdList(newJdList));
        dispatch(setTotalCount(res.totalCount));
      })
      .catch((err) => {
        console.log("error in job list", err);
      })
      .finally(() => {
        dispatch(setJdLoading(false));
      });
  };
};
