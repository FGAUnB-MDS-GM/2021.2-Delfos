import React, { useState, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { TodoCard } from "../../components/TodoCard";

import { ToDoProps } from "../../../models/toDos";
import { GroupProps } from "../../../models/groups";

import {
  checkToDo,
  deleteToDo,
  loadToDos,
  scheduleCheckedToDo
} from "../../../control/todoControl";
import { getContext } from "../../../control/contextControl";


export function OneTimeFilter() {
  const navigation = useNavigation()
  const [groupSelected, setGroupSelected] = useState<GroupProps>({} as GroupProps);
  const [toDosTimeInterval, setToDosTimeInterval] = useState<ToDoProps[]>([]);
  const { group } = getContext();

  function handleGroupsList() {
    navigation.navigate('Groups')
  }
  async function handleCheckToDo(ToDo: ToDoProps) {
    await checkToDo(groupSelected, ToDo);
    refreshToDosTimeInterval()
  }
  
  async function handleScheduleCheckedToDo(ToDo: ToDoProps){
    await scheduleCheckedToDo(groupSelected, ToDo);
  }

  async function handleDelete(ToDo: ToDoProps) {
    await deleteToDo(groupSelected, ToDo);
    refreshToDosTimeInterval()
  }

  async function refreshToDosTimeInterval() {
    const ToDos = await loadToDos(groupSelected)
    const ToDosFiltred = ToDos.filter(item => item.trigger.type == "timeInterval");
    setToDosTimeInterval(ToDosFiltred)
  }

  function handleEditToDo(EditToDo: ToDoProps){
    navigation.navigate('AddTodo', { groupSelected, EditToDo })
  }

  useEffect(() => {
    refreshToDosTimeInterval();
    setGroupSelected(group);
  }, [group])

  useFocusEffect(() => {
    refreshToDosTimeInterval();
  })

  return (
    <Container>
      <BackgroundLinear>
        <Header>
          <ButtonGroups>
            <MenuButton
              onPress={handleGroupsList}
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

      <Listagem
        data={toDosTimeInterval}
        keyExtractor={item => item.identifier}
        renderItem={({ item }) =>
          <TodoCard
            identifier={item.identifier}
            onPress={() => handleCheckToDo(item)}
            message={item.message}
            trigger={item.trigger}
            checked={item.checked}
            handleEditToDo={()=> handleEditToDo(item)}
            handleDelete={() => handleDelete(item)}
            schedulechekedToDo={() => handleScheduleCheckedToDo(item)}
          />}
      />
    </Container>
  );
}

