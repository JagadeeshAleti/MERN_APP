import axios from "axios";
import _ from "lodash";
import { getConfig } from "../config";

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
      if (_.get(e, "response.data.code") === "TOKEN_EXPIRED") {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${url}/user/refreshToken`,
          {},
          {
            headers: { Authorization: refreshToken },
          }
        );
        localStorage.setItem("token", _.get(res, "data.newToken"));
        localStorage.setItem(
          "refreshToken",
          _.get(res, "data.newRefreshToken")
        );
      }
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
