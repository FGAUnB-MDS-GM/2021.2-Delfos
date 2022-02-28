import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 24px;
`;

export const Group = styled.View`
  width: 80%;
  background-color: ${({theme})=> theme.colors.primary};
  height: 200px;
`;