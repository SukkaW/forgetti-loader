/* eslint-disable @typescript-eslint/ban-ts-comment -- fixture */
/* eslint-disable import/no-unresolved -- fixture */
// @ts-nocheck
import { useState, useRef, useCallback } from 'preact/hooks';
import { memo } from 'preact/compat';

function Sukka() {
  const [count, setCount] = useState(0);

  const singletonRef = useRef<AbortController | null>(null);

  if (!singletonRef.current) {
    singletonRef.current = new AbortController();
  }

  const handleButtonClick = useCallback(() => setCount(count => count + 1), []);

  if (count > 10) return null;

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleButtonClick}>Increment</button>

      {count > 10 && (
        <p>Count is higher than 10</p>
      )}
      <button disabled={count > 0} onClick={() => setCount(0)}>Reset Count</button>
    </div>
  );
}

export default memo(Sukka);
