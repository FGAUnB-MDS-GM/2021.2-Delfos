import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView, RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";

import {
  Container,
  ViewButton,
  TextButton,
} from './styles';


interface Props extends RectButtonProps {
  id: string;
  disableGroup: (id: string, enable: boolean) => void;
  deleteGroup: (id: string, enable: boolean) => void;
  enable: boolean;
}

export function GroupButton({ id,  enable, disableGroup, deleteGroup, ...rest }: Props) {

  const theme = useTheme();

  return (
    <Container>
      <GestureHandlerRootView>
        <RectButton style={{ width: "100%", height: "100%" }}{...rest}>
          <ViewButton>
            <TextButton>{id}</TextButton>
          </ViewButton>
        </RectButton>
      </GestureHandlerRootView>

      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <GestureHandlerRootView>
          <RectButton onPress={() => deleteGroup(id, enable)} style={{marginHorizontal: 15}}>
            <Feather
              name="x-circle"
              size={30}
              color={theme.colors.cancel}
            />
          </RectButton>
        </GestureHandlerRootView>

        <GestureHandlerRootView>
          <RectButton onPress={() => disableGroup(id, enable)}>
            {enable ?
              <Feather
                name="toggle-left"
                size={40}
                color={theme.colors.white}
              />
              : <Feather
                name="toggle-right"
                size={40}
                color={theme.colors.text}
              />
            }
          </RectButton>
        </GestureHandlerRootView>
      </View>
    </Container>
  );
}