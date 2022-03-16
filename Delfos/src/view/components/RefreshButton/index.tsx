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

export function RefreshButton({ ...rest }: Props) {

  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Feather
          name="refresh-cw"
          size={24}
          color={theme.colors.text}
        />
      </Container>
    </GestureHandlerRootView>
  );
}