import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Group,
} from './styles';
import { ButtonAdd } from "../ButtonAdd";

export function Groups() {
  const theme = useTheme();

  return (
    <Container>
      <Group >
 
      </Group>
    </Container>
  );
}