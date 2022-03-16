import {
  addGroupAsyncStorage,
  getAsyncStorageGroup,
  setAsyncStorageGroup,
  removeGroupAsyncStorage
} from "../data/asyncStorageGroup";

import {
  deleteToDoArrayAsyncStorage,
  getAsyncStorageToDo,
  setAsyncStorageToDos
} from "../data/asyncStorageToDo";

import {
  notificationTimeInterval,
  notificationDaily,
  notificationWeekly
} from "./notificationControl";

import { GroupProps } from "../models/groups";
import * as Notifications from 'expo-notifications';
import { ToDoProps } from "../models/toDos";



//Cria um Group de acordo com nome forncecido
export async function createGroup(groupName: string) {
  const newGroup: GroupProps =
  {
    groupName: groupName,
    enable: true,
  }
  await addGroupAsyncStorage(newGroup);
}

//Retornar um array com todos os Groups salvo localmente
export async function loadGroups() {
  const groups = await getAsyncStorageGroup();
  return groups;
}

//Verifica se o Group está ativado ou desativado
export async function verifyStatusGroup(group: GroupProps) {
  if (group.enable) {
    await disableGroup(group);
  } else {
    await enableGroup(group);
  }
}

//Desativa o Group e marca todos os ToDos dele como "checked: true"
// em seguida também cancela os alarma do Expo Notifications de cada ToDo
export async function disableGroup(group: GroupProps) {
  const groups = await getAsyncStorageGroup()

  const newGroups = groups.filter(item => item.groupName != group.groupName)

  newGroups.push({
    groupName: group.groupName,
    enable: false
  })

  await setAsyncStorageGroup(newGroups);

  const ToDos = await getAsyncStorageToDo(group.groupName);
  const newToDos: ToDoProps[] = ToDos.map(item => {
    return { ...item, checked: true }
  })

  ToDos.forEach(item => {
    if (item.checked != true) {
      Notifications.cancelScheduledNotificationAsync(item.identifier)
    }
  })

  await setAsyncStorageToDos(group.groupName, newToDos);
}

//Ativa o grupo e marca todos os ToDos dele como "checked: false"
// em seguida ativa o alarme dos ToDos
export async function enableGroup(group: GroupProps) {
  const groups = await getAsyncStorageGroup()

  const newGroups = groups.filter(item => item.groupName != group.groupName)

  newGroups.push({
    groupName: group.groupName,
    enable: true
  })

  await setAsyncStorageGroup(newGroups);

  const ToDos = await getAsyncStorageToDo(group.groupName);

  const newToDos = await Promise.all(ToDos.map(async item => {
    if (item.checked = true) {
      let id: string
      if (item.trigger.type == 'timeInterval') {
        id = await notificationTimeInterval(item.message, item.trigger.repeat!, item.trigger.minute!, item.trigger.hour!)
      }
      if (item.trigger.type == 'daily') {
        id = await notificationDaily(item.message, item.trigger.minute!, item.trigger.hour!)
      }
      if (item.trigger.type == 'weekly') {
        id = await notificationWeekly(item.message, item.trigger.minute!, item.trigger.hour!, item.trigger.weekday!)
      }
      return { ...item,identifier: id!, checked: false }
    }
    return { ...item, checked: false }
  }));

  setAsyncStorageToDos(group.groupName, newToDos)
}

//Remove o grupo do Array de grupos 
//cancela o alarme do Expo Notifications de todos os ToDos 
// deleta o array de ToDos
export async function deleteGroup(group: GroupProps) {

  await removeGroupAsyncStorage(group);

  const ToDos = await getAsyncStorageToDo(group.groupName);

  ToDos.forEach(item => {
    if (item.checked != true) {
      Notifications.cancelScheduledNotificationAsync(item.identifier)
    }
  })

  await deleteToDoArrayAsyncStorage(group.groupName);
}





