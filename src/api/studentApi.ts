import { City, ListParams, ListReponse, Student } from "models";
import axiosClient from "./axiosClient";

const studentApi = {
  getAllStudent(params: ListParams): Promise<ListReponse<Student>> {
    const url = "/students";
    return axiosClient.get(url, { params });
  },
  getStudentById(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },
  add(params: Student): Promise<Student> {
    const url = "/students";
    return axiosClient.get(url, { params });
  },
  update(params: Partial<Student>): Promise<Student> {
    const url = `/students/${params.id}`;
    return axiosClient.patch(url, { params });
  },
  remove(id: string): Promise<ListReponse<Student>> {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },
};

export default studentApi;
