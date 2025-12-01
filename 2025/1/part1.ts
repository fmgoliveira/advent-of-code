import * as fs from "fs";

const SPINNER_SIZE = 100;

const LEFT = "L";

const START_POSITION = 50;

const readInstructions = (filePath: string): string[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("\n").filter((line: string) => line.trim() !== "");
};

const getSpinnerPosition = (position: number, instruction: string): number => {
  const dir = instruction.charAt(0);
  const steps = dir === LEFT ? -+instruction.slice(1) : +instruction.slice(1);
  return (position + steps + SPINNER_SIZE) % SPINNER_SIZE;
};

const instructions = readInstructions("data.txt");

let currentPosition = START_POSITION;
let zeroCount = 0;
for (const instruction of instructions) {
  currentPosition = getSpinnerPosition(currentPosition, instruction);
  if (currentPosition === 0) zeroCount++;
}

console.log("Number of times spinner landed on 0:", zeroCount);
console.log("Final position:", currentPosition);
