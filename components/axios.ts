import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_SERVER,
  headers: {
    Accept: "application/json",
    "Accept-Language": "it-it",
    "Content-type": "application/json",
  },
});
