import * as fs from "fs";
import { UnionFind } from "./uf.ts";

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

let lastConnected: (typeof boxes)[0][] = [];
let nCircuits = boxes.length;
let i = 0;
while (nCircuits > 1 && i < distList.length) {
  if (uf.union(distList[i].boxes[0], distList[i].boxes[1])) {
    lastConnected = [boxes[distList[i].boxes[0]], boxes[distList[i].boxes[1]]];
    nCircuits--;
  }
  i++;
}

console.log(
  "Product of the X coords of the last connected boxes: ",
  lastConnected[0].x * lastConnected[1].x
);
