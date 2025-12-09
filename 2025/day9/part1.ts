import * as fs from "fs";

const tiles = fs
  .readFileSync("day9/data.txt", "utf-8")
  .split("\n")
  .filter((l) => l.trim() !== "")
  .map((t) => t.trim().split(",").map(Number))
  .map(([x, y]) => ({ x, y }));

const a = (t1: (typeof tiles)[0], t2: (typeof tiles)[0]) =>
  (Math.abs(t1.x - t2.x) + 1) * (Math.abs(t1.y - t2.y) + 1);

let maxArea = 0;
for (let i = 0; i < tiles.length; i++)
  for (let j = i + 1; j < tiles.length; j++) {
    if (i === j) continue;
    maxArea = Math.max(maxArea, a(tiles[i], tiles[j]));
  }

console.log("Area of the largest rectangle: ", maxArea);
