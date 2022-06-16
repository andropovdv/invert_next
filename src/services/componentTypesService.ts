import qs from "qs";
import { IComponentType } from "./../store/types/IComponentTypes";
import axios, { AxiosResponse } from "axios";

export class ComponentTypesService {
  static async getComponentTypes(
    page: number = 1,
    limit?: number
  ): Promise<AxiosResponse<IComponentType[]>> {
    return await axios.get(
      `http://localhost:5000/types_component?_limit=${limit}&_page=${page}`
    );
  }
  static async getAllComponentTypes(): Promise<
    AxiosResponse<IComponentType[]>
  > {
    return await axios.get(`http://localhost:5000/types_component`);
  }
  static async findTypeByName(
    data: IComponentType
  ): Promise<AxiosResponse<IComponentType[]>> {
    return await axios.get<IComponentType[]>(
      `http://localhost:5000/types_component?name=${data.name}`
    );
  }
  static async insertComponentTypes(
    data: IComponentType
  ): Promise<AxiosResponse<IComponentType[]>> {
    const payload = qs.stringify(data);
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.post<IComponentType[]>(
      `http://localhost:5000/types_component`,
      payload,
      option
    );
  }
  static async editComponentTypes(
    data: IComponentType
  ): Promise<AxiosResponse<IComponentType>> {
    const payload = qs.stringify(data);
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.patch<IComponentType>(
      `http://localhost:5000/types_component/${data.id}`,
      payload,
      option
    );
  }
  static async removeComponentTypes(
    id: string
  ): Promise<AxiosResponse<IComponentType>> {
    const option = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };
    return await axios.delete(
      `http://localhost:5000/types_component/${id}`,
      option
    );
  }
}
