import { useState } from 'react';

export const useForceUpdate = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);

  return [increment, count];
};
