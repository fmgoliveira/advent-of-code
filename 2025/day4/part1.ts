import * as fs from "fs";

const PAPER_ROLL = "@";

const paperRolls = fs
  .readFileSync("day4/data.txt", "utf-8")
  .split("\n")
  .map((line: string) => line.trim().split(""));

const getValidAdjacentCells = (i: number, j: number): [number, number][] => {
  const validCells: [number, number][] = [];
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // up-left
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 1], // down-right
  ];

  for (const [di, dj] of directions) {
    const ni = i + di;
    const nj = j + dj;
    if (
      ni >= 0 &&
      ni < paperRolls.length &&
      nj >= 0 &&
      nj < paperRolls[0].length
    ) {
      validCells.push([ni, nj]);
    }
  }

  return validCells;
};

const canBeRemoved = (i: number, j: number): boolean => {
  // can only be removed if there is at most 4 adjacent paper rolls
  let adjacentCount = 0;
  const cells = getValidAdjacentCells(i, j);

  for (const [ni, nj] of cells) {
    if (paperRolls[ni][nj] === PAPER_ROLL) adjacentCount++;
    if (adjacentCount >= 4) return false;
  }
  return true;
};

let count = 0;
for (let i = 0; i < paperRolls.length; i++)
  for (let j = 0; j < paperRolls[0].length; j++)
    if (paperRolls[i][j] === PAPER_ROLL && canBeRemoved(i, j)) count++;

console.log("Total removable paper rolls:", count);
