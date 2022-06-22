export interface IFeatureSets {
  id: string;
  component: ILink;
  feature: IFeature[];
}

type ILink = {
  id: string;
  name: string;
};

export type IFeature = {
  name_feature: ILink;
  value_feature: Array<string>;
  type: string;
  unit: string;
};
