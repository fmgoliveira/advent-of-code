import * as fs from "fs";

const OP_ADD = "+";

const problems = fs
  .readFileSync("day5/data.txt", "utf-8")
  .split("\n")
  .map((line) =>
    line
      .trim()
      .split(/\s+/g)
      .map((n) => n.trim())
  );

let globalSum = 0;
for (let p = 0; p < problems[0].length; p++) {
  const op = problems[problems.length - 1][p];
  let local = op === OP_ADD ? 0 : 1;
  for (let i = 0; i < problems.length - 1; i++)
    if (op === OP_ADD) local += +problems[i][p];
    else local *= +problems[i][p];
  globalSum += local;
}

console.log("Final global sum:", globalSum);
