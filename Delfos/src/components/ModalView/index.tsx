import React, { ReactNode } from "react";
import {
  View,
  Modal,
  ModalProps,
  TouchableWithoutFeedback,
} from "react-native";
import { BackgroundLinear } from "../BackgroundLinear";
import { Groups } from "../Groups";

import { Overlay, Container, Bar } from "./styles";

interface Props extends ModalProps {
  children: ReactNode;
}

export function ModalView({ children, ...rest }: Props) {
  return (
    <Modal transparent animationType="slide" statusBarTranslucent {...rest}>
      <Overlay>
        <Container>
          <BackgroundLinear type="secondary">
            <Bar />
            {children}
          </BackgroundLinear>
        </Container>
      </Overlay>
    </Modal>
  );
}