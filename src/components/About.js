import React from 'react';
import { Helmet } from 'react-helmet';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div>
        <img
          src="https://play-lh.googleusercontent.com/BpGU5TxDBRah3o9dQk42z1Rr6D3juV8pLziLgRWKAK4Z9Jv3affP0wujl7PemgUcjq0"
          alt="chill guy"
          className="img-fluid"
        />
      </div>
    </>
  );
}
