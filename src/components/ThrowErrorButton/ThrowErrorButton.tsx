import { useState } from 'react';

export const ThrowErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) throw new Error('Something went wrong in ThrowErrorButton!');

  return (
    <button className="button error-button" onClick={() => setHasError(true)}>
      Throw error
    </button>
  );
};
