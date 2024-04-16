import React from 'react';

function Results(props) {
  // Access the passed state containing the results

  const results = props.location.state.results.result;
  const status =  props.location.state.results.status;

  // Render the results
  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
      <h2>Results</h2>
      <ul>
        {status.map((state, index) => (
          <li key={index}>{state}</li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
