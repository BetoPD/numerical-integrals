import React, { useEffect, useState, useMemo } from 'react';
import Graph from './Graph';
import { Simpson } from '../utils/numericalIntegrals';
import { useSelector } from 'react-redux';
import { parse } from 'mathjs';

export default function Graphs() {
  const { lowerLimit, upperLimit, n, func } = useSelector(
    (state) => state.params
  );
  const [simpson, setSimpson] = useState(0);
  const [xPoints, setXPoints] = useState([]);
  const [simpsonPoints, setSimpsonPoints] = useState([]);

  const compiled = useMemo(() => {
    try {
      return parse(func).compile();
    } catch (error) {
      console.error('Error parsing function:', error.message);
      return null;
    }
  }, [func]);

  useEffect(() => {
    if (compiled) {
      const { result, xPoints, fxPoints } = Simpson(
        Number(lowerLimit),
        Number(upperLimit),
        Number(n),
        compiled
      );
      setSimpson(result);
      setXPoints(xPoints);
      setSimpsonPoints(fxPoints);
    }
  }, [lowerLimit, upperLimit, n, compiled]);

  return (
    <div className="card m-auto p-3">
      {compiled ? (
        <Graph
          title="Simpson's Rule"
          fx={compiled}
          result={simpson.toFixed(2)}
          xPoints={xPoints}
          fxPoints={simpsonPoints}
        />
      ) : (
        <div style={{ color: 'red', textAlign: 'center' }}>
          Invalid mathematical function. Please check your input.
        </div>
      )}
    </div>
  );
}
