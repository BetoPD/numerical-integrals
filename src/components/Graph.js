import React from 'react';
import { Mafs, Coordinates, Plot, Text, Point, Polyline } from 'mafs';

export default function Graph({ title, result, fx, xPoints, fxPoints }) {
  return (
    <Mafs viewBox={{ x: [-10, 10], y: [-10, 10] }} preserveAspectRatio={false}>
      <Coordinates.Cartesian subdivisions={4} />

      <Plot.OfX
        y={(x) => {
          try {
            return fx.evaluate({ x: x });
          } catch {
            return NaN;
          }
        }}
      />

      <Text x={-5} y={5}>
        {title}
      </Text>

      <Text x={5} y={5}>
        Result: {result}
      </Text>

      <Polyline points={xPoints.map((x, i) => [x, fxPoints[i]])} color="blue" />

      {xPoints.map((point, i) => (
        <Point key={i} x={point} y={fxPoints[i]} />
      ))}
    </Mafs>
  );
}
