import React from "react";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ToDoProps } from "../../../models/toDos";


import {
  Container,
  ToDo,
  DatesAndHour,
  Dates,
  Hours,
  MarkedIcon,
  Details,
} from './styles';

interface Props extends RectButtonProps, ToDoProps {
  handleDelete: () => void;
  schedulechekedToDo: () => void;
}

export function TodoCard({ message, trigger, checked, handleDelete, schedulechekedToDo, onPress, ...rest }: Props) {
  const theme = useTheme()

  function getDayWeekName(weekDayNumber: number) {
    const days = [
      'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
    ]
    return days[weekDayNumber - 1];
  }

  return (
    <BackgroundLinear checked={checked}>
      <Container>
        <ToDo>
          {message} {trigger.repeat && "loop"}
        </ToDo>
        <Details>
          <DatesAndHour>
            <Dates checked={checked}>
              {trigger.weekday ? getDayWeekName(trigger.weekday) : trigger.type == "daily" ? "diário" : "Único"}
            </Dates>
            <Hours checked={checked}>
              {trigger.hour}
              {trigger.minute}
            </Hours>
          </DatesAndHour>
          {
            checked &&
            <GestureHandlerRootView>
              <MarkedIcon checked={checked} onPress={handleDelete} style={{ marginRight: 5 }}>
                <Feather
                  name={"x-circle"}
                  size={35}
                  color={theme.colors.cancel}
                />
              </MarkedIcon>
            </GestureHandlerRootView>
          }

          <GestureHandlerRootView>
            <MarkedIcon checked={checked} onPress={checked ? schedulechekedToDo : onPress}>
              <Feather
                name={checked ? "check-square" : "square"}
                size={35}
                color={theme.colors.text} />
            </MarkedIcon>
          </GestureHandlerRootView>

        </Details>
      </Container>
    </BackgroundLinear>
  );
}