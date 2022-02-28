import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationRequest } from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  ButtonGroups,
  HeaderHome,
  Title,
  Search,
  SearchInput,
  Listagem,
  ListagemChecked,
  Footer,
  ButtonAddTodo,
  TitleBox,
  Content,
} from './styles';

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { SearchButton } from "../../components/SearchButton";
import { TodoCard } from "../../components/TodoCard";
import { ModalView } from "../../components/ModalView";
import { Groups } from "../../components/Groups";
import { ButtonAdd } from "../../components/ButtonAdd";



export interface TriggerAlarmsCheckedProps {
  type: string,
  repeat?: boolean;
  hour?: number;
  minute?: number;
  seconds?: number;
  weekday?: number;
}

export interface AlarmsCheckedProps {
  identifier: string;
  body: string | null;
  trigger: TriggerAlarmsCheckedProps;
}

export function Home() {
  const theme = useTheme();
  const [alarmsArray, setAlarmsArray] = useState<NotificationRequest[]>([]);
  const { navigate } = useNavigation();
  const [alarmsCheckeds, setAlarmsCheckeds] = useState<AlarmsCheckedProps[]>([]);
  const [openModal, setOpenModal] = useState(false);

  function handleSearch() {
    Alert.alert("Buscando ToDos pelo nome")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }

  async function handleCheckTodo(idTodo: string, body: string | null, trigger: TriggerAlarmsCheckedProps) {
    //Alert.alert(`testando o btt ${idTodo}`)

    try {
      const dataKey = `@delfos:alarmschecked`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentData = response ? JSON.parse(response) : [];

      const newData = [
        ...currentData,
        {
          identifier: idTodo,
          body: body,
          trigger: trigger
        }
      ]
      console.log(newData);
      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));
      await Notifications.cancelScheduledNotificationAsync(idTodo);

    } catch(error){
      console.log(error)
      Alert.alert('Erro', "Infelizmente não foi possível marcar como feito")
    }
  }

  async function loadAlarmsChecked(){
    const dataKey = `@delfos:alarmschecked`;
    const response = await AsyncStorage.getItem(dataKey);
    const localAlarmsCheckeds = response ? JSON.parse(response) : [];

    setAlarmsCheckeds(localAlarmsCheckeds);
  }

  function handleScheduleCheckTodo(item: AlarmsCheckedProps) {
    //função para poder remarcar o ToDo que uma vez foi marcado como feito!!
    console.log(item);
  }

  function handleAdd() {
    Alert.alert("Adicionar um Todo para fazer")
    /* aidicona um todo e deve encaminhar para telade criação de ToDo*/
    navigate('AddTodo');

  }

  async function getAlarms() {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    setAlarmsArray(response);
    //console.log(response);
  }

  function handleOpenModal(){
    //Comando para limpar o AsyncStorage :
    //const dataKey = `@delfos:alarmschecked`;
    //AsyncStorage.setItem(dataKey, "")
    console.log('Open Modal')
    setOpenModal(true);
  }

  function handleCloseModal(){
    console.log('Close Modal')
    setOpenModal(false);
  }
  useFocusEffect(useCallback(() => {
    getAlarms();
    loadAlarmsChecked();
  }, [alarmsCheckeds]));

  return (
    <Container>
      <Content>
        <BackgroundLinear>
          <Header>
            <ButtonGroups>
              <MenuButton
                onPress={handleOpenModal}
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
              onPress={() => handleCheckTodo(item.identifier, item.content.body, item.trigger)}
              name={item.content.body}
              trigger={item.trigger}
            />}
        />

        <ListagemChecked
          data={alarmsCheckeds}
          keyExtractor={item => item.identifier}
          renderItem={({ item }) =>
            <TodoCard
              checked={true}
              onPress={() => handleScheduleCheckTodo(item)}
              name={item.body}
              trigger={item.trigger}
            />}
        />


      </Content>
      <Footer>
        <ButtonAdd icon="plus-circle" onPress={handleAdd}/>
      </Footer>
      <ModalView visible={openModal} closeModal={handleCloseModal}>
        <Groups/>
      </ModalView>
    </Container>
  );
}