import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import theme from '../../global/theme';
import { LinearGradientColor } from './styles';
import { View } from "react-native";

type Props = {
  children?: ReactNode;
  type?: "secondary",
}

export function BackgroundLinear({ children, type }: Props) {

  let color1 = theme.colors.primary;
  let color2 = theme.colors.primary_light;

  if (type === "secondary") {
    color1 = theme.colors.secondary;
    color2 = theme.colors.secondary_light;
  }

  return (
    <LinearGradientColor
      colors={[color1, color2]}
    >
      {children}
    </LinearGradientColor>
  )
}