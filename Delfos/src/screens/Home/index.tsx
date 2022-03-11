import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
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
  ListagemChecked,
  Footer,
  ButtonAddTodo,
  TitleBox,
  Content,
} from "./styles";

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { SearchButton } from "../../components/SearchButton";
import { TodoCard } from "../../components/TodoCard";
import { ModalView } from "../../components/ModalView";
import { Groups } from "../../components/Groups";
import { ButtonAdd } from "../../components/ButtonAdd";
import {
  scheduleNotificationDaily,
  scheduleNotificationSecond,
  scheduleNotificationWeekly,
} from "../AddTodo";

export interface TriggerAlarmsCheckedProps {
  type: string;
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

export interface GroupProps {
  groupName: string;
  enable: boolean;
}

export function Home() {
  const theme = useTheme();
  const [alarmsArray, setAlarmsArray] = useState<NotificationRequest[]>([]);
  const navigation = useNavigation();
  const [alarmsCheckeds, setAlarmsCheckeds] = useState<AlarmsCheckedProps[]>(
    []
  );
  const [alarmsGroup, setAlarmsGroup] = useState<AlarmsCheckedProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [groupSelected, setGroupSelected] = useState<GroupProps>(
    {} as GroupProps
  );
  const [asyncGroups, setAsyncGroups] = useState<GroupProps[]>([]);

  const getKeys = async () => {
    console.log(await AsyncStorage.getItem("@delfos:alarmsScheduleGrupo1"));
    console.log(await AsyncStorage.getItem("@delfos:alarmsScheduleundefined"));
    console.log(await AsyncStorage.getItem("@delfos:localgroups"));
    return await AsyncStorage.getAllKeys();
  };

  useEffect(() => {
    const ActiveKeys = getKeys();
    setTimeout(() => console.log(ActiveKeys), 1500);
  }, [AsyncStorage]);

  async function handleSearch() {
    Alert.alert("Buscando ToDos pelo nome");
    /* busca os ToDos criados pelo usuário pelo nome*/
    const teste = await Notifications.getAllScheduledNotificationsAsync();
  }

  async function handleCheckTodo(
    idTodo: string,
    body: string | null,
    trigger: TriggerAlarmsCheckedProps
  ) {
    //Alert.alert(`testando o btt ${idTodo}`)

    try {
      const dataKey = `@delfos:alarmschecked${groupSelected.groupName}`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentData = response ? JSON.parse(response) : [];

      const newData = [
        ...currentData,
        {
          identifier: idTodo,
          body: body,
          trigger: trigger,
        },
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));

      const remainingAlarms = alarmsGroup.filter(
        (item) => item.identifier != idTodo
      );

      const dataKey2 = `@delfos:alarmsSchedule${groupSelected.groupName}`;
      await AsyncStorage.setItem(dataKey2, JSON.stringify(remainingAlarms));

      await Notifications.cancelScheduledNotificationAsync(idTodo);
    } catch (error) {
      Alert.alert("Erro", "Infelizmente não foi possível marcar como feito");
    }
  }

