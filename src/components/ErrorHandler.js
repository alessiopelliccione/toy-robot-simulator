import React from 'react';

function ErrorHandler({ error }) {
  if (!error) return null;

  return (
    <div style={{ color: 'red' }}>
      <h2>Error:</h2>
      <pre>{error}</pre>
    </div>
  );
}

export default ErrorHandler;