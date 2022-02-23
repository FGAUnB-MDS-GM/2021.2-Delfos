import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`


  flex-direction: row;

`;

export const WeekDayView = styled.View`
  border-radius: 5px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.text};

  margin: 0px 5px;
`;

export const WeekDay = styled(RectButton)`
  border-radius: 5px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.text};

  width: 35px;
  height: 35px;

  background-color: ${({ theme }) => theme.colors.secondary};

  align-items: center;
  justify-content: center;
`;

export const WeekDayText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ theme }) => theme.colors.text};

`;