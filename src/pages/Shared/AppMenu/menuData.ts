export interface Menu {
  id: number;
  label: string;
  rootTo?: string;
  to?: string;
  child?: readonly Menu[];
}

export const data: Menu[] = [
  {
    id: 1,
    label: "Справочники",
    rootTo: "/directory",
    child: [
      {
        id: 11,
        label: "Производители",
        to: "/vendors",
      },
      {
        id: 12,
        label: "Типы характеристик",
        to: "/featureTypes",
      },
      {
        id: 13,
        label: "Типы комплектующих",
        to: "/componentTypes",
      },
      {
        id: 14,
        label: "Наборы свойств",
        to: "/featureSets",
      },
      {
        id: 15,
        label: "Компоненты",
        to: "/components",
      },
      {
        id: 16,
        label: "Расположение",
        to: "/locations",
      },
    ],
  },
  {
    id: 2,
    label: "Операции",
    to: "/operation",
  },
  {
    id: 3,
    label: "Отчеты",
    rootTo: "/reports",
    child: [
      {
        id: 31,
        label: "o1",
        to: "/",
      },
    ],
  },
];
