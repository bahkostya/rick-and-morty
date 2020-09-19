import React, { useState, Fragment, useCallback } from 'react';
import { getLocation, getEpisode } from 'rickmortyapi';
import { useQueryParam, NumberParam } from 'use-query-params';

import { Card } from '../Card/Card';
import useCharactersFetch from '../../hooks/useCharactersFetch';
import useEntitiesFetch from '../../hooks/useEntitiesFetch';
import { getEntitiesIds, getIdFromUrl } from '../../utils/entities';
import { Pagination } from '../Pagination/Pagination';

import './CharactersList.css';

export const CharactersList = () => {
  const [initialPage] = useQueryParam('page', NumberParam);
  const [page, setPage] = useState(initialPage || 1);

  const [
    charactersLoading,
    charactersData,
    totalPages,
    charactersError,
  ] = useCharactersFetch({ page });

  const { locationsIds, episodesIds } = charactersData
    ? getEntitiesIds(charactersData)
    : {};

  const [locationsLoading, locationsData, locationsError] = useEntitiesFetch(
    getLocation,
    locationsIds
  );
  const [episodesLoading, episodesData, episodesError] = useEntitiesFetch(
    getEpisode,
    episodesIds
  );

  const getFullLocation = useCallback(
    (location, allLocations) => {
      const { dimension, residents = [], type } =
        allLocations.find(
          (locationData) => getIdFromUrl(location.url) === locationData.id
        ) || {};

      return {
        loading: locationsLoading,
        error: locationsError,
        name: location.name,
        dimension,
        residentsCount: residents.length,
        type,
      };
    },
    [locationsLoading, locationsError]
  );

  const getFullEpisodes = useCallback(
    (episode) => {
      const list = episode.reduce((acc, url) => {
        const episodeName = episodesData.find(
          ({ id }) => getIdFromUrl(url) === id
        )?.name;

        return episodeName ? [...acc, episodeName] : acc;
      }, []);

      return {
        loading: episodesLoading,
        error: episodesError,
        total: episode.length,
        list,
      };
    },
    [episodesData, episodesLoading, episodesError]
  );

  if (charactersLoading) {
    return 'LOADING';
  }

  if (charactersError) {
    return 'Something went wrong';
  }

  return (
    <section className="CharactersList">
      {charactersData.map(
        ({ id, name, species, gender, image, location, origin, episode }) => (
          <Card
            className="CharactersList__card"
            key={id}
            name={name}
            species={species}
            gender={gender}
            imageSrc={image}
            location={getFullLocation(location, locationsData)}
            origin={getFullLocation(origin, locationsData)}
            episodes={getFullEpisodes(episode)}
          />
        )
      )}
      <Pagination total={totalPages} current={page} onPageChange={setPage} />
    </section>
  );
};
