import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

export const LinearGradientColor = styled(LinearGradient).attrs({
  style: {
    flex: 1,
  },
})`
  border-radius: 10px;
`;