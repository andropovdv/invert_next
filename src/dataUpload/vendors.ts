export const vendorsData = [
  {
    id: "001",
    name: "ASRock",
    full_name: "ASRock",
    url: "http://www.asrock.com",
  },
  {
    id: "002",
    name: "Asus",
    full_name: "ASUSTek Computer Inc.",
    url: "",
  },
  {
    id: "003",
    name: "Acer",
    full_name: "Acer Inc.",
    url: "http://wwww.acer.com",
  },
  {
    id: "004",
    name: "ACube",
    full_name: "ACube Systems Srl",
    url: "http://www.acube-systems.biz",
  },
  {
    id: "005",
    name: "Albatron",
    full_name: "Albatron Technology Co. Ltd.",
    url: "http://www.albatron.com.tw",
  },
  {
    id: "006",
    name: "AMAX",
    full_name: "AMAX Engineering Corporation",
    url: "http://www.amax.com",
  },
  {
    id: "007",
    name: "AOpen",
    full_name: "AOpen",
    url: "http://www.aopen.com",
  },
  {
    id: "008",
    name: "Chassis Plans",
    full_name: "Chassis Plans",
    url: "http://chassis-plans.com",
  },
  {
    id: "009",
    name: "DFI",
    full_name: "Diamond Flower Inc",
    url: "http://www.dfi.com",
  },
  {
    id: "010",
    name: "Biostar",
    full_name: "Biostar Microtech International Corp.",
    url: "http://www.biostar.com.tw",
  },
  {
    id: "011",
    name: "EVGA",
    full_name: "EVGA Corporation",
    url: "http://evga.com",
  },
  {
    id: "012",
    name: "ECS",
    full_name: "Elitegroup Computer Systems",
    url: "http://www.ecs.com.tw/enm",
  },
  {
    id: "013",
    name: "EPoX",
    full_name: "EPoX",
    url: "http://www.epox.com",
  },
  {
    id: "014",
    name: "FIC",
    full_name: "First International Computer, Inc.",
    url: "",
  },
  {
    id: "015",
    name: "Foxconn",
    full_name: "Hon Hai Precision Industry Co., Ltd.",
    url: "http://www.honhai.com/en-us/",
  },
];

export const componentTypesData = [
  {
    id: 1,
    name: "Процессор",
  },
  {
    id: 2,
    name: "Оперативная память",
  },
  {
    id: 3,
    name: "Жесткий диск",
  },
  {
    id: 4,
    name: "Материнская плата",
  },
];

export const featureTypesData = [
  {
    id: 1,
    feature: "Speed",
    field_type: "DROPDOWN",
    unit: "",
  },
  {
    id: 2,
    feature: "Частота",
    field_type: "STRING",
    unit: "GHz",
  },
  {
    id: 3,
    feature: "Socket",
    field_type: "DROPDOWN",
    unit: "",
  },
  {
    id: 4,
    feature: "Volume",
    field_type: "STRING",
    unit: "Gb",
  },
  {
    unit: "ascvsa",
    field_type: "DROPDOWN",
    feature: "reqw",
    id: 5,
  },
  {
    feature: "test",
    field_type: "STRING",
    unit: "qqq",
    id: 6,
  },
];

export const featureSetsData = [
  {
    id: 1,
    component: {
      id: "1",
      name: "MotherBoard",
    },
    feature: [
      {
        name_feature: {
          id: "1",
          name: "Socket",
        },
        value_feature: ["Soket 7", "Soket 370", "Soket 1152"],
        type: "DROPDOWN",
        unit: "",
      },
      {
        name_feature: {
          id: "2",
          name: "Volume",
        },
        value_feature: [],
        type: "STRING",
        unit: "Gb",
      },
    ],
  },
  {
    id: 2,
    component: {
      id: "2",
      name: "Cpu",
    },
    feature: [
      {
        name_feature: {
          id: "3",
          name: "Socket",
        },
        value_feature: ["Soket 7", "Soket 1152"],
        type: "DROPDOWN",
        unit: "",
      },
      {
        name_feature: {
          id: "4",
          name: "Частота",
        },
        value_feature: [],
        type: "STRING",
        unit: "Gb",
      },
    ],
  },
];
