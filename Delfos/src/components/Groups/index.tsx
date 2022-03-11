import React, { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useFocusEffect } from "@react-navigation/native";

import {
  Container,
  Group,
  Overlay,
  Content,
  Title,
  InputNameGroup,
} from "./styles";

import { ButtonAdd } from "../ButtonAdd";
import { GroupButton } from "../GroupButton";
import { Alert, Modal, View } from "react-native";
import { CancelButton, ConfirmButton } from "../../screens/AddTodo/styles";
import {
  AlarmsCheckedProps,
  TriggerAlarmsCheckedProps,
} from "../../screens/Home";

export interface GroupProps {
  groupName: string;
  enable: boolean;
}

interface Props {
  handleSelectGroup: (group: GroupProps) => void;
  verifyStatusGroup: (group: GroupProps) => void;
  deleteGroup: (group: GroupProps) => void;
}

export function Groups({
  handleSelectGroup,
  verifyStatusGroup,
  deleteGroup,
}: Props) {
  const [asyncGroups, setAsyncGroups] = useState<GroupProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalCreateGroup, setModalCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupAlarms, setGroupAlarms] = useState<AlarmsCheckedProps[]>([]);
  const [modalDeleteGroup, setModalDeleteGroup] = useState(false);

  const theme = useTheme();

  function handleCreateGroup() {
    setModalCreateGroup(true);
  }

  async function handleConfirmCreateGroup() {
    try {
      const dataKey = `@delfos:localgroups`;
      const response = await AsyncStorage.getItem(dataKey);
      const currentData = response ? JSON.parse(response) : [];

      const newData = [
        ...currentData,
        {
          groupName: newGroupName,
          enable: true,
        },
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(newData));
      setModalCreateGroup(false);
    } catch (error) {
      Alert.alert("Erro", "Infelizmente não foi possível criar o grupo");
    }
  }

  function handleCancelCreateGroup() {
    setModalCreateGroup(false);
  }

  //Função para limpar o AsyncStorage
  /*
  async function cleanGroupStorage() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      
      Alert.alert("Erro", "Não foi possível limpar");
    }
  }
  */

  async function loadGroups() {
    const dataKey = `@delfos:localgroups`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseArray = response ? JSON.parse(response) : [];

    setAsyncGroups(responseArray);
  }

  useFocusEffect(
    useCallback(() => {
      loadGroups();
    }, [asyncGroups])
  );

  return (
    <Container>
      <Group
        data={asyncGroups}
        keyExtractor={(item) => item.groupName}
        renderItem={({ item }) => (
          <GroupButton
            enable={item.enable}
            id={item.groupName}
            onPress={() => handleSelectGroup(item)}
            disableGroup={() => verifyStatusGroup(item)}
            deleteGroup={() => deleteGroup(item)}
          />
        )}
      />

      <View style={{ width: "100%", marginBottom: 20, paddingHorizontal: 10 }}>
        <ButtonAdd icon="plus-circle" onPress={handleCreateGroup} />
      </View>

      {/*Transformar isso em um COMPONENTE, assim que possível*/}
      <Modal visible={modalCreateGroup}>
        <Overlay>
          <Content>
            <Title>Nome do Grupo</Title>
            <InputNameGroup onChangeText={setNewGroupName} />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 15,
              }}
            >
              <GestureHandlerRootView>
                <CancelButton onPress={handleCancelCreateGroup}>
                  <Feather name="x" color={theme.colors.white} size={30} />
                </CancelButton>
              </GestureHandlerRootView>
              <GestureHandlerRootView>
                <ConfirmButton onPress={handleConfirmCreateGroup}>
                  <Feather name="check" color={theme.colors.white} size={30} />
                </ConfirmButton>
              </GestureHandlerRootView>
            </View>
          </Content>
        </Overlay>
      </Modal>

      {/*Transformar isso em componente pelo amor de DEUS aaaaaaaaaaaa*/}
      <Modal visible={modalDeleteGroup}>
        <Overlay>
          <Content>
            <Title>Tem certeza que deseja deletar?</Title>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginTop: 15,
              }}
            >
              <GestureHandlerRootView>
                <CancelButton onPress={handleCancelCreateGroup}>
                  <Feather name="x" color={theme.colors.white} size={30} />
                </CancelButton>
              </GestureHandlerRootView>
              <GestureHandlerRootView>
                <ConfirmButton onPress={handleConfirmCreateGroup}>
                  <Feather name="check" color={theme.colors.white} size={30} />
                </ConfirmButton>
              </GestureHandlerRootView>
            </View>
          </Content>
        </Overlay>
      </Modal>
    </Container>
  );
}
