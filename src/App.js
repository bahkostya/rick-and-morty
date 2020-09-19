import React from 'react';

import { CharactersList } from './components/CharactersList/CharactersList';
import logo from './assets/logo.png';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <header className="App__header">
        <img className="App__logo" src={logo} alt="Rick and Morty" />
      </header>
      <main className="App__main">
        <CharactersList />
      </main>
    </div>
  );
};
