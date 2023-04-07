import styled from "styled-components";

export const Footer = () => (
  <FooterBox id="footer">
    <CopyrightText>&#174;All rights reserved</CopyrightText>
  </FooterBox>
);

const FooterBox = styled.footer`
  width: 100vw;
  height: 50px;
  background-color: steelblue;
  color: aliceblue;
  text-align: center;
`;

const CopyrightText = styled.p`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
