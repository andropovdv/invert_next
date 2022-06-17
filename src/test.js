const data = [
  {
    full_name: "Hon Hai Precision Industry Co., Ltd.",
    id: "19f95202-9c51-4ae3-b9be-6bb93d2889ca",
    name: "Foxconn",
    url: "http://www.honhai.com/en-us/",
  },
  {
    full_name: "Biostar Microtech International Corp.",
    id: "2ba5f49a-220b-4d6b-bcb8-47bba68dd337",
    name: "Biostar",
    url: "http://www.biostar.com.tw",
  },
  {
    full_name: "Albatron Technology Co. Ltd.",
    id: "40c4660f-2430-4e54-8513-7bce15f0ade2",
    name: "Albatron",
    url: "http://www.albatron.com.tw",
  },
  {
    full_name: "ACube Systems Srl",
    id: "47dfc402-9e11-4eb6-a201-0155dc048f7b",
    name: "ACube",
    url: "http://www.acube-systems.biz",
  },
  {
    full_name: "AMAX Engineering Corporation",
    id: "4e94317f-d8b5-4a2b-a680-50f07346b468",
    name: "AMAX",
    url: "http://www.amax.com",
  },
  {
    full_name: "EVGA Corporation",
    id: "4fdee398-33d2-4ebe-a66a-9c886a29dca2",
    name: "EVGA",
    url: "http://evga.com",
  },
  {
    full_name: "Chassis Plans",
    id: "537e158c-7c23-4ed8-bfa8-1eedf7876f6e",
    name: "Chassis Plans",
    url: "http://chassis-plans.com",
  },
  {
    full_name: "EPoX",
    id: "56946804-d9dd-4c71-9ef7-cb0caef2e1ab",
    name: "EPoX",
    url: "http://www.epox.com",
  },
  {
    full_name: "First International Computer, Inc.",
    id: "68c031d3-651b-456c-9c85-3476a8f7692a",
    name: "FIC",
    url: "",
  },
  {
    full_name: "Diamond Flower Inc",
    id: "80f4a7f1-ffa3-483f-b1d6-328c6a4d33d6",
    name: "DFI",
    url: "http://www.dfi.com",
  },
  {
    full_name: "ASRock",
    id: "a209c074-2e2a-4309-b64f-d70678bea2c3",
    name: "ASRock",
    url: "http://www.asrock.com",
  },
  {
    full_name: "ASUSTek Computer Inc.",
    id: "aa131d1f-533c-45c1-82c6-7c383feb1956",
    name: "Asus",
    url: "",
  },
  {
    full_name: "AOpen",
    id: "b5191a2c-b6ff-4e92-94af-8d764c15b141",
    name: "AOpen",
    url: "http://www.aopen.com",
  },
  {
    full_name: "Acer Inc.",
    id: "c5bac5f7-b7b4-4387-85a6-018090d1d8a3",
    name: "Acer",
    url: "http://wwww.acer.com",
  },
  {
    full_name: "Elitegroup Computer Systems",
    id: "e1a0a3f4-85f1-4bed-b5ef-83a478b3e2e1",
    name: "ECS",
    url: "http://www.ecs.com.tw/enm",
  },
];

const res = data.sort((a, b) => a.name.localeCompare(b.name));

console.log(res);
