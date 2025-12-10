import * as fs from "fs";

interface Machine {
  target: number[];
  buttons: number[][];
}

const parseMachine = (input: string): Machine | null => {
  const targetMatch = input.match(/\{([0-9,]+)\}/);
  if (!targetMatch) return null;

  const target = targetMatch[1].split(",").map((s) => +s.trim());

  const buttons: number[][] = [];
  const buttonMatches = input.matchAll(/\(([0-9,]+)\)/g);
  for (const match of buttonMatches)
    buttons.push(match[1].split(",").map(Number));

  return { target, buttons };
};

const machines = fs
  .readFileSync("day10/data.txt", "utf-8")
  .split("\n")
  .map(parseMachine);

const solveMachine = (machine: Machine): number | null => {
  const nEq = machine.target.length;
  const nVars = machine.buttons.length;

  const matrix: number[][] = Array.from({ length: nEq }, () =>
    Array(nVars).fill(0)
  );
  for (let b = 0; b < nVars; b++) {
    for (const counterIdx of machine.buttons[b]) {
      if (counterIdx < nEq) {
        matrix[counterIdx][b] = 1;
      }
    }
  }

  const aug = matrix.map((row, i) => [...row, machine.target[i]]);

  let pivotRow = 0;
  const pivotCols: number[] = [];
  const colToPivotRow: number[] = Array(nVars).fill(-1);

  for (let col = 0; col < nVars && pivotRow < nEq; col++) {
    let maxRow = pivotRow;
    let maxVal = Math.abs(aug[pivotRow][col]);
    for (let r = pivotRow + 1; r < nEq; r++) {
      if (Math.abs(aug[r][col]) > maxVal) {
        maxVal = Math.abs(aug[r][col]);
        maxRow = r;
      }
    }

    if (maxVal < 1e-9) continue;
    [aug[pivotRow], aug[maxRow]] = [aug[maxRow], aug[pivotRow]];

    const pivotVal = aug[pivotRow][col];
    for (let c = col; c <= nVars; c++) aug[pivotRow][c] /= pivotVal;

    for (let r = 0; r < nEq; r++)
      if (r !== pivotRow) {
        const factor = aug[r][col];
        if (Math.abs(factor) > 1e-9)
          for (let c = col; c <= nVars; c++)
            aug[r][c] -= factor * aug[pivotRow][c];
      }

    pivotCols.push(col);
    colToPivotRow[col] = pivotRow;
    pivotRow++;
  }

  for (let r = pivotRow; r < nEq; r++)
    if (Math.abs(aug[r][nVars]) > 1e-4) return null;

  const freeVars: number[] = [];
  for (let c = 0; c < nVars; c++) if (colToPivotRow[c] === -1) freeVars.push(c);

  const globalMax = Math.max(...machine.target) + 1;
  let minPresses = Infinity;

  const currentSolution = new Array(nVars).fill(0);

  const search = (k: number) => {
    if (k === freeVars.length) {
      let currentSum = 0;
      let valid = true;

      for (const fv of freeVars) currentSum += currentSolution[fv];

      for (let r = 0; r < pivotRow; r++) {
        const pCol = pivotCols[r];
        let val = aug[r][nVars];

        for (const fv of freeVars) val -= aug[r][fv] * currentSolution[fv];

        const rounded = Math.round(val);
        if (rounded < 0 || Math.abs(rounded - val) > 1e-4) {
          valid = false;
          break;
        }
        currentSolution[pCol] = rounded;
        currentSum += rounded;
      }

      if (valid) minPresses = Math.min(minPresses, currentSum);

      return;
    }

    const fvIndex = freeVars[k];

    const bound = globalMax;

    for (let val = 0; val <= bound; val++) {
      currentSolution[fvIndex] = val;
      search(k + 1);
    }
  };

  search(0);

  return minPresses === Infinity ? null : minPresses;
};

let total = 0;
for (const m of machines) {
  const result = solveMachine(m!);
  total += result ?? 0;
}

console.log("Total buttons pressed:", total);
