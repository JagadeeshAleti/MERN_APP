import axios from "axios";
import _ from "lodash";
import { getConfig } from "../config";

const url = getConfig().backend;

const withRefreshToken = async (fn) => {
  try {
    return await fn();
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
      localStorage.setItem("refreshToken", _.get(res, "data.newRefreshToken"));
    }
    return await fn();
  }
};

export const HttpClient = {
  post: async (subUrl, body) => {
    return withRefreshToken(async () => {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/${subUrl}`, body, {
        headers: { Authorization: token },
      });
      return res;
    });
  },

  getAll: () => {},

  get: async (subUrl) => {
    return withRefreshToken(async () => {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${url}/${subUrl}`, {
        headers: { Authorization: token },
      });
      return result.data;
    });
  },

  put: async (subUrl, body) => {
    return withRefreshToken(async () => {
      const token = localStorage.getItem("token");
      const result = await axios.put(`${url}/${subUrl}`, body, {
        headers: { Authorization: token },
      });
      return result;
    });
  },

  delete: async (subUrl) => {
    return withRefreshToken(async () => {
      const token = localStorage.getItem("token");
      const result = await axios.delete(`${url}/${subUrl}`, {
        headers: { Authorization: token },
      });
      return result;
    });
  },
};
