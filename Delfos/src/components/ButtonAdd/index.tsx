import React from "react";
import {
  GestureHandlerRootView,
  RectButtonProps,
} from "react-native-gesture-handler";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Button } from "./styles";

interface Props extends RectButtonProps {
  icon: any;
}

export function ButtonAdd({ icon, ...rest }: Props) {
  const theme = useTheme();

  return (
    <BackgroundLinear>
      <GestureHandlerRootView>
        <Button {...rest}>
          <Feather name={icon} size={40} color={theme.colors.white} />
        </Button>
      </GestureHandlerRootView>
    </BackgroundLinear>
  );
}
