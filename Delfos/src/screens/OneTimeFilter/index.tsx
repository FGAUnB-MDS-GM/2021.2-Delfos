import React from "react";
import { Alert } from "react-native";
import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { TodoCard } from "../../components/TodoCard";

import {
  Container,
  Header,
  ButtonGroups,
  HeaderTitle,
  TitleBox,
  Title,
  SubTitle,
  Listagem,
} from './styles';

export function OneTimeFilter() {

  function handleOpenModalGrupos() {
    Alert.alert("abrir modal")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }
  function handleTest() {
    Alert.alert("teste2")
    /* marcar como feito e desfeito*/
  }

  return (
    <Container>
      <BackgroundLinear>
        <Header>
          <ButtonGroups>
            <MenuButton
              onPress={handleOpenModalGrupos}
            />
          </ButtonGroups>
          <HeaderTitle>
            <TitleBox>
              <Title>
                Just Do it!
              </Title>
            </TitleBox>
            <SubTitle>
              Alarmes únicos
            </SubTitle>
          </HeaderTitle>
        </Header>
      </BackgroundLinear>

      <Listagem>
        <TodoCard
          name={"teste"}
          trigger={{type: "teste"}}
          onPress={handleTest}
        />
      </Listagem>
    </Container>
  );
}