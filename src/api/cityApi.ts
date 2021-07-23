import { City, ListParams, ListReponse } from "models";
import axiosClient from "./axiosClient";

const cityApi = {
  getAllCity(): Promise<ListReponse<City>> {
    const url = "/cities";
    return axiosClient.get(url,{
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default cityApi;
