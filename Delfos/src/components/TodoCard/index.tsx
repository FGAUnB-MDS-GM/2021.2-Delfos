import React, { useState } from "react";
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
  name: string | null;
  trigger: {
    type: string,
    repeat?: boolean;
    hour?: number;
    minute?: number;
    seconds?: number;
    weekday?: number;
  }
}

export function TodoCard({ name, trigger, ...rest }: Props) {
  const theme = useTheme()

  function getDayWeekName(weekDayNumber: number) {
    const days = [
      'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
    ]
    return days[weekDayNumber - 1];
  }

  return (
    <BackgroundLinear>
      <Container>
        <ToDo>
          {name} {trigger.repeat && "loop"}
        </ToDo>
        <Details>
          <DatesAndHour>
            <Dates>
              {trigger.weekday ? getDayWeekName(trigger.weekday) : trigger.type == "daily" ? "diário" : "Único"}
            </Dates>
            <Hours>
              {trigger.hour ? trigger.hour : trigger.seconds} :
              {trigger.minute ? trigger.minute : ""}
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