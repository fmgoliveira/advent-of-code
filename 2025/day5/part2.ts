import * as fs from "fs";

const data = fs
  .readFileSync("day5/data.txt", "utf-8")
  .split("\n")
  .map((line) => line.trim());

const uniqueFreshIngredients = new Set<number>();

const ranges = data
  .slice(0, data.indexOf(""))
  .map((line) => line.split("-"))
  .map(([start, end]) => [+start.trim(), +end.trim()])
  .sort((a, b) => a[0] - b[0]);

const mergedRanges: number[][] = [];
let [cs, ce]: number[] = ranges[0];
for (let i = 1; i < ranges.length; i++) {
  const [s, e] = ranges[i];
  if (s <= ce) ce = Math.max(ce, e);
  else {
    mergedRanges.push([cs, ce]);
    [cs, ce] = ranges[i];
  }
}
mergedRanges.push([cs, ce]);

console.log(
  "Total fresh ingredients:",
  mergedRanges.reduce((acc, [s, e]) => acc + (e - s + 1), 0)
);
