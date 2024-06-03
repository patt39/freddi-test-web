import axios from 'axios';
import { DELETE, GET, POST, PUT } from './consts';
export interface ClientApiMethods {
  [key: string]: {
    endpoint: string;
    method: string;
  };
}

export type IntegrationApiCall = {
  action: string;
  body?: Object;
  urlParams?: Object;
  queryParams?: Object;
};

// const userToken =
//   typeof window !== 'undefined'
//     ? Cookies.get(String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN))
//     : null;

export const makeApiCall = async ({
  action,
  body,
  urlParams = {},
  queryParams = {},
}: IntegrationApiCall): Promise<any> => {
  const getURLEndpoint = (options: {
    endpoint: string;
    urlParams: any;
    queryParams: any;
  }) => {
    const { endpoint, urlParams, queryParams } = options;

    //replace params in url
    let url = endpoint;
    if (urlParams) {
      Object.keys(urlParams).forEach((key: string) => {
        url = url.replace(`:${key}`, urlParams[key]);
      });
    }

    //add query params
    if (queryParams) {
      url += '?';
      Object.keys(queryParams).forEach((key: string) => {
        if (queryParams[key]) {
          url += `${key}=${queryParams[key]}&`;
        }
      });
      url = url.slice(0, -1);
    }

    return url;
  };

  const url = getURLEndpoint({
    endpoint: apiEndpoints[action].endpoint,
    urlParams: urlParams,
    queryParams: queryParams,
  });

  //   async request(req: Request<M>) {
  //   const m = this._methods[req.action];

  // axios.defaults.headers.common['Authorization'] = `${userToken}` ?? {};
  const response = await axios.request({
    method: apiEndpoints[action]?.method,
    url: url,
    data: body,
    withCredentials: true,
  });

  return response;
};

const baseUrl = process.env.NEXT_PUBLIC_HOST_SERVER;

export const apiEndpoints: ClientApiMethods = {
  /****************** Project route */
  getProjects: GET(`${baseUrl}/projects`),
  createOneProject: POST(`${baseUrl}/projects`),
  updateOneProject: PUT(`${baseUrl}/projects/:projectId`),
  deleteOneProject: DELETE(`${baseUrl}/projects/:projectId`),
};
