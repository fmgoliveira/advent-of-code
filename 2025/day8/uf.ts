class UnionFind {
  private parent: number[];
  private circuitSize: number[];

  constructor(size: number) {
    this.parent = new Array(size).fill(0).map((_, i) => i);
    this.circuitSize = new Array(size).fill(1);
  }

  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.circuitSize[rootX] < this.circuitSize[rootY]) {
        this.parent[rootX] = rootY;
        this.circuitSize[rootY] += this.circuitSize[rootX];
      } else {
        this.parent[rootY] = rootX;
        this.circuitSize[rootX] += this.circuitSize[rootY];
      }
      return true;
    }
    return false;
  }

  size(i: number): number {
    return this.circuitSize[this.find(i)];
  }

  allSizes(): number[] {
    const uniqueSizes: number[] = [];
    for (let i = 0; i < this.parent.length; i++)
      if (this.parent[i] === i) uniqueSizes.push(this.circuitSize[i]);
    return uniqueSizes;
  }
}

export { UnionFind };
