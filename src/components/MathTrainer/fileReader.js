const fs = require("fs");
const file = {
  content: fs.readFileSync("best.txt", { encoding: "utf-8" }),
};
// console.log(file);
export default file;
