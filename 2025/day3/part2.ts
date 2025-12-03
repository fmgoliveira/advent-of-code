import * as fs from "fs";

const BATTERIES_TO_TURN_ON = 12;

const banks = fs
  .readFileSync("day3/data.txt", "utf-8")
  .split("\n")
  .filter((bank: string) => bank.trim() !== "")
  .map((bank: string) => bank.trim());

const maxOfBank = (bank: string) => {
  const maxDiscard = bank.length - BATTERIES_TO_TURN_ON;
  if (maxDiscard < 0) return +bank;

  const res: number[] = [];
  let discards = maxDiscard;
  for (const d of bank) {
    const digit = +d;
    while (res.length > 0 && digit > res[res.length - 1] && discards > 0) {
      res.pop();
      discards--;
    }
    res.push(digit);
  }

  // if there are still discards left, remove from the end
  res.splice(res.length - discards, discards);

  return +res.slice(0, BATTERIES_TO_TURN_ON).join("");
};

console.log(
  "Sum of max of banks:",
  banks.reduce((sum, bank) => sum + maxOfBank(bank), 0)
);
