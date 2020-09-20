import React, { useState, Fragment } from 'react';
import clsx from 'clsx';

import './ShowMore.css';

export const ShowMore = ({
  buttonClass,
  children,
  truncateCharsCount = 300,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (typeof children !== 'string') {
    console.warn(
      'Children element for ShowMore should be of type string, but received ' +
        typeof children
    );

    return null;
  }

  return (
    <Fragment>
      {expanded || children.length < truncateCharsCount ? (
        children
      ) : (
        <Fragment>
          {children.slice(0, truncateCharsCount)}
          {'... '}
          <button
            className={clsx('ShowMore__button', buttonClass)}
            onClick={() => setExpanded(true)}
          >
            show more
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};
