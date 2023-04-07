import styled from "styled-components";

export const Loader = () => (
  <LoaderBox>
    <LoaderText>Loading...</LoaderText>
  </LoaderBox>
);

const LoaderBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ghostwhite;
  opacity: 0.85;
  user-select: none;
`;

const LoaderText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: 32px bolder;
`;
