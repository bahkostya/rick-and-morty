import { useEffect } from 'react';
import { getCharacter } from 'rickmortyapi';

import useFetch from './useFetch';

export default function useCharactersFetch({ page = 1 }) {
  const [loading, error, data, fetch] = useFetch(getCharacter);

  useEffect(() => {
    fetch({ page });
  }, [fetch, page]);

  const characters = data?.results ? data.results : [];
  const totalPages = data?.info?.pages;

  return [loading, characters, totalPages, error];
}
