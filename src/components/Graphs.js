import React, { useEffect, useState, useMemo } from 'react';
import Graph from './Graph';
import { Simpson, Trapezoid } from '../utils/numericalIntegrals';
import { useSelector } from 'react-redux';
import { parse } from 'mathjs';

export const graphConfigs = [
  {
    title: "Simpson's Rule",
    calculate: Simpson,
  },
  {
    title: "Tapezoid's Rule",
    calculate: Trapezoid,
  },
];

export default function Graphs() {
  const { lowerLimit, upperLimit, n, func } = useSelector(
    (state) => state.params
  );
  const [res, setRes] = useState(0);
  const [xPoints, setXPoints] = useState([]);
  const [resPoints, setResPoints] = useState([]);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);

  const compiled = useMemo(() => {
    try {
      return parse(func).compile();
    } catch (error) {
      console.error('Error parsing function:', error.message);
      return null;
    }
  }, [func]);

  const graphResult = useMemo(() => {
    if (compiled) {
      const { result, xPoints, fxPoints, time } = graphConfigs[index].calculate(
        Number(lowerLimit),
        Number(upperLimit),
        Math.max(2, Math.floor(n)), // Ensure valid `n`
        compiled
      );
      return { result, xPoints, fxPoints, time };
    }
    return { result: 0, xPoints: [], fxPoints: [], time: 0 };
  }, [lowerLimit, upperLimit, n, compiled, index]);

  useEffect(() => {
    setRes(graphResult.result);
    setXPoints(graphResult.xPoints);
    setResPoints(graphResult.fxPoints);
    setTime(graphResult.time);
  }, [graphResult]);

  const HandleNext = () => {
    setIndex((i) => (i === graphConfigs.length - 1 ? 0 : i + 1));
  };
  const HandlePrev = () => {
    setIndex((i) => (i === 0 ? graphConfigs.length - 1 : i - 1));
  };

  return (
    <div className="card m-auto p-3">
      {compiled ? (
        <Graph
          title={graphConfigs[index].title}
          fx={compiled}
          result={res.toFixed(2)}
          xPoints={xPoints}
          fxPoints={resPoints}
          benchmark={time.toFixed(3)}
        />
      ) : (
        <div style={{ color: 'red', textAlign: 'center' }}>
          Invalid mathematical function. Please check your input.
        </div>
      )}
      <div className="mt-3 d-flex">
        <button className="btn btn-primary me-2 m-auto" onClick={HandlePrev}>
          Anterior
        </button>
        <button className="btn btn-primary m-auto" onClick={HandleNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
