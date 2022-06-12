import Axios from "axios";

export const getProjectList = () => {};

/**
 * storeNewProject()
 *
 * @param {object} data
 */
export const storeNewProject = async (data) => {
  
  return await Axios.post(
    "http://localhost/reactCrude/api/carlists",
    data
  ).then((res) => {
    return res.data;
  });
};