import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import affa from '../assets/images/에프파.png';
import six271 from '../assets/images/6271.png';
import gonggam from '../assets/images/공감해조.png';
import ggirriggirri from '../assets/images/끼리끼리.png';
import mashupbang from '../assets/images/매시업방위대.png';
import branding from '../assets/images/브랜딩팀.png';
import jungsin from '../assets/images/정신머리.png';
import hMM from '../assets/images/HMM.png';
import ladder from '../assets/images/Ladder.png';
import affaRemoved from '../assets/images/에프파-removed.png';
import six271Removed from '../assets/images/6271-removed.png';
import gonggamRemoved from '../assets/images/공감해조-removed.png';
import ggirriggirriRemoved from '../assets/images/끼리끼리-removed.png';
import mashupbangRemoved from '../assets/images/매시업방위대-removed.png';
import brandingRemoved from '../assets/images/브랜딩팀-removed.png';
import jungsinRemoved from '../assets/images/정신머리-removed.png';
import hMMRemoved from '../assets/images/HMM-removed.png';
import ladderRemoved from '../assets/images/Ladder-removed.png';
import { css } from '@emotion/react';

const carouselArr = [
  { teamName: 'affa', src: affa, isRemoving: false, removedSrc: affaRemoved },
  { teamName: '6271', src: six271, isRemoving: false, removedSrc: six271Removed },
  { teamName: 'gonggam', src: gonggam, isRemoving: false, removedSrc: gonggamRemoved },
  {
    teamName: 'ggirriggirri',
    src: ggirriggirri,
    isRemoving: false,
    removedSrc: ggirriggirriRemoved,
  },
  { teamName: 'mashupbang', src: mashupbang, isRemoving: false, removedSrc: mashupbangRemoved },
  { teamName: 'branding', src: branding, isRemoving: false, removedSrc: brandingRemoved },
  { teamName: 'jungsin', src: jungsin, isRemoving: false, removedSrc: jungsinRemoved },
  { teamName: 'hMM', src: hMM, isRemoving: false, removedSrc: hMMRemoved },
  { teamName: 'ladder', src: ladder, isRemoving: false, removedSrc: ladderRemoved },
];

const Container = styled.div`
  display: flex;
  background-color: #000;
  border: 1px solid transparent;
`;

const DeletedItemContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const RemovedTeam = styled.img`
  @keyframes down {
    from {
      transform: translateY(-2000px);
    }
    to {
      transform: translateY(0px);
    }
  }

  width: 275px;
  height: 110px;
  border: 2px solid black;
  animation: down 3s 2s ease-in both;
`;

const Scene = styled.div<{
  randomIndex: number;
  carouselLength: number;
  isRemoving: boolean;
  rotateYDeg: number;
}>`
  ${({ randomIndex, carouselLength, isRemoving, rotateYDeg }) => css`
    @keyframes carouselRender {
      0% {
        transform: translateZ(-1000px);
      }
      50% {
        transform: translateZ(-5000px);
      }
      100% {
        transform: translateZ(0px);
      }
    }

    @keyframes turn {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: rotateY(-360deg);
      }
    }

    @keyframes remove {
      from {
        transform: rotateY(0deg);
      }
      to {
        transform: ${`rotateY(-${rotateYDeg}deg)`};
      }
    }

    width: 200px;
    height: 340px;
    position: relative;
    perspective: 1000px;
    margin: 250px auto;

    & .carousel__wrapper {
      transform-style: preserve-3d;
      transition: transform 1s;
      animation: ${isRemoving ? 'remove 3s both' : 'turn 5s infinite linear 1s'};
    }

    & .carousel {
      width: 100%;
      height: 100%;
      position: absolute;
      transform-style: preserve-3d;
      animation: carouselRender 1s;
    }
  `}
`;

const CarouselCell = styled.img<{ isRemoving: boolean; rotateY: number; translateZ: number }>`
  ${({ isRemoving, rotateY, translateZ }) => css`
    @keyframes up {
      10% {
        transform: translateY(0px) ${`rotateY(${rotateY}deg) translateZ(${translateZ}px)`};
      }
      70% {
        transform: translateY(0px) ${`rotateY(${rotateY}deg) translateZ(${translateZ + 100}px)`};
      }
      100% {
        transform: translateY(-1000px) ${`rotateY(${rotateY}deg) translateZ(${translateZ + 100}px)`};
      }
    }

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 180px;
    height: 320px;
    left: 10px;
    top: 10px;
    color: #fff;
    font-size: 36px;
    border: 2px solid black;
    transition: transform 1s;
    animation: ${isRemoving ? 'up 1s 3.5s both' : ''};
  `}
`;

interface CarouselItem {
  teamName: string;
  src: string;
  removedSrc: string;
  isRemoving: boolean;
}

function Carousel() {
  const [carousel, setCarousel] = useState<CarouselItem[]>(carouselArr);

  const [removedItems, setRemovedItems] = useState<CarouselItem[]>([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * carousel.length));

  const handleRandomRemoveCarousel = () => {
    const removeItem = carousel.find((_, index) => index === randomIndex);
    if (!removeItem) return;

    setIsRemoving(true);

    setCarousel(pre =>
      pre.map((carouselItem, index) =>
        index === randomIndex ? { ...carouselItem, isRemoving: true } : carouselItem
      )
    );
    setTimeout(() => {
      setCarousel(carousel.filter((_, index) => index !== randomIndex));

      const randomValue = Math.floor(Math.random() * (carousel.length - 1));

      setIsRemoving(false);
      setRandomIndex(randomValue);
    }, 5500);
    setRemovedItems(pre => [...pre, removeItem]);
  };

  const removeItemRotateYDeg = (360 / carousel.length) * randomIndex * (carousel.length + 1);

  return (
    <>
      <Container>
        <div>
          <div>
            <button onClick={handleRandomRemoveCarousel}>뽑기</button>
          </div>
        </div>
        <Scene
          randomIndex={randomIndex}
          carouselLength={carousel.length}
          rotateYDeg={removeItemRotateYDeg || 360}
          isRemoving={isRemoving}
        >
          <div className="carousel__wrapper">
            <div className="carousel">
              {carousel.map(({ teamName, src, isRemoving }, index) => {
                const rotateY = (360 / carousel.length) * index;
                const translateZ = Math.round(
                  (180 * 1.35) / 2 / Math.tan(Math.PI / carousel.length)
                );
                return (
                  <CarouselCell
                    rotateY={rotateY}
                    translateZ={translateZ}
                    isRemoving={isRemoving}
                    src={src}
                    alt=""
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${
                        translateZ > 0 ? translateZ : 100
                      }px)`,
                    }}
                    key={`item-${teamName}`}
                  />
                );
              })}
            </div>
          </div>
        </Scene>
        <DeletedItemContainer>
          {removedItems.map(({ teamName, removedSrc }) => {
            return <RemovedTeam src={removedSrc} alt="" key={`item-${teamName}`} />;
          })}
        </DeletedItemContainer>
      </Container>
    </>
  );
}

export default Carousel;
