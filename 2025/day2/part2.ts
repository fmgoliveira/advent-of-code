import * as fs from "fs";

const ids = fs
  .readFileSync("day2/data.txt", "utf-8")
  .split(",")
  .filter((id: string) => id.trim() !== "")
  .flatMap((id: string) => {
    const [firstId, lastId] = id.trim().split("-");
    return new Array(+lastId - +firstId + 1)
      .fill(0)
      .map((_, i) => (+firstId + i).toString());
  });

const isValidId = (id: string) => {
  for (let len = 1; len <= Math.floor(id.length / 2); len++) {
    if (id.length % len !== 0) continue;

    const parts = new Array(id.length / len).fill(0);
    for (let i = 0; i < parts.length; i++) {
      parts[i] = id.slice(i * len, (i + 1) * len);
    }

    let allEqual = true;
    let i = 1;
    while (i < parts.length && allEqual) {
      allEqual = parts[i] === parts[0];
      i++;
    }

    if (allEqual) return false;
  }

  return true;
};

const invalidIds = ids.filter((id) => !isValidId(id));

console.log("Number of invalid IDs:", invalidIds.length);

const sumOfInvalidIds = invalidIds.reduce((sum, id) => sum + +id, 0);
console.log("Sum of invalid IDs:", sumOfInvalidIds);
