import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #30E4CF;
`;

export const LogoImage = styled.Image.attrs({
  source: require('../../components/assets/Logo.png.png'),
  width: 100,
  height: 100,
})`
`;