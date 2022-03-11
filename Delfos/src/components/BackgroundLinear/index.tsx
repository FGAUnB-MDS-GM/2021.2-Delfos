import React, { ReactNode } from "react";
import theme from "../../global/theme";
import { LinearGradientColor } from "./styles";

interface Props {
  children?: ReactNode;
  type?: "secondary";
  checked?: boolean;
}

export function BackgroundLinear({ checked, children, type }: Props) {
  let color1 = theme.colors.primary;
  let color2 = theme.colors.primary_light;

  if (type === "secondary") {
    color1 = theme.colors.secondary_light;
    color2 = theme.colors.secondary;
  }

  if (checked) {
    color1 = theme.colors.primary_dark;
    color2 = theme.colors.primary_dark;
  }

  return (
    <LinearGradientColor colors={[color1, color2]}>
      {children}
    </LinearGradientColor>
  );
}
