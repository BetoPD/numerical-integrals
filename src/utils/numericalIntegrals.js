export const Simpson = (ll, ul, n, func) => {
  // ll: lower limit
  // ul: upper limit
  // n: number of divisions
  // func: function to integrate

  // Initialize the timer
  const start = performance.now();

  // Calculate the width of each division
  const deltaX = (ul - ll) / n;

  // Initialize the arrays to store the x and f(x) values
  const xPoints = [];
  const fxPoints = [];
  const simpsonPoints = [];

  // Initialize the result
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

  // Multiply the result by the width of each division divided by 3
  result *= deltaX / 3;

  // Stop the timer
  const end = performance.now();

  // Return the result, the x and f(x) values, and the time it took to calculate the integral
  return { result, xPoints, fxPoints: simpsonPoints, time: end - start };
};

export const Trapezoid = (ll, ul, n, func) => {
  // ll: lower limit
  // ul: upper limit
  // n: number of divisions
  // func: function to integrate

  // Initialize the timer
  const start = performance.now();

  // Calculate the width of each division
  let deltaX = (ul - ll) / n;

  // Initialize the result
  let s = func.evaluate({ x: ll }) + func.evaluate({ x: ul });
  const xPoints = [ll];
  const fxPoints = [func.evaluate({ x: ll })];

  // Calculate the result
  for (let i = 1; i < n; i++) {
    const x = ll + i * deltaX;
    xPoints.push(x);
    s += 2 * func.evaluate({ x });
    fxPoints.push(func.evaluate({ x: 2 * func.evaluate({ x }) }));
  }

  xPoints.push(ul);
  fxPoints.push(func.evaluate({ x: ul }));

  const result = (deltaX / 2) * s;

  // Stop the timer
  const end = performance.now();

  // Return the result, the x and f(x) values, and the time it took to calculate the integral
  return { result, xPoints, fxPoints, time: end - start };
};

export const Romberg = (ll, ul, n, func) => {
  // ll: lower limit
  // ul: upper limit
  // n: number of divisions
  // func: function to integrate

  // Initialize the timer
  const start = performance.now();

  // Initialize the Romberg matrix
  const matrizRomberg = Array.from({ length: n }, () => Array(n).fill(0));
  const xPoints = [];
  const fxPoints = [];

  // Calculate the width of each division
  let h = ul - ll;
  matrizRomberg[0][0] =
    0.5 * h * (func.evaluate({ x: ll }) + func.evaluate({ x: ul }));
  xPoints.push(ll, ul);
  fxPoints.push(func.evaluate({ x: ll }), func.evaluate({ x: ul }));

  // Calculate the result
  for (let i = 1; i < n; i++) {
    h /= 2;
    let sumMidpoints = 0;

    for (let k = 1; k < 2 ** i; k += 2) {
      const x = ll + k * h;
      sumMidpoints += func.evaluate({ x });
      if (!xPoints.includes(x)) {
        xPoints.push(x);
        fxPoints.push(func.evaluate({ x }));
      }
    }

    matrizRomberg[i][0] = 0.5 * matrizRomberg[i - 1][0] + h * sumMidpoints;

    for (let j = 1; j <= i; j++) {
      matrizRomberg[i][j] =
        (4 ** j * matrizRomberg[i][j - 1] - matrizRomberg[i - 1][j - 1]) /
        (4 ** j - 1);
    }
  }

  const result = matrizRomberg[n - 1][n - 1];

  // Stop the timer
  const end = performance.now();

  // Return the result, the x and f(x) values, and the time it took to calculate the integral
  return { result, xPoints, fxPoints, time: end - start };
};
