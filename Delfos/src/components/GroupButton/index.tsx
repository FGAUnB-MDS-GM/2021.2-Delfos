import React from "react";
import { Text } from "react-native";
import { GestureHandlerRootView, RectButton, RectButtonProps } from "react-native-gesture-handler";
import {Feather} from '@expo/vector-icons';

import {
  Container,
  ViewButton,
  TextButton,
} from './styles';

interface Props extends RectButtonProps {
  id: string;
  disableGroup: (id: string)=> void;
}

export function GroupButton({ id, disableGroup, ...rest }: Props) {
  return (
    <Container>
      <GestureHandlerRootView>
        <RectButton style={{ width: "100%", height: "100%" }}{...rest}>
          <ViewButton>
            <TextButton>{id}</TextButton>
          </ViewButton>
        </RectButton>
      </GestureHandlerRootView>

      <GestureHandlerRootView>
        <RectButton onPress={()=> disableGroup}>
          <Feather
            name="toggle-left"
            size= {40}
          />
        </RectButton>
      </GestureHandlerRootView>
    </Container>
  );
}