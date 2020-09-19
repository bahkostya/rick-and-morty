import React from 'react';
import clsx from 'clsx';

import './InlineLoader.css';

export const InlineLoader = ({ className }) => {
  return (
    <span className={clsx('InlineLoader', className)}>
      <span className="InlineLoader__dot"></span>
      <span className="InlineLoader__dot"></span>
      <span className="InlineLoader__dot"></span>
    </span>
  );
};
