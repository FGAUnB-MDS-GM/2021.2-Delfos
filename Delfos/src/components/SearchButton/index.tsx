import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Container,
} from './styles';
import { useTheme } from "styled-components";

interface Props extends RectButtonProps {
}

export function SearchButton({ ...rest }: Props) {

  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Feather
          name="search"
          size={24}
          color={theme.colors.text}
        />
      </Container>
    </GestureHandlerRootView>
  );
}