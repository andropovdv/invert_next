import { IVendor } from "./../store/types/IVendor";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

export class VendorsService {
  static async getVendrors(
    page: number = 1,
    limit?: number
  ): Promise<AxiosResponse<IVendor[]>> {
    return await axios.get<IVendor[]>(
      `http://localhost:5000/vendors?_limit=${limit}&_page=${page}`
    );
  }
  static async getAllVendrors(): Promise<AxiosResponse<IVendor[]>> {
    return await axios.get<IVendor[]>(`http://localhost:5000/vendors`);
  }

  static async insertVendor(data: IVendor): Promise<AxiosResponse<IVendor[]>> {
    const payload = qs.stringify(data);

    const options = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.post<IVendor[]>(
      "http://localhost:5000/vendors",
      payload,
      options
    );
  }

  static async editVendor(data: IVendor): Promise<AxiosResponse<IVendor>> {
    const payload = qs.stringify(data);
    const options = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.patch<IVendor>(
      `http://localhost:5000/vendors/${data.id}`,
      payload,
      options
    );
  }
  static async deleteVendor(id: string): Promise<AxiosResponse<IVendor>> {
    const options = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return axios.delete(`http://localhost:5000/vendors/${id}`, options);
  }

  static async findVendorByName(
    data: IVendor
  ): Promise<AxiosResponse<IVendor[]>> {
    return await axios.get<IVendor[]>(
      `http://localhost:5000/vendors?name=${data.name}`
    );
  }
}
