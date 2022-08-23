import styled from '@emotion/styled';
import React, { useState } from 'react';

const Scene = styled.div`
  width: 300px;
  height: 200px;
  perspective: 500px;

  .box {
    width: 300px;
    height: 200px;
    position: relative;
    margin: 70px;
    transition: transform 1s;
    transform-style: preserve-3d;
    transform: translateZ(-50px);

    &.show-front {
      transform: translateZ(-50px) rotateY(0deg);
    }
    &.show-back {
      transform: translateZ(-50px) rotateY(-180deg);
    }
    &.show-right {
      transform: translateZ(-150px) rotateY(-90deg);
    }
    &.show-left {
      transform: translateZ(-150px) rotateY(90deg);
    }
    &.show-top {
      transform: translateZ(-100px) rotateX(-90deg);
    }
    &.show-bottom {
      transform: translateZ(-100px) rotateX(90deg);
    }
  }

  .box__face {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 1px solid #000;
    color: #fff;
    font-size: 36px;
  }

  .box__face--front,
  .box__face--back {
    width: 300px;
    height: 200px;
  }

  .box__face--right,
  .box__face--left {
    width: 100px;
    height: 200px;
    left: 100px;
  }

  .box__face--top,
  .box__face--bottom {
    width: 300px;
    height: 100px;
    top: 50px;
  }

  .box__face--front {
    transform: rotateY(0deg) translateZ(50px);
    background: hsla(0, 100%, 50%, 0.7);
  }
  .box__face--right {
    transform: rotateY(90deg) translateZ(150px);
    background: hsla(60, 100%, 50%, 0.7);
    color: #000;
  }
  .box__face--back {
    transform: rotateY(180deg) translateZ(50px);
    background: hsla(120, 100%, 50%, 0.7);
  }
  .box__face--left {
    transform: rotateY(-90deg) translateZ(150px);
    background: hsla(180, 100%, 50%, 0.7);
  }
  .box__face--top {
    transform: rotateX(90deg) translateZ(100px);
    background: hsla(240, 100%, 50%, 0.7);
  }
  .box__face--bottom {
    transform: rotateX(-90deg) translateZ(100px);
    background: hsla(300, 100%, 50%, 0.7);
  }
`;

const Controls = styled.div`
  margin: 70px;

  & button {
    margin-right: 6px;
  }
`;

type BoxFace = 'front' | 'right' | 'left' | 'back' | 'top' | 'bottom';
const box: BoxFace[] = ['front', 'back', 'right', 'left', 'top', 'bottom'];

function Box() {
  const [currentBoxFace, setCurrentBoxFace] = useState<BoxFace>('front');

  const handleChangeBoxFace = (boxFace: BoxFace) => {
    setCurrentBoxFace(boxFace);
  };
  return (
    <>
      <Scene>
        <div className={`box show-${currentBoxFace}`}>
          {box.map(boxFace => (
            <div className={`box__face box__face--${boxFace}`} key={`box-face-${boxFace}`}>
              {boxFace}
            </div>
          ))}
        </div>
      </Scene>
      <Controls>
        {box.map(boxFace => (
          <button
            onClick={() => handleChangeBoxFace(boxFace)}
            key={`cube-face-change-button-${boxFace}`}
          >
            {boxFace}
          </button>
        ))}
      </Controls>
    </>
  );
}

export default Box;
