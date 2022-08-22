import styled from '@emotion/styled';
import React, { useState } from 'react';

const Scene = styled.div`
  width: 200px;
  height: 200px;
  perspective: 600px;
  margin: 80px;

  & .cube {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 1s;
    transform-style: preserve-3d;
    transform: translateZ(-100px);
  }

  & .cube__face {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid #000;
    color: #fff;
    font-size: 36px;
    opacity: 0.8;
  }

  .cube__face--front {
    transform: rotateY(0deg) translateZ(100px);
    background: tomato;
  }
  .cube__face--right {
    transform: rotateY(90deg) translateZ(100px);
    background: yellow;
    color: #000;
  }
  .cube__face--back {
    transform: rotateY(180deg) translateZ(100px);
    background: green;
  }
  .cube__face--left {
    transform: rotateY(-90deg) translateZ(100px);
    background: blueviolet;
  }
  .cube__face--top {
    transform: rotateX(90deg) translateZ(100px);
    background: blue;
  }
  .cube__face--bottom {
    transform: rotateX(-90deg) translateZ(100px);
    color: #000;
    background: pink;
  }

  .show__front {
    transform: rotateX(0deg);
  }
  .show__right {
    transform: rotateY(-90deg);
  }
  .show__left {
    transform: rotateY(90deg);
  }
  .show__back {
    transform: rotateY(180deg);
  }
  .show__top {
    transform: rotateX(-90deg);
  }
  .show__bottom {
    transform: rotateX(90deg);
  }
`;

type CubeFace = 'front' | 'right' | 'left' | 'back' | 'top' | 'bottom';
const cube: CubeFace[] = ['front', 'back', 'right', 'left', 'top', 'bottom'];

function Cube() {
  const [currentFace, setCurrentFace] = useState<CubeFace>('front');

  const handleChangeCubeFace = (selectedCubeFace: CubeFace) => {
    setCurrentFace(selectedCubeFace);
  };
  return (
    <>
      <Scene>
        <div className={`cube show__${currentFace}`}>
          {cube.map(cubeFace => (
            <div className={`cube__face cube__face--${cubeFace}`} key={`cube-face-${cubeFace}`}>
              {cubeFace}
            </div>
          ))}
        </div>
      </Scene>
      <div>
        {cube.map(cubeFace => (
          <button
            onClick={() => handleChangeCubeFace(cubeFace)}
            key={`cube-face-change-button-${cubeFace}`}
          >
            {cubeFace}
          </button>
        ))}
      </div>
    </>
  );
}

export default Cube;
