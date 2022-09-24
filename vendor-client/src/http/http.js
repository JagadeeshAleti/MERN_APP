import axios from "axios";
import { getConfig } from "../config";
import _ from "lodash";

const url = getConfig().backend;

export const HttpClient = {
  post: async (subUrl, body) => {
    try {
      const res = await axios.post(`${url}/${subUrl}`, body);
      return res;
    } catch (e) {
      console.log("error", e);
    }
  },
  getAll: () => {},

  get: async (subUrl) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${url}/${subUrl}`, {
        headers: { Authorization: token },
      });
      return result.data;
    } catch (e) {
      console.log("error", e);
    }
  },

  put: async (subUrl, body) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(`${url}/${subUrl}`, body, {
        headers: { Authorization: token },
      });
      return result;
    } catch (e) {
      console.log("error", e);
    }
  },

  delete: (id) => {},
};
