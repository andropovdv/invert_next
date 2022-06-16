import { IFeatureSets } from "./../store/types/IFeatureSets";
import axios, { AxiosResponse } from "axios";
import qs from "qs";

export class FeatureSetsService {
  static async getFeatureSets(
    page: number = 1,
    limit?: number
  ): Promise<AxiosResponse<IFeatureSets[]>> {
    return await axios.get<IFeatureSets[]>(
      `http://localhost:5000/sets_feature_components?_limit=${limit}&_page=${page}`
    );
  }

  static async getAllFeatureSets(): Promise<AxiosResponse<IFeatureSets[]>> {
    return await axios.get(`http://localhost:5000/sets_feature_components`);
  }

  static async findFeatureSetsByComponent(
    data: IFeatureSets
  ): Promise<AxiosResponse<IFeatureSets[]>> {
    return axios.get<IFeatureSets[]>(
      `http://localhost:5000/sets_feature_components?component=${data.component}`
    );
  }

  static async insertFeatureSets(
    data: IFeatureSets
  ): Promise<AxiosResponse<IFeatureSets[]>> {
    const payload = qs.stringify(data);
    console.log("PayLoad: ", payload);
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.post(
      `http://localhost:5000/sets_feature_components`,
      payload,
      option
    );
  }

  static async editFeatureSets(
    data: IFeatureSets
  ): Promise<AxiosResponse<IFeatureSets>> {
    const payload = qs.stringify(data);
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.patch<IFeatureSets>(
      `http://localhost:5000/sets_feature_components/${data.id}`,
      payload,
      option
    );
  }

  static async removeFeatureSets(
    id: string
  ): Promise<AxiosResponse<IFeatureSets>> {
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.delete(
      `http://localhost:5000/sets_feature_components/${id}`,
      option
    );
  }
}
