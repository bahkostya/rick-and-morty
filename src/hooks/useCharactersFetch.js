import { useEffect } from 'react';
import { getCharacter } from 'rickmortyapi';
import { useQueryParam, NumberParam } from 'use-query-params';

import useFetch from './useFetch';

export default function useCharactersFetch({ page }) {
  const [loading, error, data, fetch] = useFetch(getCharacter);
  const [, setPage] = useQueryParam('page', NumberParam);

  useEffect(() => {
    fetch({ page });
    setPage(page);
  }, [fetch, page, setPage]);

  const characters = data?.results || [];
  const totalPages = data?.info?.pages;

  return [loading, characters, totalPages, error];
}
