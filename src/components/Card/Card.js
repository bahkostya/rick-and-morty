import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';

import { pluralizeEnglishString } from '../../utils/pluralize';
import { InlineLoader } from '../InlineLoader/InlineLoader';
import { ShowMore } from '../ShowMore/ShowMore';

import './Card.css';

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
  const renderLocation = useCallback(
    ({ loading, error, residentsCount, type, dimension }) => {
      if (loading) {
        return <InlineLoader className="Card__loader" />;
      }

      if (error) {
        return null;
      }

      const population =
        residentsCount && pluralizeEnglishString(residentsCount, 'inhabitant');

      const locationInfo = [dimension, type, population]
        .filter((value) => value)
        .join(', ');

      return locationInfo;
    },
    []
  );

  const { loading, error, list } = episodes;
  const episodesFragment = useMemo(() => {
    if (loading) {
      return <InlineLoader className="Card__loader" />;
    }

    return !error && <ShowMore>{list.join(', ')}</ShowMore>;
  }, [loading, error, list]);

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
            <span className="Card__label">Location: </span>
            <b>{location.name}</b> {renderLocation(location)}
          </p>
          <p className="Card__text">
            <span className="Card__label">Origin: </span>
            <b>{origin.name}</b> {renderLocation(origin)}
          </p>
        </div>
      </div>
      <p className="Card__episodes">
        <b className="Card__label">
          Played in {pluralizeEnglishString(episodes.total, 'episode')}:{' '}
        </b>
        {episodesFragment}
      </p>
    </div>
  );
};
