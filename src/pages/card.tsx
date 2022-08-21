import React, { useState } from 'react';
import '../styles/card.scss';

type Props = {};

function Card({}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className={`scene`}>
      <div className={`card ${isFlipped && 'is-flipped'}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="card__face card__face--front">front</div>
        <div className="card__face card__face--back">back</div>
      </div>
    </div>
  );
}

export default Card;
