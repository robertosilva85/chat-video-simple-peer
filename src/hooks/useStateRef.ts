'use client';

import React, { useCallback, useRef, useState } from 'react';

export function useStateRef<T>(
  defaultValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef(value);

  const updateValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (newValueOrCallback) => {
      setValue((currentValue) => {
        const newValue =
          typeof newValueOrCallback === 'function'
            ? (newValueOrCallback as (prevState: T) => T)(currentValue)
            : newValueOrCallback;
        ref.current = newValue;
        return newValue;
      });
    },
    []
  );

  return [value, updateValue, ref];
}
