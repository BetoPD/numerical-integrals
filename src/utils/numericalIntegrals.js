export const Simpson = (ll, ul, n, func) => {
  const start = performance.now();
  const deltaX = (ul - ll) / n;

  const xPoints = [];
  const fxPoints = [];
  const simpsonPoints = [];

  for (let i = 0; i <= n; i++) {
    const x = ll + i * deltaX;
    xPoints.push(x);
    fxPoints.push(func.evaluate({ x }));
  }

  let result = 0;
  for (let i = 0; i <= n; i++) {
    if (i === 0 || i === n) {
      result += fxPoints[i];
      simpsonPoints.push(fxPoints[i]);
    } else if (i % 2 !== 0) {
      result += 4 * fxPoints[i];
      simpsonPoints.push(4 * fxPoints[i]);
    } else {
      result += 2 * fxPoints[i];
      simpsonPoints.push(2 * fxPoints[i]);
    }
  }

  result *= deltaX / 3;

  const end = performance.now();

  return { result, xPoints, fxPoints: simpsonPoints, time: end - start };
};

export const Trapezoid = (ll, ul, n, func) => {
  // Grid spacing
  const start = performance.now();
  let deltaX = (ul - ll) / n;

  // Computing sum of first and last terms
  // in above formula
  let s = func.evaluate({ x: ll }) + func.evaluate({ x: ul });
  const xPoints = [ll];
  const fxPoints = [func.evaluate({ x: ll })];

  // Adding middle terms in above formula
  for (let i = 1; i < n; i++) {
    const x = ll + i * deltaX;
    xPoints.push(x);
    s += 2 * func.evaluate({ x });
    fxPoints.push(func.evaluate({ x: 2 * func.evaluate({ x }) }));
  }
  xPoints.push(ul);
  fxPoints.push(func.evaluate({ x: ul }));

  // deltaX/2 indicates (ul-ll)/2n. Multiplying deltaX/2
  // with s.

  const result = (deltaX / 2) * s;

  const end = performance.now();

  return { result, xPoints, fxPoints, time: end - start };
};
