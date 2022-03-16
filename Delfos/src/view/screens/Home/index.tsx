import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
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
  TitleBox,
  Content,
  RefreshButtonView
} from './styles';

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { SearchButton } from "../../components/SearchButton";
import { TodoCard } from "../../components/TodoCard";
import { ButtonAdd } from "../../components/ButtonAdd";
import { RefreshButton } from "../../components/RefreshButton";

import { ToDoProps } from "../../../models/toDos";
import { GroupProps } from "../../../models/groups";

import {
  checkToDo, 
  deleteToDo, 
  filterToDoMessage, 
  loadToDos,
  scheduleCheckedToDo
} from '../../../control/todoControl'

import { getContext } from "../../../control/contextControl";


export function Home() {
  const navigation = useNavigation();
  const [toDos, setToDos] = useState<ToDoProps[]>([]);
  const [groupSelected, setGroupSelected] = useState<GroupProps>({} as GroupProps);
  const [toDoSearch, setToDoSearch]= useState('')

  const { group } = getContext();

  function handleListGroups() {
    navigation.navigate('Groups')

  }

  async function handleSearch(ToDoMessage: string) {
    const ToDosFiltred = await filterToDoMessage(groupSelected, ToDoMessage);
    setToDos(ToDosFiltred);
    
  }

  async function handleRefreshToDos() {
    refreshToDos()
  }

  async function handleCheckTodo(ToDo: ToDoProps) {
    await checkToDo(groupSelected, ToDo);
    await refreshToDos();
  }

  async function handleScheduleCheckedToDo(ToDo: ToDoProps){
    await scheduleCheckedToDo(groupSelected, ToDo);
    await refreshToDos();
  }

  function handleAdd() {
    navigation.navigate('AddTodo', { groupSelected });
  }

  async function handleDelete(ToDo: ToDoProps) {
    await deleteToDo(groupSelected, ToDo);
    await refreshToDos();
  }

  async function refreshToDos(){
    const ToDos = await loadToDos(groupSelected)
    setToDos(ToDos)
  }

  useEffect(() => {
    setGroupSelected(group);
    console.log('carregou')
  }, [group]);

  /** 
  useFocusEffect(()=>{
    refreshToDos();
  })
*/

  return (
    <Container>
      <Content>
        <BackgroundLinear>
          <Header>
            <ButtonGroups>
              <MenuButton
                onPress={handleListGroups}
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
                <SearchInput onChangeText={setToDoSearch}/>
                <SearchButton onPress={()=> handleSearch(toDoSearch)} />

              </Search>
            </HeaderHome>
          </Header>
        </BackgroundLinear>

        <Listagem
          data={toDos}
          keyExtractor={item => item.identifier}
          renderItem={({ item }) =>
            <TodoCard
              identifier={item.identifier}
              onPress={() => handleCheckTodo(item)}
              message={item.message}
              trigger={item.trigger}
              checked={item.checked}
              handleDelete={() => handleDelete(item)}
              schedulechekedToDo={()=> handleScheduleCheckedToDo(item)}
            />}
        />

      </Content>
      <Footer>
        <ButtonAdd icon="plus-circle" onPress={handleAdd} />
      </Footer>
      <RefreshButtonView>
        <RefreshButton onPress={handleRefreshToDos} />
      </RefreshButtonView>
    </Container>
  );
}