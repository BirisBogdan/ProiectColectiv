// Demo layout, not the real floor plan. See OQ-6.
//
// Every room in rooms.ts gets a cell on its own floor's grid: rows from 1, at most
// 3 columns so a floor still fits on a phone screen.
export const roomPositions: Record<string, { row: number; col: number }> = {
  // Clădirea Centrală, floor 0
  "l-001": { row: 1, col: 1 },
  gamma: { row: 1, col: 2 },
  // Clădirea Centrală, floor 1
  "2-i": { row: 1, col: 1 },
  "5-i": { row: 1, col: 2 },
  // Clădirea Centrală, floor 5
  "c-510": { row: 1, col: 1 },
  "c-512": { row: 1, col: 2 },
  // FSEGA, floor 1
  "s-10": { row: 1, col: 1 },
  "s-12": { row: 1, col: 2 },
  "a-101": { row: 2, col: 1 },
};
