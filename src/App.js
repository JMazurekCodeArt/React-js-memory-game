import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import './App.css';

// Lista obrazków (12 par)
const images = [
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png',
  '/fish.png',
  '/spaghetti.png',
  '/steak.png'
];

const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [flippedTiles, setFlippedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [pairsCount, setPairsCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [showingAll, setShowingAll] = useState(true);

  useEffect(() => {
    // Inicjalizacja planszy
    const shuffledTiles = shuffleArray(images);
    setTiles(shuffledTiles);

    // Pokazanie wszystkich kafelków przez 5 sekund
    const timer = setTimeout(() => {
      setShowingAll(false);
    }, 5000);

    // Sprzątanie
    return () => clearTimeout(timer);
  }, []);

  const handleTileClick = (index) => {
    if (flippedTiles.length === 2 || flippedTiles.includes(index) || matchedPairs.includes(index) || showingAll) {
      return;
    }

    const newFlippedTiles = [...flippedTiles, index];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      const [firstIndex, secondIndex] = newFlippedTiles;
      if (tiles[firstIndex] === tiles[secondIndex]) {
        setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
        setPairsCount(pairsCount + 1); // Zwiększ licznik par
      } else {
        setMistakesCount(mistakesCount + 1); // Zwiększ licznik pomyłek
      }

      setTimeout(() => {
        setFlippedTiles([]);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="counters">
        <p>Pairs: {pairsCount}</p>
        <p>Mistakes: {mistakesCount}</p>
      </div>
      <div className="board">
        {tiles.map((image, index) => (
          <Tile
            key={index}
            image={image}
            isFlipped={showingAll || flippedTiles.includes(index) || matchedPairs.includes(index)}
            onClick={() => handleTileClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
