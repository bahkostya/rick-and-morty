import React from 'react';

import { CharactersList } from './components/CharactersList/CharactersList';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <header className="App__header">123</header>
      <main className="App__main">
        <CharactersList />
      </main>
    </div>
  );
};
