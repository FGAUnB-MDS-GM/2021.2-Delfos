import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View } from 'react-native';
import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  WeekDayView,
  WeekDay,
  WeekDayText,

} from './styles';

const days = [
  'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'
]

interface Props extends RectButtonProps {
  setWeekDay: (weekDay: number) => void;
  weekDaySelected: number
}

const eu = days.indexOf("D")

export function WeekDayButton({ weekDaySelected, setWeekDay, ...rest }: Props) {
  return (
    <Container>
      {days.map(item => (
        <WeekDayView key={item.toString()}>
          <GestureHandlerRootView>
            <WeekDay
              onPress={() => setWeekDay(days.indexOf(item) + 1)}
              weekDaySelected={weekDaySelected}
              itemIndex={days.indexOf(item) + 1}
              {...rest}
            >

              <WeekDayText
                weekDaySelected={weekDaySelected}
                itemIndex={days.indexOf(item) + 1}
              >
                {item}
              </WeekDayText>

            </WeekDay>
          </GestureHandlerRootView>
        </WeekDayView>
      ))
      }
    </Container>
  );
}