import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from 'expo-notifications';
import { NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationRequest } from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Header,
  ButtonGroups,
  HeaderHome,
  Title,
  SubTitle,
  Search,
  SearchInput,
  Listagem,
  Footer,
  ButtonAddTodo,
  TitleBox,
  Content,
  RefreshButtonView
} from './styles';

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { SearchButton } from "../../components/SearchButton";
import { TodoCard } from "../../components/TodoCard";
import { ModalView } from "../../components/ModalView";
import { Groups } from "../../components/Groups";
import { ButtonAdd } from "../../components/ButtonAdd";
import { scheduleNotificationDailyWithoutAdd, scheduleNotificationWeeklyWithoutAdd } from "../AddTodo";
import { RefreshButton } from "../../components/RefreshButton";



export interface TriggerAlarmsCheckedProps {
  type: string,
  repeat?: boolean;
  hour?: number;
  minute?: number;
  seconds?: number;
  weekday?: number;
}

export interface AlarmsProps {
  identifier: string;
  body: string | null;
  trigger: TriggerAlarmsCheckedProps;
  checked: boolean;
}

export interface GroupProps {
  groupName: string;
  enable: boolean;
}

interface Params {
  groupName: string
}

export function Home() {
  const theme = useTheme();
  const [alarmsArray, setAlarmsArray] = useState<NotificationRequest[]>([]);
  const navigation = useNavigation();
  const [alarmsGroup, setAlarmsGroup] = useState<AlarmsProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [groupSelected, setGroupSelected] = useState<GroupProps>({} as GroupProps);
  const [asyncGroups, setAsyncGroups] = useState<GroupProps[]>([]);
  const route = useRoute();

  async function handleSearch() {

  }

  async function handleRefresh() {
    loadAlarmsGroup()
  }

  async function loadAlarmsGroup() {
    try {

      const dataKey = `@delfos:alarmsSchedule${groupSelected.groupName}`
      const response = await AsyncStorage.getItem(dataKey);
      const scheduleAlarmsGroup = response ? JSON.parse(response) : [];
      setAlarmsGroup(scheduleAlarmsGroup);
      //console.log(scheduleAlarmsGroup)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadGroups() {
    try {
      const dataKey = `@delfos:localgroups`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentGroups = response ? JSON.parse(response) : [];
      setAsyncGroups(currentGroups);

    } catch (error) {
      console.log(error)
    }
  }

  async function handleCheckTodo(ToDo: AlarmsProps) {

    if (!ToDo.checked) {
      try {
        const alarm = alarmsGroup.indexOf(ToDo)
        alarmsGroup[alarm].checked = true;

        console.log(alarmsGroup)

        const dataKey = `@delfos:alarmsSchedule${groupSelected.groupName}`
        await AsyncStorage.setItem(dataKey, JSON.stringify(alarmsGroup));

        await Notifications.cancelScheduledNotificationAsync(ToDo.identifier);

        handleRefresh()

      } catch (error) {
        console.log(error)
        Alert.alert('Erro', "Infelizmente não foi possível marcar como feito")
      }
    } else {
      scheduleCheckTodo(ToDo)
    }
  }


  async function scheduleCheckTodo(item: AlarmsProps, group?: string) {
    if (item.trigger.type == "daily") {
      scheduleNotificationDailyWithoutAdd((group ? group : groupSelected.groupName), item.body!, item.trigger.minute!, item.trigger.hour!);
    }
    if (item.trigger.type == 'weekly') {
      scheduleNotificationWeeklyWithoutAdd((group ? group : groupSelected.groupName), item.body!, item.trigger.minute!, item.trigger.hour!, item.trigger.weekday!)
    }
  }

  /* aidicona um todo e deve encaminhar para telade criação de ToDo*/
  function handleAdd() {

    navigation.navigate('AddTodo', { groupSelected });
  }

  async function getAlarms() {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    setAlarmsArray(response);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function getSelectedGroup(group: GroupProps) {
    setGroupSelected(group);
    setOpenModal(false);
  }

  function verifyStatusGroup(group: GroupProps) {
    if (group.enable) {
      setDisable(group.groupName);
    } else {
      setEnable(group.groupName)
    }
  }

  // Muda a propriedade do grupo para "enable: false"
  // coloca todos os ToDos como marcados
  // Cancela todos os alarmes do grupo no Notifications
  async function setDisable(id: string) {

    try {
      const alteredArray = asyncGroups.map(item => {
        if (item.groupName == id) {
          return { ...item, enable: false }
        }
      })

      const dataKey = `@delfos:localgroups`;
      await AsyncStorage.setItem(dataKey, JSON.stringify(alteredArray));

      const dataKey2 = `@delfos:alarmsSchedule${id}`
      const response = await AsyncStorage.getItem(dataKey2);
      const currentAlarms = response ? JSON.parse(response) : [];

      const alteredAlarmsGroup = currentAlarms.map((item: AlarmsProps) => {
        return {
          ...item, checked: true
        }
      })

      alteredAlarmsGroup.forEach((item: AlarmsProps) => {
        if (item.checked != true) {
          Notifications.cancelScheduledNotificationAsync(item.identifier)
        }
      })

      await AsyncStorage.setItem(dataKey2, JSON.stringify(alteredAlarmsGroup));

      setOpenModal(false)
      handleRefresh()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível desativer esse grupo!')
    }

  }

  //Altera especificamente o "enable" do grupo para true
  // em seguida desmarcar os alarmes semanais e diarios
  // e por último remarca no Notifications os todos os Daily e Weekly ToDos
  async function setEnable(id: string) {
    try {

      const alteredArray = asyncGroups.map(item => {
        if (item.groupName == id) {
          return { ...item, enable: true }
        }
      })

      const dataKey = `@delfos:localgroups`;
      await AsyncStorage.setItem(dataKey, JSON.stringify(alteredArray));

      const dataKey2 = `@delfos:alarmsSchedule${id}`
      const response = await AsyncStorage.getItem(dataKey2);
      const currentAlarms = response ? JSON.parse(response) : [];

      const alteredAlarmsGroup = currentAlarms.map((item: AlarmsProps) => {
        if (item.trigger.type != "timeInterval") {
          return {
            ...item, checked: false
          }
        }
      })

      alteredAlarmsGroup.forEach((item: AlarmsProps) => {
        scheduleCheckTodo(item, id)
      })

      await AsyncStorage.setItem(dataKey2, JSON.stringify(alteredAlarmsGroup));

      setOpenModal(false)
      handleRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  //Deleta um grupo, cancela todos ToDos desse grupo e 
  // exclui a lista de ToDos desse grupo 
  async function deleteGroup(group: GroupProps) {

    try {
      const dataKey = `@delfos:localgroups`;
      const dataKey2 = `@delfos:alarmsSchedule${group.groupName}`

      const response = await AsyncStorage.getItem(dataKey);
      const currentGroups = response ? JSON.parse(response) : [];

      const alteredArrayGroups = asyncGroups.filter(item => item.groupName != group.groupName)

      const newData = [
        ...alteredArrayGroups
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));

      alarmsGroup.forEach(item => {
        Notifications.cancelScheduledNotificationAsync(item.identifier);
      })

      await AsyncStorage.removeItem(dataKey2);
      setGroupSelected({} as GroupProps)
      setOpenModal(false)

    } catch (error) {
      console.log(error)
    }
  }

  //Deleta um ToDo marcado
  async function handleDelete(id: string) {
    try {

      const dataKey = `@delfos:alarmsSchedule${groupSelected.groupName}`;

      const remainingToDos = alarmsGroup.filter(item => item.identifier != id);

      await AsyncStorage.setItem(dataKey, JSON.stringify(remainingToDos));

      setAlarmsGroup(remainingToDos)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Infelizmente não foi possível deletar essa ToDo")
    }
  }

  useEffect(() => {
    loadGroups();
    loadAlarmsGroup();
  }, [groupSelected]);

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
                  Delfos!
                </Title>
              </TitleBox>
              <SubTitle>
                {groupSelected.groupName ? groupSelected.groupName : "Selecione um Grupo!"}
              </SubTitle>
              <Search>
                <SearchInput />
                <SearchButton onPress={handleSearch} />

              </Search>
            </HeaderHome>
          </Header>
        </BackgroundLinear>

        <Listagem
          data={alarmsGroup}
          keyExtractor={item => item.identifier}
          renderItem={({ item }) =>
            <TodoCard
              onPress={() => handleCheckTodo(item)}
              name={item.body}
              trigger={item.trigger}
              checked={item.checked}
              handleDelete={() => handleDelete(item.identifier)}
            />}
        />

      </Content>
      <Footer>
        <ButtonAdd icon="plus-circle" onPress={handleAdd} />
      </Footer>
      <ModalView visible={openModal}>
        <Groups handleSelectGroup={getSelectedGroup} verifyStatusGroup={verifyStatusGroup} deleteGroup={deleteGroup} />
      </ModalView>
      <RefreshButtonView>
        <RefreshButton onPress={handleRefresh} />
      </RefreshButtonView>
    </Container>
  );
}