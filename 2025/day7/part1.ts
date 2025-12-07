import * as fs from "fs";

const START = "S";
const SPLITTER = "^";

const grid = fs
  .readFileSync("day7/data.txt", "utf-8")
  .split("\n")
  .filter((l) => l.trim() !== "")
  .map((l) => l.split(""));

const w = grid[0].length;
const h = grid.length;

const start = grid[0].indexOf(START);

let x = [start];

let splits = 0;

for (let y = 1; y < h; y++) {
  const nextX: number[] = [];

  for (const currX of x) {
    const cellBelow = grid[y][currX];

    if (cellBelow === SPLITTER) {
      if (currX > 0) nextX.push(currX - 1);
      if (currX < w - 1) nextX.push(currX + 1);
      splits++;
    } else nextX.push(currX);
  }

  x = Array.from(new Set(nextX));
}

console.log("Number of splits: ", splits);