import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  Content,
  EditButton,
} from './styles';

import { NotesProps } from "../../../models/notes";
import { Feather } from '@expo/vector-icons'



export function NotesBox({ id, content, ...rest }: NotesProps & RectButtonProps) {
  return (
    <GestureHandlerRootView>
      <Container { ...rest}>
        <Content>
          {content}
        </Content>
        <EditButton>
          <Feather
            name="edit-3"
            size={20}
          />
        </EditButton>
      </Container>
    </GestureHandlerRootView>
  );
}