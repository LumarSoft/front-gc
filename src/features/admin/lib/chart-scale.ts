/** A round top for a chart's scale (1, 2, 2.5 or 5 × 10ⁿ) at or above the largest value, so the top label reads well. */
export function niceMax(value: number): number {
  if (value <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const step = [1, 2, 2.5, 5, 10].find(candidate => candidate * magnitude >= value) ?? 10
  return step * magnitude
}

/** SVG path through the points, and the same path closed down to the baseline for the area wash. */
export function chartPaths(values: number[], max: number, width: number, height: number) {
  const step = values.length > 1 ? width / (values.length - 1) : 0
  const points = values.map((value, index) => [index * step, height - (value / max) * height] as const)
  const line = points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  return { line, area: `${line} L${width},${height} L0,${height} Z` }
}
