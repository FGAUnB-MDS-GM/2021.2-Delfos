import React from "react";

import { RectButtonProps } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Container
} from './styles';

interface Props extends RectButtonProps {
  black?: boolean,
}

export function MenuButton({ black, ...rest }: Props) {
  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Feather
          name="menu"
          size={30}
          color={black ? theme.colors.text : theme.colors.white}
        />
      </Container>
    </GestureHandlerRootView>
  );
}