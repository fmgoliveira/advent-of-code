import * as fs from "fs";
import { gf2 } from "./solvers.ts";

interface Machine {
  target: boolean[];
  buttons: number[][];
}

const parseMachine = (input: string): Machine => {
  const target = input
    .match(/\[([.#]+)\]/)![1]
    .split("")
    .map((c) => c === "#");

  const buttons: number[][] = [];
  const buttonMatches = input.matchAll(/\(([0-9,]+)\)/g);
  for (const match of buttonMatches)
    buttons.push(match[1].split(",").map(Number));

  return { target, buttons };
};

const machines = fs
  .readFileSync("day10/data.txt", "utf-8")
  .split("\n")
  .filter((l) => l.trim() !== "")
  .map(parseMachine);

const solve = (machine: Machine): number | null => {
  const nLights = machine.target.length;
  const nButtons = machine.buttons.length;

  const matrix = new Array(nLights)
    .fill(0)
    .map(() => new Array(nButtons).fill(0));

  for (let b = 0; b < nButtons; b++)
    for (const light of machine.buttons[b])
      if (light < nLights) matrix[light][b] = 1;

  const target = machine.target.map((v) => (v ? 1 : 0));

  return gf2(matrix, target);
};

let total = 0;
for (const m of machines) total += solve(m) ?? 0;

console.log("Total buttons pressed:", total);
