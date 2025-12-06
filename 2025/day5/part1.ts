import * as fs from "fs";

const data = fs
  .readFileSync("day5/data.txt", "utf-8")
  .split("\n")
  .map((line) => line.trim());

const freshIngredients = data
  .slice(0, data.indexOf(""))
  .map((line) => line.split("-"))
  .map(([start, end]) => [+start.trim(), +end.trim()]);

const availableIngredients = data.slice(data.indexOf("") + 1).map(Number);

let freshCount = 0;
for (const ingredient of availableIngredients)
  if (
    freshIngredients.some(
      ([start, end]) => ingredient >= start && ingredient <= end
    )
  )
    freshCount++;

console.log("Total fresh ingredients used:", freshCount);
