import React from 'react';
import ParametersCard from './ParametersCard';
import Graphs from './Graphs';

export default function Mainpage() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <ParametersCard />
        </div>
        <div className="col-md-8">
          <Graphs />
        </div>
      </div>
    </div>
  );
}
