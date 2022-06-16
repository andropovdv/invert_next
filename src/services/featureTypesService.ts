import { IFeatureTypes } from "./../store/types/IFeatureTypes";
import qs from "qs";
import axios, { AxiosResponse } from "axios";
export class FeatureTypesService {
  static async getFeatureTypes(
    page: number = 1,
    limit?: number
  ): Promise<AxiosResponse<IFeatureTypes[]>> {
    return await axios.get<IFeatureTypes[]>(
      `http://localhost:5000/types_feature?_limit=${limit}&_page=${page}`
    );
  }
  static async getAllFeatureTypes(): Promise<AxiosResponse<IFeatureTypes[]>> {
    return await axios.get<IFeatureTypes[]>(
      `http://localhost:5000/types_feature`
    );
  }
  static async findFeatureTypesByFeature(
    data: IFeatureTypes
  ): Promise<AxiosResponse<IFeatureTypes[]>> {
    return await axios.get<IFeatureTypes[]>(
      `http://localhost:5000/types_feature?feature=${data.feature}`
    );
  }
  static async insertFeatureTypes(
    data: IFeatureTypes
  ): Promise<AxiosResponse<IFeatureTypes[]>> {
    const payload = qs.stringify(data);
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.post<IFeatureTypes[]>(
      "http://localhost:5000/types_feature",
      payload,
      option
    );
  }
  static async editFeatureTypes(
    data: IFeatureTypes
  ): Promise<AxiosResponse<IFeatureTypes>> {
    const payload = qs.stringify(data);
    const options = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.patch<IFeatureTypes>(
      `http://localhost:5000/types_feature/${data.id}`,
      payload,
      options
    );
  }
  static async deleteFeatureTypes(
    id: string
  ): Promise<AxiosResponse<IFeatureTypes[]>> {
    const options = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return axios.delete(`http://localhost:5000/types_feature/${id}`, options);
  }
}
