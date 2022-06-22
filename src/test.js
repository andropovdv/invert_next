const arr = ["Soket 7", "Soket 370", "Soket 1152"];

const input = "Soket 333";

const postData = input.toLowerCase().trim();

const postData1 = postData.charAt(0).toUpperCase() + postData.slice(1);

console.log("post2: ", postData1);

const search = arr.find((el) => el === postData1);
console.log("search: ", search);

if (search) {
  console.log("Не уникально");
} else {
  arr.push(postData1);
  console.log("result: ", arr);
}

// const idx = arr.indexOf("Soket 370");
// if (!(idx === -1)) {
//   arr.splice(idx, 1);
//   console.log(arr);
// } else {
//   console.log("Не найдено");
// }
