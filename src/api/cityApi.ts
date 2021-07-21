import { City, ListParams, ListReponse } from "models";
import axiosClient from "./axiosClient";

const cityApi = {
  getAllCity(params: ListParams): Promise<ListReponse<City>> {
    const url = "/cities";
    return axiosClient.get(url, { params });
  },
};

export default cityApi;
