import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setFunction,
  setLowerLimit,
  setUpperLimit,
  setN,
} from '../features/functionParams/functionParams';
import toast from 'react-hot-toast';

export default function ParametersCard() {
  const [fx, setFx] = useState('x ^ 2');
  const [ll, setLl] = useState(0);
  const [ul, setUl] = useState(1);
  const [divisions, setDivisions] = useState(2);

  const dispatch = useDispatch();

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (Number(ll) >= Number(ul)) {
      toast.error("Lower limit can't be equal or bigger than upper limit");
      return;
    }

    if (Number(divisions) < 1) {
      toast.error('Divisions must be greater or equal to 1');
      return;
    }

    if (!fx.includes('x')) {
      toast.error('Function must contain x');
      return;
    }

    if (fx.includes('ln')) {
      toast.error('Use log(x, base) instead of ln(x)');
      return;
    }

    dispatch(setFunction(fx));
    dispatch(setLowerLimit(ll));
    dispatch(setUpperLimit(ul));
    dispatch(setN(divisions));

    toast.success('Great!!');
  };

  return (
    <div className="d-flex">
      <div className="card m-auto p-3">
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="function" className="form-label">
              Function
            </label>
            <input
              type="text"
              className="form-control"
              id="function"
              value={fx}
              onChange={(e) => setFx(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lowerLimit" className="form-label">
              Lower Limit
            </label>
            <input
              type="number"
              className="form-control"
              id="lowerLimit"
              value={ll}
              onChange={(e) => setLl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="upperLimit" className="form-label">
              Upper Limit
            </label>
            <input
              type="number"
              className="form-control"
              id="upperLimit"
              value={ul}
              onChange={(e) => setUl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="divisions" className="form-label">
              Divisions
            </label>
            <input
              type="number"
              className="form-control"
              id="divisions"
              value={divisions}
              onChange={(e) => setDivisions(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
