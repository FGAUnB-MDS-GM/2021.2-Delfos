import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100px;
  height: 130px;
  background-color: ${({theme})=> theme.colors.secondary_light};

  padding: 5px;
  margin: 10px;

  justify-content: space-between;
`;

export const Content = styled.Text`
  width: 100%;
  height: 100px;
`;

export const EditButton = styled.View`
  align-self: flex-end;
`;