import axios, { AxiosInstance } from "axios";


let customAxios:AxiosInstance | null = null;
export const API_BASE_URL:string = `/api/v1`;

const getCustomAxios = () =>
{
    if (!customAxios || customAxios === null) {

      customAxios = axios.create();

      // @ts-ignore
      customAxios.defaults.headers = REQUEST_HEADERS;
      customAxios.defaults.timeout = parseInt(process.env.NEXT_PUBLIC_SERVICE_TIMEOUT || '2000');
      customAxios.defaults.withCredentials = true;
      customAxios.defaults.baseURL = process.env.NEXT_PUBLIC_WEBSITE_URL + API_BASE_URL;
  }

  return customAxios
}

export default getCustomAxios;

export const REQUEST_HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json"
};