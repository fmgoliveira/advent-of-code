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

let paths: number[] = new Array(w).fill(0);
paths[start] = 1;

for (let y = 2; y < h; y++) {
  const nextPaths: number[] = new Array(w).fill(0);

  for (let x = 0; x < w; x++) {
    const p = paths[x];
    if (p === 0) continue;

    const cell = grid[y][x];

    if (cell === SPLITTER) {
      if (x > 0) nextPaths[x - 1] += p;
      if (x < w - 1) nextPaths[x + 1] += p;
    } else nextPaths[x] += p;
  }

  paths = nextPaths;
}

console.log(
  "Number of timelines: ",
  paths.reduce((a, b) => a + b, 0)
);
