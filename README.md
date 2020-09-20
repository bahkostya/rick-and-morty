<h2 align="center">🔍 Rick and Morty explorer</h2>

Simple app made using React and [Rick & Morty API](https://rickandmortyapi.com/). It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Solution](#solution)
  - [Data fetching strategy](#data-fetching-strategy)
  - [Hooks](#hooks)

## Getting started

Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

1. To clone repository:

```sh-session
$ git clone https://github.com/bahkostya/rick-and-morty.git
$ cd rick-and-morty
```

2. Install dependencies:

```sh-session
$ yarn install
```

### Available Scripts

In the project directory, you can run:

- ```sh-session
  $ yarn start
  ```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

- ```sh-session
  $ yarn build
  ```

Builds the app for production to the `build` folder. It is minified and the filenames include the hashes.

## Solution

### Data fetching strategy

From the definition the profile of a character should include:

- Image
- Character information (name, species, etc).
- Origin and location information (name, dimension, amount of residents, etc).
- Name of the chapters the character is featured on.

To get all the information from above 3 API calls should be done, as this is how REST endpoints of `rickmortyapi` are designed. The flow of the data retrieval and rendering is following:

1. Information about characters can be fetched by using `getCharacter` imported from 'rickmortyapi' package.
2. List of characters with basic information is rendered (name, species, gender, image, name of location/origin, number of episodes). Loaders are shown to indicate that additional information is loading.
3. Lists of locations/origins/episodes IDs are created from characters data list. Based on IDs 2 more requests are done using `getLocation` and `getEpisode` functions.
4. Dimensions and population of locations and origins are rendered, names of episodes are rendered in each card.

By doing this we have a benefit of showing list of characters with basic information to the user and then loading more about locations, origins and names of episodes.

Other possible approaches to solve this could be:

- "Render-as-you-fetch" approach when React Suspense is ready for data fetching
- Using GraphQL to fetch required data in 1 request

### Hooks

#### `useFetch` - hook for data fetching

Hook for data fetching.

```
const [loading, error, data, fetchData] = useFetch(promiseFn);
```

- `promiseFn` - function for fetching data, returns a promise
- `loading` - return value of loading status
- `error` - error message if `promiseFn` throws an error
- `data` - result of fetched data
- `fetchData(...args)` - function to manually trigger fetch, passes taken arguments to `promiseFn`

Under the hood it uses `useReducer` hook to manage state. Reducer is returning new state according to dispatched actions:

- `FETCH_REQUEST` - dispatched before the request is made to indicate beginning of loading or cleaning up data
- `FETCH_SUCCESS` - dispatched if the request succeeded, new data is added to state
- `FETCH_FAILURE` - dispatched if the request failed, used to indicate the error

#### `useCharactersFetch` - hook for fetching characters

```
const [loading, characters, totalPages, error] = useCharactersFetch({ page: 1 })
```

#### `useEntitiesFetch` - hook for fetching entities (locations, episodes)

```
const [loading, data, error] = useEntitiesFetch(promiseFn, listOfIds)
```

- `promiseFn` - `getLocation` or `getEpisode` imported from 'rickmortyapi'
- `listOfIds` - list of locations/episodes IDs to fetch