  async function loadAlarmsChecked() {
    try {
      const dataKey = `@delfos:alarmschecked${groupSelected.groupName}`;
      const response = await AsyncStorage.getItem(dataKey);
      const localAlarmsCheckeds = response ? JSON.parse(response) : [];
      setAlarmsCheckeds(localAlarmsCheckeds);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadAlarmsGroup() {
    try {
      const dataKey = `@delfos:alarmsSchedule${groupSelected.groupName}`;
      const response = await AsyncStorage.getItem(dataKey);
      const scheduleAlarmsGroup = response ? JSON.parse(response) : [];
      setAlarmsGroup(scheduleAlarmsGroup);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadGroups() {
    try {
      const dataKey = `@delfos:localgroups`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentGroups = response ? JSON.parse(response) : [];
      setAsyncGroups(currentGroups);
    } catch (error) {
      console.log(error);
    }
  }

  function handleScheduleCheckTodo(item: AlarmsCheckedProps) {
    ScheduleCheckTodo(item);
  }

  async function ScheduleCheckTodo(item: AlarmsCheckedProps) {
    if (item.trigger.type == "daily") {
      scheduleNotificationDaily(
        groupSelected.groupName,
        item.body!,
        item.trigger.minute!,
        item.trigger.hour!
      );
      handleDelete(item.identifier);
    } else {
      scheduleNotificationWeekly(
        groupSelected.groupName,
        item.body!,
        item.trigger.minute!,
        item.trigger.hour!,
        item.trigger.weekday!
      );
      handleDelete(item.identifier);
    }
  }

  function handleAdd() {
    /* aidicona um todo e deve encaminhar para telade criação de ToDo*/
    navigation.navigate("AddTodo" as never, { groupSelected } as never);
  }

  async function getAlarms() {
    const response = await Notifications.getAllScheduledNotificationsAsync();
    setAlarmsArray(response);
    //;
  }

  function handleOpenModal() {
    //Comando para limpar o AsyncStorage :
    //const dataKey = `@delfos:alarmschecked`;
    //AsyncStorage.setItem(dataKey, "")

    setOpenModal(true);
  }

  function getSelectedGroup(group: GroupProps) {
    setGroupSelected(group);
    setOpenModal(false);
  }

  function verifyStatusGroup(group: GroupProps) {
    if (group.enable) {
      setDisable(group.groupName, group.enable);
    } else {
      setEnable(group.groupName, group.enable);
    }
  }

  async function setDisable(id: string, enable: boolean) {
    //Adicionando os Todos agendados para a lista de marcados
    try {
      const newMarkedTodo: {
        identifier: string;
        body: string | null;
        trigger: TriggerAlarmsCheckedProps;
      }[] = [];

      alarmsGroup.forEach((item) => {
        newMarkedTodo.push({
          identifier: item.identifier,
          body: item.body,
          trigger: item.trigger,
        });
      });

      const newData = [...alarmsCheckeds, ...newMarkedTodo];
      const dataKey2 = `@delfos:alarmschecked${id}`;
      await AsyncStorage.setItem(dataKey2, JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }

    //Exlcuindo todos os Todos marcados, pois agora eles estão como marcados
    try {
      setAlarmsGroup(alarmsGroup.splice(0, alarmsGroup.length));
      const dataKey = `@delfos:alarmsSchedule${id}`;
      await AsyncStorage.setItem(dataKey, JSON.stringify(alarmsGroup));
    } catch (error) {
      console.log(error);
    }

    try {
      const dataKey = `@delfos:localgroups`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentGroups = response ? JSON.parse(response) : [];

      setAsyncGroups(currentGroups);

      const alteredArray = asyncGroups.filter((item) => item.groupName != id);

      const newData = [
        ...alteredArray,
        {
          groupName: id,
          enable: false,
        },
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function setEnable(id: string, enable: boolean) {
    try {
      const dataKey = `@delfos:localgroups`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentGroups = response ? JSON.parse(response) : [];

      setAsyncGroups(currentGroups);

      const alteredArray = asyncGroups.filter((item) => item.groupName != id);

      const newData = [
        ...alteredArray,
        {
          groupName: id,
          enable: true,
        },
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteGroup(group: GroupProps) {
    try {
      const dataKey = `@delfos:localgroups`;
      const dataKey2 = `@delfos:alarmschecked${group.groupName}`;
      const dataKey3 = `@delfos:alarmsSchedule${group.groupName}`;

      const response = await AsyncStorage.getItem(dataKey);
      const currentGroups = response ? JSON.parse(response) : [];

      setAsyncGroups(currentGroups);

      const alteredArray = asyncGroups.filter(
        (item) => item.groupName != group.groupName
      );

      const newData = [...alteredArray];
      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));

      alarmsGroup.forEach((item) => {
        Notifications.cancelScheduledNotificationAsync(item.identifier);
      });

      await AsyncStorage.removeItem(dataKey2);
      await AsyncStorage.removeItem(dataKey3);

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const dataKey = `@delfos:alarmschecked${groupSelected.groupName}`;

      const remainingAlarmsChekeds = alarmsCheckeds.filter(
        (item) => item.identifier != id
      );

      await AsyncStorage.setItem(
        dataKey,
        JSON.stringify(remainingAlarmsChekeds)
      );
    } catch (error) {
      Alert.alert("Erro", "Infelizmente não foi possível remarcar essa ToDo");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAlarms();
      loadAlarmsChecked();
      loadAlarmsGroup();
      loadGroups();
    }, [alarmsCheckeds])
  );

  return (
    <Container>
      <Content>
        <BackgroundLinear>
          <Header>
            <ButtonGroups>
              <MenuButton onPress={handleOpenModal} />
            </ButtonGroups>
            <HeaderHome>
              <TitleBox>
                <Title>Delfos!</Title>
              </TitleBox>
              <SubTitle>
                {groupSelected.groupName
                  ? groupSelected.groupName
                  : "Selecione um Grupo!"}
              </SubTitle>
              <Search>
                <SearchInput></SearchInput>

                <SearchButton onPress={handleSearch} />
              </Search>
            </HeaderHome>
          </Header>
        </BackgroundLinear>

        <ListagemChecked
          data={alarmsGroup}
          keyExtractor={(item) => item.identifier}
          renderItem={({ item }) => (
            <TodoCard
              onPress={() =>
                handleCheckTodo(item.identifier, item.body, item.trigger)
              }
              name={item.body}
              trigger={item.trigger}
            />
          )}
        />

        <ListagemChecked
          data={alarmsCheckeds}
          keyExtractor={(item) => item.identifier}
          renderItem={({ item }) => (
            <TodoCard
              checked={true}
              onPress={() => handleScheduleCheckTodo(item)}
              name={item.body}
              trigger={item.trigger}
              handleDelete={() => handleDelete(item.identifier)}
            />
          )}
        />
      </Content>
      <Footer>
        <ButtonAdd icon="plus-circle" onPress={handleAdd} />
      </Footer>
      <ModalView visible={openModal}>
        <Groups
          handleSelectGroup={getSelectedGroup}
          verifyStatusGroup={verifyStatusGroup}
          deleteGroup={deleteGroup}
        />
      </ModalView>
    </Container>
  );
}
