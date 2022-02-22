import React from "react";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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


export function Home() {
  const theme = useTheme();
  const { navigate } =useNavigation();

  function handleOpenModalGrupos() {
    Alert.alert("abrir modal")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }

  function handleSearch() {
    Alert.alert("Buscando ToDos pelo nome")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }

  function handleTest() {
    Alert.alert("testando o btt")
    /* teste seo  btt funciona*/
  }

  function handleAdd(){
    Alert.alert("Adicionar um Todo para fazer")
    /* aidicona um todo e deve encaminhar para telade criação de ToDo*/
    navigate('AddTodo');

  }
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

        <Listagem>
          <TodoCard onPress={handleTest} name="Aula de Geografia"/>
        </Listagem>
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