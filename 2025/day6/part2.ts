import * as fs from "fs";

const OP_ADD = "+";
const OP_MUL = "*";

const data = fs
  .readFileSync("day5/data.txt", "utf-8")
  .split("\n")
  .filter((l) => l.trim() !== "");

const columns = Math.max(...data.map((l) => l.length));

let globalSum = 0;

let problemNumbers: number[] = [];
let problemOp: string | null = null;

for (let c = columns - 1; c >= -1; c--) {
  let cStr = "";
  if (c >= 0) for (let i = 0; i < data.length; i++) cStr += data[i][c] || " ";
  const isSep = cStr.trim() === "";

  if (isSep) {
    if (problemNumbers.length && problemOp) {
      globalSum += problemNumbers.reduce(
        (acc, n) => (problemOp === OP_ADD ? acc + n : acc * n),
        problemOp === OP_ADD ? 0 : 1
      );
    }

    problemNumbers = [];
    problemOp = null;
  } else {
    if ([OP_ADD, OP_MUL].includes(cStr[cStr.length - 1]))
      problemOp = data[data.length - 1][c];

    if (cStr.slice(0, -1).trim())
      problemNumbers.push(+cStr.slice(0, -1).trim());
  }
}

console.log("Final global sum: ", globalSum);
