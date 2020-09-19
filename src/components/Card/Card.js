import React, { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';

import { pluralizeEnglishString } from '../../utils/pluralize';

import './Card.css';
import { InlineLoader } from '../InlineLoader/InlineLoader';

export const Card = ({
  name,
  species,
  gender,
  imageSrc,
  location,
  origin,
  episodes,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);

  const renderLocation = useCallback(
    ({ loading, error, residentsCount, type, dimension }) => {
      if (loading) {
        return <InlineLoader />;
      }

      if (error) {
        return null;
      }
      const population = residentsCount && `population ${residentsCount}`;

      const locationInfo = [dimension, type, population]
        .filter((value) => value)
        .join(', ');

      if (locationInfo) {
        return <span>({locationInfo})</span>;
      }

      return null;
    },
    []
  );

  const episodesFragment = useMemo(() => {
    const { loading, error, list } = episodes;
    if (loading) {
      return <InlineLoader />;
    }

    if (error) {
      return null;
    }

    if (list.length > 5) {
      const firstEpisodes = list.slice(0, 5);

      return expanded ? (
        <span>: {list.join(',')}</span>
      ) : (
        <span>
          : {firstEpisodes.join(',')}{' '}
          <button onClick={() => setExpanded(true)}>show more</button>
        </span>
      );
    }

    return <span>: {list.join(', ')}</span>;
  }, [episodes, expanded]);

  return (
    <div className={clsx('Card', className)}>
      <div className="Card__main">
        <div className="Card__image-container">
          <img
            className="Card__image"
            src={imageSrc}
            alt={name}
            loading="lazy"
          />
        </div>
        <div className="Card__info">
          <h2 className="Card__name">{name}</h2>
          <p className="Card__text">
            {species} - {gender}
          </p>

          <p className="Card__text">
            Location: <b>{location.name}</b> {renderLocation(location)}
          </p>
          <p className="Card__text">
            Origin: <b>{origin.name}</b> {renderLocation(origin)}
          </p>
        </div>
      </div>
      <p className="Card__episodes">
        Played in {pluralizeEnglishString(episodes.total, 'episode')}
        {episodesFragment}
      </p>
    </div>
  );
};
