import * as fs from "fs";

const SPINNER_SIZE = 100;
const LEFT = "L";

const START_POSITION = 50;

const readInstructions = (filePath: string): string[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return data.split("\n").filter((line: string) => line.trim() !== "");
};

const instructions = readInstructions("data.txt");

let currentPosition = START_POSITION;
let zeroCount = 0;

for (const instruction of instructions) {
  const direction = instruction.charAt(0);
  const distance = parseInt(instruction.slice(1), 10);

  if (direction === LEFT) {
    const endAbsolute = currentPosition - distance;
    const passes =
      Math.floor((currentPosition - 1) / SPINNER_SIZE) -
      Math.floor((endAbsolute - 1) / SPINNER_SIZE);
    zeroCount += passes;

    currentPosition = endAbsolute % SPINNER_SIZE;
    if (currentPosition < 0) currentPosition += SPINNER_SIZE;
  } else {
    const endAbsolute = currentPosition + distance;
    const passes = Math.floor(endAbsolute / SPINNER_SIZE) - Math.floor(currentPosition / SPINNER_SIZE);
    zeroCount += passes;
    currentPosition = endAbsolute % SPINNER_SIZE;
  }
}

console.log("Number of times spinner passed through 0:", zeroCount);
