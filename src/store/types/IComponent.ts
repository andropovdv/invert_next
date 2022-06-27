export interface IComponent {
  id: string;
  typeComponent: ILink;
  vendor: ILink;
  model: string;
  featureSet: IFeatureSet;
}

type ILink = {
  id: string;
  name: string;
};

type IFeatureSet = {
  id: string;
  feature: IFeature[];
};

type IFeature = {
  id: string;
  label?: string;
  value: string;
};
