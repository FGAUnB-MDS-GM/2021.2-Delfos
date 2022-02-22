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

interface Props extends RectButtonProps {
  name?: string;
}

export function TodoCard({ name, ...rest }: Props) {
  const theme = useTheme()

  return (
    <BackgroundLinear>
      <Container>
        <ToDo>
          {name}
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