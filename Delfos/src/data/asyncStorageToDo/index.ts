import AsyncStorage from "@react-native-async-storage/async-storage"

import { ToDoProps } from "../../models/toDos"

const datakey = `@delfos:alarmsSchedule <>` ;

//Busca o array do ToDos de determinado grupo
export async function getAsyncStorageToDo(groupName: string){
  const dataKey = `@delfos:alarmsSchedule${groupName}` ;
  const response = await AsyncStorage.getItem(dataKey);
  const ToDos: ToDoProps[] = response ? JSON.parse(response) : [];

  return ToDos;
}

//Sobrecreve o array de ToDos
export async function setAsyncStorageToDos(groupName: string ,ToDos: ToDoProps[]){
  const dataKey = `@delfos:alarmsSchedule${groupName}` ;
  await AsyncStorage.setItem(dataKey, JSON.stringify(ToDos));
}

//Adiciona um novo ToDo no array de ToDos
export async function addToDoAsyncStorage(groupName: string, ToDo: ToDoProps){
  const ToDos = await getAsyncStorageToDo(groupName)
  const newToDos: ToDoProps[] = 
  [
    ...ToDos,
    ToDo,
  ]
  await setAsyncStorageToDos(groupName, newToDos)
}

//Remove um ToDo do array de ToDos
export async function removeToDoAsyncStorage(groupName: string, ToDo: ToDoProps){
  const ToDos = await getAsyncStorageToDo(groupName)
  
  const remainingToDos = ToDos.filter(item=> item.identifier != ToDo.identifier);

  setAsyncStorageToDos(groupName, remainingToDos);
}

//Deleta o array de ToDos
export async function deleteToDoArrayAsyncStorage(groupName: string){
  const dataKey = `@delfos:alarmsSchedule${groupName}` ;
  AsyncStorage.removeItem(dataKey)
}