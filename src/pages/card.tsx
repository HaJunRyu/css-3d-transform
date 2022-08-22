import styled from '@emotion/styled';
import React, { useState } from 'react';

type Props = {};

const Scene = styled.div`
  width: 200px;
  height: 260px;
  perspective: 600px; // 3D 효과를 주기 위함

  & .card {
    width: 100%;
    height: 100%;
    position: relative; // 하위 요소에서 absolute를 사용하기 위함
    transition: transform 1s;
    transform-style: preserve-3d; // perspective의 자식 요소의 자식(하위)요소에도 3D 효과를 적용하기 위함
  }

  & .card__face {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute; // 앞, 뒷면의 카드를 겹쳐주기 위함
    height: 100%;
    width: 100%;
    backface-visibility: hidden; // 2개 요소를 겹칠때 무조건 형제 요소중 가장 마지막가 나머지 요소를 가릴것이기 때문에 뒤집었을때 숨김 처리 하기 위함
    color: #fff;
    font-size: 36px;
  }

  & .card__face--front {
    background: red;
  }

  & .card__face--back {
    background: blue;
    transform: rotateY(180deg); // Y축을 기준으로 180도 회전시킨다. (Y축으로 회전시키는게 아님)
  }

  & .card.is-flipped {
    transform: rotateY(180deg);
  }
`;

function Card({}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <Scene>
      <div className={`card ${isFlipped && 'is-flipped'}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="card__face card__face--front">front</div>
        <div className="card__face card__face--back">back</div>
      </div>
    </Scene>
  );
}

export default Card;
