import React, { useCallback, useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';

import {
  Container,
  Header,
  ButtonGroups,
  HeaderHome,
  Title,
  Search,
  SearchInput,
  Listagem,
  Footer,
  ButtonAddTodo,
  TitleBox,
  Content,
} from './styles';

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { SearchButton } from "../../components/SearchButton";
import { Alert } from "react-native";
import { TodoCard } from "../../components/TodoCard";
import { useNavigation } from "@react-navigation/native";
import { NotificationRequest } from "expo-notifications";


export function Home() {
  const theme = useTheme();
  const [alarmsArray, setAlarmsArray] = useState<NotificationRequest[]>([]);
  const { navigate } = useNavigation();

  function handleOpenModalGrupos() {
    Alert.alert("abrir modal")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }

  function handleSearch() {
    Alert.alert("Buscando ToDos pelo nome")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }

  function handleTest(idTodo: string) {
    Alert.alert(`testando o btt ${idTodo}`)
    /* teste seo  btt funciona*/
  }

  function handleAdd() {
    Alert.alert("Adicionar um Todo para fazer")
    /* aidicona um todo e deve encaminhar para telade criação de ToDo*/
    navigate('AddTodo');

  }

  async function getAlarms() {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    setAlarmsArray(response);
    console.log(response);
  }

  useFocusEffect(useCallback(() => {
    getAlarms();
  }, []));

  return (
    <Container>
      <Content>
        <BackgroundLinear>
          <Header>
            <ButtonGroups>
              <MenuButton
                onPress={handleOpenModalGrupos}
              />
            </ButtonGroups>
            <HeaderHome>
              <TitleBox>
                <Title>
                  Just Do it!
                </Title>
              </TitleBox>
              <Search>

                <SearchInput>
                </SearchInput>

                <SearchButton onPress={handleSearch} />

              </Search>
            </HeaderHome>
          </Header>
        </BackgroundLinear>

        <Listagem
          data={alarmsArray}
          keyExtractor={item => item.identifier}
          renderItem={({ item }) =>
            <TodoCard
              onPress={() => handleTest(item.identifier)}
              name={item.content.body}
              trigger={item.trigger}
            />}
        />

      </Content>
      <Footer>
        <BackgroundLinear>
          <GestureHandlerRootView>
            <ButtonAddTodo onPress={handleAdd}>
              <Feather
                name="plus-circle"
                size={40}
                color={theme.colors.white}
              />
            </ButtonAddTodo>
          </GestureHandlerRootView>
        </BackgroundLinear>
      </Footer>
    </Container>
  );
}