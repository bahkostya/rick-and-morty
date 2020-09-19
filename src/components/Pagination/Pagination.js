import React from 'react';
import clsx from 'clsx';

import './Pagination.css';

export const Pagination = ({ className, total, current, onPageChange }) => {
  if (!total) {
    return null;
  }

  return (
    <div className={clsx('Pagination', className)}>
      {current !== 1 && (
        <button
          className="Pagination__button"
          onClick={() => onPageChange(current - 1)}
        >
          Previous
        </button>
      )}
      {current !== total && (
        <button
          className="Pagination__button"
          onClick={() => onPageChange(current + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};
