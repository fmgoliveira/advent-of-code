import * as fs from "fs";

const banks = fs
  .readFileSync("day3/data.txt", "utf-8")
  .split("\n")
  .filter((bank: string) => bank.trim() !== "")
  .map((bank: string) => bank.trim());

const maxOfBank = (bank: string) => {
  const digits = bank.split("").map((d) => +d);
  let tens = Math.max(...digits);
  let indexOfMax = digits.indexOf(tens);
  if (indexOfMax === digits.length - 1) {
    tens = Math.max(...digits.slice(0, -1));
    indexOfMax = digits.indexOf(tens);
  }
  let ones = Math.max(...digits.slice(indexOfMax + 1));
  return tens * 10 + ones;
};

console.log(
  "Sum of max of banks:",
  banks.reduce((sum, bank) => sum + maxOfBank(bank), 0)
);
