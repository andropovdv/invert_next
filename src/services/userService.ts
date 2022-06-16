import axios, { AxiosResponse } from "axios";
import { Users } from "../store/types/IUsers";

export class UserService {
  static getUsers(): Promise<AxiosResponse<Users[]>> {
    return axios.get<Users[]>("http://localhost:5000/users");
  }
}
