import { Header, Main, Footer } from "../components";
import styled from "styled-components";

export const HomePage = () => (
  <HomePageBox>
    <Header />
    <Main />
    <Footer />
  </HomePageBox>
);

const HomePageBox = styled.section`
  //background-color: ghostwhite;
  //position: relative;
`;
