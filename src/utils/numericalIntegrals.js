export const Simpson = (ll, ul, n, func) => {
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

  return { result, xPoints, fxPoints: simpsonPoints };
};
