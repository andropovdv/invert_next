export interface ILocation {
  id: string;
  city: ILinkChild;
  street: ILinkChild;
  house: string;
  floor: string;
  room: string;
  alias: string;
}

type ILinkChild = {
  id: string;
  name: string;
};

export interface ILocationData {
  id: string;
  name: string;
}
