import { useReducer, useCallback } from 'react';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...initialState,
        loading: true,
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };

    default:
      throw new Error('Unknown action type received for dataFetchReducer');
  }
};

export default function useFetch(promiseFn) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const fetchData = useCallback(
    async (...params) => {
      if (!promiseFn) {
        return;
      }

      dispatch({ type: FETCH_REQUEST });

      try {
        const response = await promiseFn(...params);

        if (response.error) {
          throw new Error(response.error);
        }

        dispatch({ type: FETCH_SUCCESS, payload: response });
      } catch (error) {
        dispatch({ type: FETCH_FAILURE, error: error.message });
      }
    },
    [promiseFn]
  );

  const { loading, error, data } = state;

  return [loading, error, data, fetchData];
}
