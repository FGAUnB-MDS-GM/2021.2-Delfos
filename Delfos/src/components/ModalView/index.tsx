import React, { ReactNode } from "react";
import { Modal, ModalProps, TouchableWithoutFeedback } from "react-native";
import { BackgroundLinear } from "../BackgroundLinear";

import {
  Overlay,
  Container,
  Bar,
} from './styles';

type Props = ModalProps & {
  children: ReactNode;
  closeModal: () => void;
}

export function ModalView({ children, closeModal, ...rest }: Props) {
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      {...rest}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <Overlay>
          <Container>
            <BackgroundLinear type="secondary">
              <Bar />
              {children}
            </BackgroundLinear>
          </Container>
        </Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}