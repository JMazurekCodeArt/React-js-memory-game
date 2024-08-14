import React from 'react';
import './App.css'; // Importujemy główny plik CSS

const Tile = ({ image, isFlipped, onClick }) => {
  return (
    <div className={`tile ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="tile-inner">
        <div className="tile-cover"></div>
        <div
          className="tile-content"
          style={{ backgroundImage: isFlipped ? `url(${image})` : 'none' }}
        >
          {/* Zawartość kafelka */}
        </div>
      </div>
    </div>
  );
};

export default Tile;
