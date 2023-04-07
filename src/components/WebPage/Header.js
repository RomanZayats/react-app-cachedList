import styled from "styled-components";

export const Header = () => (
  <HeaderBox>
    <WelcomeText>Header</WelcomeText>
  </HeaderBox>
);

const HeaderBox = styled.header`
  width: 100vw;
  min-height: 50px;
  position: fixed;
  left: 0;
  top: 0;
  background-color: steelblue;
  color: aliceblue;
  text-align: center;
`;

const WelcomeText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
