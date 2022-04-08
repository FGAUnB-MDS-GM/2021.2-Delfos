import AsyncStorage from "@react-native-async-storage/async-storage"

import { ToDoProps } from "../../models/toDos"

const datakey = `@delfos:alarmsSchedule <>` ;

//Busca o array do ToDos de determinado grupo
export async function getAsyncStorageToDo(groupId: string){
  const dataKey = `@delfos:alarmsSchedule${groupId}` ;
  const response = await AsyncStorage.getItem(dataKey);
  const ToDos: ToDoProps[] = response ? JSON.parse(response) : [];

  return ToDos;
}

//Sobrecreve o array de ToDos
export async function setAsyncStorageToDos(groupId: string ,ToDos: ToDoProps[]){
  const dataKey = `@delfos:alarmsSchedule${groupId}` ;
  await AsyncStorage.setItem(dataKey, JSON.stringify(ToDos));
}

//Adiciona um novo ToDo no array de ToDos
export async function addToDoAsyncStorage(groupId: string, ToDo: ToDoProps){
  const ToDos = await getAsyncStorageToDo(groupId)
  const newToDos: ToDoProps[] = 
  [
    ...ToDos,
    ToDo,
  ]
  await setAsyncStorageToDos(groupId, newToDos)
}

//Remove um ToDo do array de ToDos
export async function removeToDoAsyncStorage(groupId: string, ToDo: ToDoProps){
  const ToDos = await getAsyncStorageToDo(groupId)
  
  const remainingToDos = ToDos.filter(item=> item.identifier != ToDo.identifier);

  setAsyncStorageToDos(groupId, remainingToDos);
}

//Deleta o array de ToDos
export async function deleteToDoArrayAsyncStorage(groupName: string){
  const dataKey = `@delfos:alarmsSchedule${groupName}` ;
  AsyncStorage.removeItem(dataKey)
}