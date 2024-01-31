import axios from "axios";

export const dbFunctions = {
  postIssue: async (data: object) => {
    await axios.post("/api/issues", data);
  },
  getIssues: async (setIssues: Function) => {
    await axios.get("/api/issues").then((res) => {
      // console.log(res.data);
      setIssues(res.data);
    });
  },
  editIssue: async (issue: object) => {
    await axios.put("/api/issues", issue);
  },
  deleteIssue: async (id: number) => {
    // console.log("delete", id);
    const response = await axios.delete("/api/issues", { data: { id: id } });
  },
};
