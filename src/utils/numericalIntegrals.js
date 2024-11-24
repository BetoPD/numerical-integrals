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

  const start = performance.now();
  let deltaX = (ul - ll) / n;


  let s = func.evaluate({ x: ll }) + func.evaluate({ x: ul });
  const xPoints = [ll];
  const fxPoints = [func.evaluate({ x: ll })];

  for (let i = 1; i < n; i++) {
    const x = ll + i * deltaX;
    xPoints.push(x);
    s += 2 * func.evaluate({ x });
    fxPoints.push(func.evaluate({ x: 2 * func.evaluate({ x }) }));
  }
  xPoints.push(ul);
  fxPoints.push(func.evaluate({ x: ul }));

  const result = (deltaX / 2) * s;

  const end = performance.now();

  return { result, xPoints, fxPoints, time: end - start };
};

export const Romberg = (ll, ul, n, func) => {
  const start = performance.now(); 

  const matrizRomberg = Array.from({ length: n }, () => Array(n).fill(0));
  const xPoints = []; 
  const fxPoints = []; 

  let h = ul - ll;
  matrizRomberg[0][0] =
    0.5 * h * (func.evaluate({ x: ll }) + func.evaluate({ x: ul }));
  xPoints.push(ll, ul);
  fxPoints.push(func.evaluate({ x: ll }), func.evaluate({ x: ul }));

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
  const end = performance.now(); 

  return { result, xPoints, fxPoints, time: end - start };
};
