import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 45px;
  justify-content: space-between;
  align-items: center;

  flex-direction: row;
  border-radius: 10px;

  padding: 5px;
  padding-right: 0px;
`;

export const ToDo = styled.Text`
  font-size: 20px;
  font-family: ${({theme})=> theme.fonts.text};
  color: ${({theme})=> theme.colors.text};

`;

export const Details = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const DatesAndHour = styled.View`
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;
export const Dates = styled.Text`
  font-size: 12px;
  font-family: ${({theme})=> theme.fonts.text};
  color: ${({theme})=> theme.colors.text};
`;
export const Hours = styled.Text`
  font-size: 12px;
  font-family: ${({theme})=> theme.fonts.number};
  color: ${({theme})=> theme.colors.text};

`;
export const MarkedIcon = styled(RectButton)`
  width: 45px;
  height: 45px;

  justify-content: center;
  align-items: center;

  background-color: ${({theme})=> theme.colors.secondary};

  border-radius: 10px;
`;

