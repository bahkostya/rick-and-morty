export function getIdFromUrl(url) {
  if (!url) {
    return null;
  }

  const lastSlashIndex = url.lastIndexOf('/');
  const id = parseInt(url.substring(lastSlashIndex + 1), 10);

  return isNaN(id) ? null : id;
}

export function getEntitiesIds(characters) {
  if (!characters) {
    return { locations: [], episodes: [] };
  }

  const entitiesIdsSets = characters.reduce(
    (acc, { origin, location, episode }) => {
      const originId = getIdFromUrl(origin.url);
      if (originId) {
        acc.locations.add(originId);
      }

      const locationId = getIdFromUrl(location.url);
      if (locationId) {
        acc.locations.add(locationId);
      }

      episode.forEach((episodeUrl) => {
        const episodeId = getIdFromUrl(episodeUrl);
        if (episodeId) {
          acc.episodes.add(episodeId);
        }
      });

      return acc;
    },
    { locations: new Set(), episodes: new Set() }
  );

  return {
    locationsIds: [...entitiesIdsSets.locations],
    episodesIds: [...entitiesIdsSets.episodes],
  };
}
