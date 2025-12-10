const gf2 = (matrix: number[][], target: number[]): number | null => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const aug = matrix.map((row, i) => [...row, target[i]]);

  const pivotCols: number[] = [];
  let pivot = 0;
  for (let c = 0; c < cols && pivot < rows; c++) {
    let r = pivot;
    while (r < rows && aug[r][c] === 0) r++;
    if (r >= rows) continue;

    [aug[pivot], aug[r]] = [aug[r], aug[pivot]];
    pivotCols.push(c);

    for (let rr = 0; rr < rows; rr++)
      if (rr !== pivot && aug[rr][c] === 1)
        for (let cc = 0; cc <= cols; cc++) aug[rr][cc] ^= aug[pivot][cc];

    pivot++;
  }

  for (let r = pivot; r < rows; r++)
    if (aug[r].slice(0, cols).every((v) => v === 0) && aug[r][cols] === 1)
      return null;

  const freeVars: number[] = [];
  for (let c = 0; c < cols; c++) if (!pivotCols.includes(c)) freeVars.push(c);

  if (freeVars.length === 0) {
    const solution = new Array(cols).fill(0);
    for (let r = 0; r < pivotCols.length; r++)
      solution[pivotCols[r]] = aug[r][cols];
    return solution.reduce((s, v) => s + v, 0);
  }

  let minPresses = Infinity;
  const numCombos = 1 << freeVars.length;

  for (let combo = 0; combo < numCombos; combo++) {
    const solution = new Array(cols).fill(0);

    for (let i = 0; i < freeVars.length; i++)
      solution[freeVars[i]] = (combo >> i) & 1;

    for (let r = 0; r < pivotCols.length; r++) {
      let val = aug[r][cols];
      for (let c = 0; c < cols; c++)
        if (c !== pivotCols[r] && aug[r][c] === 1) val ^= solution[c];
      solution[pivotCols[r]] = val;
    }

    const presses = solution.reduce((s, v) => s + v, 0);
    minPresses = Math.min(minPresses, presses);
  }

  return minPresses;
};

export { gf2 };
