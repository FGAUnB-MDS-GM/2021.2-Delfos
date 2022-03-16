import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Overlay,
  Content,
  Title,
  InputNameGroup,
  ButtonsView,
} from './styles';

import { CancelButton, ConfirmButton } from "../../screens/AddTodo/styles";

interface Props {
  handleCancelCreateGroup: ()=> void;
  handleConfirmCreateGroup: (newGroupName: string)=> void;
}

export function CreateGroupModal({handleCancelCreateGroup, handleConfirmCreateGroup}: Props) {

  const theme = useTheme();
  const [newGroupName, setNewGroupName] = useState("");

  return (
    <Container>
      <Overlay>
        <Content>
          <Title>
            Nome do Grupo
          </Title>
          <InputNameGroup onChangeText={setNewGroupName} />

          <ButtonsView >
            <GestureHandlerRootView>
              <CancelButton onPress={handleCancelCreateGroup}>
                <Feather
                  name="x"
                  color={theme.colors.white}
                  size={30}
                />
              </CancelButton>
            </GestureHandlerRootView>
            <GestureHandlerRootView>
              <ConfirmButton onPress={()=> handleConfirmCreateGroup(newGroupName)}>
                <Feather
                  name="check"
                  color={theme.colors.white}
                  size={30}
                />
              </ConfirmButton>
            </GestureHandlerRootView>

          </ButtonsView>
        </Content>
      </Overlay>

    </Container>
  );
}