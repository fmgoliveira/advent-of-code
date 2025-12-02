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
  if (id.length % 2 !== 0) return true;

  const mid = id.length / 2;
  const firstHalf = id.slice(0, mid);
  const secondHalf = id.slice(mid);
  return firstHalf !== secondHalf;
};

const invalidIds = ids.filter((id) => !isValidId(id));

console.log("Number of invalid IDs:", invalidIds.length);

const sumOfInvalidIds = invalidIds.reduce((sum, id) => sum + +id, 0);
console.log("Sum of invalid IDs:", sumOfInvalidIds);
