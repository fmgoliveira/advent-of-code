import * as fs from "fs";
import { UnionFind } from "./uf.ts";

const CONNS_TO_MAKE = 1000;

const boxes = fs
  .readFileSync("day8/data.txt", "utf-8")
  .split("\n")
  .filter((l) => l.trim() !== "")
  .map((b) => b.split(",").map(Number))
  .map(([x, y, z]) => ({ x, y, z }));

const d = (a: (typeof boxes)[0], b: (typeof boxes)[0]) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);

const distList: { dist: number; boxes: number[] }[] = [];

for (let i = 0; i < boxes.length; i++)
  for (let j = i + 1; j < boxes.length; j++) {
    if (i === j) continue;
    distList.push({ dist: d(boxes[i], boxes[j]), boxes: [i, j] });
  }

distList.sort((a, b) => a.dist - b.dist);

const uf = new UnionFind(boxes.length);

for (let i = 0; i < CONNS_TO_MAKE; i++)
  uf.union(distList[i].boxes[0], distList[i].boxes[1]);

const sizes = uf.allSizes().sort((a, b) => b - a);

console.log(
  "Product of sizes of the three largest circuits: ",
  sizes[0] * sizes[1] * sizes[2]
);
