import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Container,
} from './styles';
import { useTheme } from "styled-components";

interface Props extends RectButtonProps {
  addNotes?: boolean;
}

export function RefreshButton({ addNotes, ...rest }: Props) {

  const theme = useTheme();

  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        <Feather
          name={addNotes ? "plus" : "refresh-cw"}
          size={24}
          color={addNotes ? theme.colors.primary :theme.colors.text}
        />
      </Container>
    </GestureHandlerRootView>
  );
}