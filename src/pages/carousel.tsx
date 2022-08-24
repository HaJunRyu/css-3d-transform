import styled from '@emotion/styled';
import React, { useState } from 'react';
import affa from '../assets/images/에프파.png';
import sixtwosevenone from '../assets/images/6271.png';
import gonggam from '../assets/images/공감해조.png';
import ggirriggirri from '../assets/images/끼리끼리.png';
import mashupbang from '../assets/images/매시업방위대.png';
import branding from '../assets/images/브랜딩팀.png';
import removedBranding from '../assets/images/removed-브랜딩팀.png';
import jungsin from '../assets/images/정신머리.png';
import hMM from '../assets/images/HMM.png';
import ladder from '../assets/images/Ladder.png';

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
  animation: down 1s ease-in;
`;

const Scene = styled.div`
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

  width: 200px;
  height: 340px;
  position: relative;
  perspective: 1000px;
  margin: 250px auto;

  & .carousel__wrapper {
    transform-style: preserve-3d;
    animation: turn 5s infinite linear 1s;
  }

  & .carousel {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    animation: carouselRender 1s;
  }

  & .carousel__cell {
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
  }
`;

interface CarouselItem {
  teamName: string;
  src: string;
  removedSrc: string;
  isRemoving: boolean;
}

function Carousel() {
  const [carousel, setCarousel] = useState<CarouselItem[]>([
    { teamName: 'affa', src: affa, isRemoving: false, removedSrc: removedBranding },
    {
      teamName: 'sixtwosevenone',
      src: sixtwosevenone,
      isRemoving: false,
      removedSrc: removedBranding,
    },
    { teamName: 'gonggam', src: gonggam, isRemoving: false, removedSrc: removedBranding },
    { teamName: 'ggirriggirri', src: ggirriggirri, isRemoving: false, removedSrc: removedBranding },
    { teamName: 'mashupbang', src: mashupbang, isRemoving: false, removedSrc: removedBranding },
    { teamName: 'branding', src: branding, isRemoving: false, removedSrc: removedBranding },
    { teamName: 'jungsin', src: jungsin, isRemoving: false, removedSrc: removedBranding },
    { teamName: 'hMM', src: hMM, isRemoving: false, removedSrc: removedBranding },
    { teamName: 'ladder', src: ladder, isRemoving: false, removedSrc: removedBranding },
  ]);

  const [removedItems, setRemovedItems] = useState<CarouselItem[]>([]);

  const randomIndex = Math.floor(Math.random() * carousel.length);

  const handleRandomRemoveCarousel = () => {
    const removeItem = carousel.find((_, index) => index === randomIndex);
    if (!removeItem) return;

    setCarousel(pre =>
      pre.map((carouselItem, index) =>
        index === randomIndex ? { ...carouselItem, isRemoving: true } : carouselItem
      )
    );
    setTimeout(() => setCarousel(pre => pre.filter((_, index) => index !== randomIndex)), 500);

    setRemovedItems(pre => [...pre, removeItem]);
  };
  return (
    <>
      <Container>
        <div>
          <div>
            <button onClick={handleRandomRemoveCarousel}>뽑기</button>
          </div>
        </div>
        <Scene>
          <div className="carousel__wrapper">
            <div className="carousel">
              {carousel.map(({ teamName, src, isRemoving }, index) => {
                const rotateY = (360 / carousel.length) * index;
                const translateZ = Math.round(
                  (180 * 1.35) / 2 / Math.tan(Math.PI / carousel.length)
                );
                return (
                  <img
                    src={src}
                    alt=""
                    className="carousel__cell"
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${
                        translateZ > 0 ? translateZ : 100
                      }px) ${isRemoving ? 'translateY(-1000px)' : ''}`,
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
