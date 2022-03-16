import styled from "styled-components/native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { ReactNode } from "react";

export const LinearGradientColor = styled(LinearGradient).attrs({
  style: {
    flex: 1,
  },
})`
  border-radius: 10px;
  margin-bottom: 10px;
`;