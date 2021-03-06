import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { GroupProps } from "../../../models/groups";
import { ToDoProps } from "../../../models/toDos";
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
  Footer
} from './styles';

import {
  checkToDo,
  deleteToDo,
  loadToDos,
  scheduleCheckedToDo
} from "../../../control/todoControl";
import { getContext } from "../../../control/contextControl";
import { ButtonAdd } from "../../components/ButtonAdd";

export function SemanalFilter() {
  const navigation = useNavigation()
  const [groupSelected, setGroupSelected] = useState<GroupProps>({} as GroupProps);
  const [toDosWeekly, setToDosWeekly] = useState<ToDoProps[]>([]);
  const { group } = getContext();

  function handleGroupsList() {
    navigation.navigate('Groups')
  }

  async function handleCheckToDo(ToDo: ToDoProps) {
    await checkToDo(groupSelected, ToDo);
    refreshToDosWeekly()
  }

  async function handleScheduleCheckedToDo(ToDo: ToDoProps) {
    await scheduleCheckedToDo(groupSelected, ToDo);
  }

  async function handleDelete(ToDo: ToDoProps) {
    await deleteToDo(groupSelected, ToDo);
    refreshToDosWeekly()
  }

  async function refreshToDosWeekly() {
    const ToDos = await loadToDos(groupSelected)
    const ToDosFiltred = ToDos.filter(item => item.trigger.type == "weekly");
    setToDosWeekly(ToDosFiltred)
  }

  function handleEditToDo(EditToDo: ToDoProps) {
    navigation.navigate('AddTodo', { groupSelected, EditToDo })
  }

  function handleCalendarScreen(){
    navigation.navigate('CalendarScreen', {toDosWeekly});
  }

  useEffect(() => {
    refreshToDosWeekly();
    setGroupSelected(group);
  }, [group])

  useFocusEffect(() => {
    refreshToDosWeekly();
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
              To-do semanais
            </SubTitle>
          </HeaderTitle>
        </Header>
      </BackgroundLinear>

      <Listagem
        data={toDosWeekly}
        keyExtractor={item => item.identifier}
        renderItem={({ item }) =>
          <TodoCard
            identifier={item.identifier}
            onPress={() => handleCheckToDo(item)}
            message={item.message}
            trigger={item.trigger}
            checked={item.checked}
            handleEditToDo={() => handleEditToDo(item)}
            handleDelete={() => handleDelete(item)}
            schedulechekedToDo={() => handleScheduleCheckedToDo(item)}
          />}
      />

      <Footer>
        <ButtonAdd icon='calendar' onPress={handleCalendarScreen} />
      </Footer>

    </Container>
  );
}