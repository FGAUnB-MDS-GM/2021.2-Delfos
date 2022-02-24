import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

interface Props {
  weekDaySelected: number
  itemIndex: number
}

export const Container = styled.View`

  flex-direction: row;

`;

export const WeekDayView = styled.View`
  border-radius: 5px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.text};

  margin: 0px 5px;
`;

export const WeekDay = styled(RectButton)<Props>`
  border-radius: 5px;
  border-width: 3px;
  border-color: ${({ theme }) => theme.colors.text};

  width: 35px;
  height: 35px;

  background-color: ${({ weekDaySelected, itemIndex, theme }) => weekDaySelected == itemIndex ? theme.colors.primary : theme.colors.secondary};

  align-items: center;
  justify-content: center;
`;

export const WeekDayText = styled.Text<Props>`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({ weekDaySelected, itemIndex, theme }) => weekDaySelected == itemIndex ? theme.colors.secondary : theme.colors.text};

`;