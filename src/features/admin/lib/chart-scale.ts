/** A round top for a chart's scale (1, 2, 2.5 or 5 × 10ⁿ) at or above the largest value, so the top label reads well. */
export function niceMax(value: number): number {
  if (value <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const step = [1, 2, 2.5, 5, 10].find(candidate => candidate * magnitude >= value) ?? 10
  return step * magnitude
}

type Point = readonly [x: number, y: number]

/**
 * Smooth SVG path through the points (monotone cubic interpolation, Steffen's method): soft curves like Shopify's
 * charts, but it never overshoots between two points, so a curve never dips below zero or invents a peak.
 */
export function smoothPath(points: Point[]): string {
  if (points.length === 0) return ''
  if (points.length === 1) return `M${points[0][0]},${points[0][1]}`
  const slopes = points.slice(1).map(([x, y], index) => (y - points[index][1]) / (x - points[index][0]))
  // Tangent at each point: zero at local peaks and valleys, otherwise a weighted mean of the neighbouring slopes.
  const tangents = points.map(([x], index) => {
    if (index === 0) return slopes[0]
    if (index === points.length - 1) return slopes[slopes.length - 1]
    const [before, after] = [slopes[index - 1], slopes[index]]
    if (before * after <= 0) return 0
    const [left, right] = [x - points[index - 1][0], points[index + 1][0] - x]
    const mean = (before * right + after * left) / (left + right)
    return Math.sign(before) * Math.min(Math.abs(before), Math.abs(after), Math.abs(mean) / 2) * 2
  })
  let path = `M${points[0][0]},${points[0][1]}`
  for (let index = 0; index < points.length - 1; index++) {
    const [[x0, y0], [x1, y1]] = [points[index], points[index + 1]]
    const third = (x1 - x0) / 3
    path += ` C${x0 + third},${y0 + tangents[index] * third} ${x1 - third},${y1 - tangents[index + 1] * third} ${x1},${y1}`
  }
  return path
}

/** Points of a series scaled to a width × height box (top = `max`, bottom = 0). */
export function chartPoints(values: number[], max: number, width: number, height: number): Point[] {
  const step = values.length > 1 ? width / (values.length - 1) : 0
  return values.map((value, index) => [index * step, height - (value / max) * height] as const)
}

/** Smooth line through the series, and the same line closed down to the baseline for the area wash. */
export function chartPaths(values: number[], max: number, width: number, height: number) {
  const line = smoothPath(chartPoints(values, max, width, height))
  return { line, area: `${line} L${width},${height} L0,${height} Z` }
}
