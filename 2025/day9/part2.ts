import * as fs from "fs";

interface Tile {
  x: number;
  y: number;
}

interface Edge {
  p1: Tile;
  p2: Tile;
  isVertical: boolean;
}

const redTiles = fs
  .readFileSync("day9/data.txt", "utf-8")
  .split("\n")
  .filter((l) => l.trim() !== "")
  .map((t) => t.trim().split(",").map(Number))
  .map(([x, y]) => ({ x, y }));

const edges: Edge[] = [];
for (let i = 0; i < redTiles.length; i++) {
  const p1 = redTiles[i];
  const p2 = redTiles[(i + 1) % redTiles.length];
  edges.push({ p1, p2, isVertical: p1.x === p2.x });
}

const vEdges = edges
  .filter((e) => e.isVertical)
  .map((e) => ({
    x: e.p1.x,
    yMin: Math.min(e.p1.y, e.p2.y),
    yMax: Math.max(e.p1.y, e.p2.y),
  }));
const hEdges = edges
  .filter((e) => !e.isVertical)
  .map((e) => ({
    y: e.p1.y,
    xMin: Math.min(e.p1.x, e.p2.x),
    xMax: Math.max(e.p1.x, e.p2.x),
  }));

const edgeGreenTiles = new Set<string>();

const addGreenTiles = (t1: Tile, t2: Tile) => {
  if (t1.y === t2.y) {
    const [startX, endX] = t1.x < t2.x ? [t1.x, t2.x] : [t2.x, t1.x];
    new Array(endX - startX + 1)
      .fill(0)
      .map((_, i) => edgeGreenTiles.add(`${startX + i},${t1.y}`));
  } else if (t1.x === t2.x) {
    const [startY, endY] = t1.y < t2.y ? [t1.y, t2.y] : [t2.y, t1.y];
    new Array(endY - startY + 1)
      .fill(0)
      .map((_, i) => edgeGreenTiles.add(`${t1.x},${startY + i}`));
  }
};

for (let i = 0; i < redTiles.length; i++)
  addGreenTiles(redTiles[i], redTiles[(i + 1) % redTiles.length]);

const isInside = (t: Tile) => {
  let inside = false;
  for (let i = 0, j = redTiles.length - 1; i < redTiles.length; j = i++) {
    const xi = redTiles[i].x,
      yi = redTiles[i].y;
    const xj = redTiles[j].x,
      yj = redTiles[j].y;

    const intersect =
      yi > t.y !== yj > t.y && t.x < ((xj - xi) * (t.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

const checkVEdges = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) => {
  for (const w of vEdges)
    if (w.x > minX && w.x < maxX && w.yMin < maxY && w.yMax > minY) return true;
  return false;
};

const checkHEdges = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) => {
  for (const w of hEdges)
    if (w.y > minY && w.y < maxY && w.xMin < maxX && w.xMax > minX) return true;
  return false;
};

const isIntersected = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) => {
  if (!checkVEdges(minX, maxX, minY, maxY)) return checkHEdges(minX, maxX, minY, maxY);
  return true;
};

const a = (t1: Tile, t2: Tile) =>
  (Math.abs(t1.x - t2.x) + 1) * (Math.abs(t1.y - t2.y) + 1);

let maxArea = 0;
for (let i = 0; i < redTiles.length; i++)
  for (let j = i + 1; j < redTiles.length; j++) {
    if (i === j) continue;
    const area = a(redTiles[i], redTiles[j]);
    if (area <= maxArea) continue;

    const minX = Math.min(redTiles[i].x, redTiles[j].x);
    const maxX = Math.max(redTiles[i].x, redTiles[j].x);
    const minY = Math.min(redTiles[i].y, redTiles[j].y);
    const maxY = Math.max(redTiles[i].y, redTiles[j].y);

    const center = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
    if (!isInside(center)) continue;
    if (isIntersected(minX, maxX, minY, maxY)) continue;

    maxArea = area;
  }

console.log("Area of the largest valid rectangle: ", maxArea);
