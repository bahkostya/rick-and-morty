import { useEffect } from 'react';

import useFetch from './useFetch';

export default function useEntitiesFetch(promiseFn, ids = []) {
  const [loading, error, data, fetch] = useFetch(
    ids.length && promiseFn ? promiseFn : null
  );

  const idsString = ids.toString();

  useEffect(() => {
    fetch(ids);
  }, [fetch, idsString]); // eslint-disable-line react-hooks/exhaustive-deps

  return [loading, makeArrayFromData(data), error];
}

function makeArrayFromData(data) {
  if (!data) {
    return [];
  }

  return Array.isArray(data) ? data : [data];
}
