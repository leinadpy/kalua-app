import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
    fill: rgba(135, 182, 194, 0.15);
  }
`;

const Fondo = () => {
  return (
    <>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fillOpacity="1"
          d="M0,224L30,229.3C60,235,120,245,180,245.3C240,245,300,235,360,208C420,181,480,139,540,117.3C600,96,660,96,720,122.7C780,149,840,203,900,202.7C960,203,1020,149,1080,122.7C1140,96,1200,96,1260,128C1320,160,1380,224,1410,256L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </Svg>
      <Svg />
    </>
  );
};

export default Fondo;
