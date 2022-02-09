import React from "react";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Container,
  ToDo,
  DatesAndHour,
  Dates,
  Hours,
  MarkedIcon,
  Details,
} from './styles';


export function TodoCard({ ...rest }: RectButtonProps) {
  const theme = useTheme()

  return (
    <BackgroundLinear>
      <Container>
        <ToDo>
          Aula de Métodos
        </ToDo>
        <Details>
          <DatesAndHour>
            <Dates>
              seg, quart
            </Dates>
            <Hours>
              8:00 - 10:00
            </Hours>
          </DatesAndHour>
          <GestureHandlerRootView>
            <MarkedIcon {...rest}>
              <Feather name="square" size={35} color={theme.colors.text} />
            </MarkedIcon>
          </GestureHandlerRootView>
        </Details>
      </Container>
    </BackgroundLinear>
  );
}