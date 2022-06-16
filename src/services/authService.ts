import axios from "axios";
import { IAuth } from "../store/types/IAuth";

export class AuthService {
  static async checkUser(email: string, password: string): Promise<IAuth[]> {
    const res = await axios.get<IAuth[]>(
      `http://localhost:5000/users?email=${email}&password=${password}`
    );
    return res.data;
  }
  static async cheking(id: string): Promise<IAuth[]> {
    const res = await axios.get<IAuth[]>(
      `http://localhost:5000/users?id=${id}`
    );
    return res.data;
  }
}
