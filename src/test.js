const res = "http://wwww.acer.com".includes("http:");
const res1 = "   http://wwww.acer.com".trim();
console.log(res);
console.log(res1);

const url = "    http://wwww.acer.com ".trim();
let work;
if (url.includes("http://")) {
  work = url.slice(7);
}
console.log("URL:", work);
