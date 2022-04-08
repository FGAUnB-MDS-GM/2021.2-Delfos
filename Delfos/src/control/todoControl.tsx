import { GroupProps } from "../models/groups";
import { ToDoProps } from "../models/toDos";
import * as Notifications from 'expo-notifications';
import {
  getAsyncStorageToDo,
  removeToDoAsyncStorage,
  setAsyncStorageToDos,
  addToDoAsyncStorage
} from "../data/asyncStorageToDo";
import { getTimeInterval } from "./notificationControl";


export async function loadToDos(group: GroupProps) {
  const ToDos = await getAsyncStorageToDo(group.id)
  return ToDos;
}

//Desative o alarme do ToDo 
// e muda sua propriedade "checked" = true
export async function checkToDo(group: GroupProps, ToDo: ToDoProps) {
  await Notifications.cancelScheduledNotificationAsync(ToDo.identifier);

  const ToDos = await getAsyncStorageToDo(group.id)
  const newToDos: ToDoProps[] = ToDos.map(item => {
    if (item.identifier == ToDo.identifier) {
      return { ...item, checked: true }
    }
    return { ...item }
  })
  await setAsyncStorageToDos(group.id, newToDos);
}

// Ativa o alarme do ToDo no Expo Notifications
// atualiza o seu id e desmarca o ToDo
//OBS: usar apenas para alterar uma ToDo específico
export async function scheduleCheckedToDo(group: GroupProps, ToDo: ToDoProps) {
  let id: string
  if (ToDo.trigger.type == "daily") {
    id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delfos te lembrou!",
        body: ToDo.message,
      },
      trigger: {
        minute: ToDo.trigger.minute,
        hour: ToDo.trigger.hour,
        repeats: true
      }
    });
  }
  if (ToDo.trigger.type == "weekly") {
    id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delfos te lembrou!",
        body: ToDo.message,
      },
      trigger: {
        weekday: ToDo.trigger.weekday,
        minute: ToDo.trigger.minute,
        hour: ToDo.trigger.hour,
        repeats: true
      }
    });
  }
  if (ToDo.trigger.type == 'timeInterval') {

    const seconds = getTimeInterval(ToDo.trigger.hour!, ToDo.trigger.minute!);

    id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delfos te lembrou!",
        body: ToDo.message,
      },
      trigger: {
        seconds: seconds,
        repeats: ToDo.trigger.repeat
      }
    })
  }

  const ToDos = await getAsyncStorageToDo(group.id);
  const newToDos: ToDoProps[] = ToDos.map(item => {
    if (item.identifier == ToDo.identifier) {
      return { ...item, identifier: id, checked: false }
    }
    return { ...item }
  })

  await setAsyncStorageToDos(group.id, newToDos)
}

//OBS: essa função só pode ser executada com ToDos, que já estejam marcados
//Deleta um ToDo do Array de ToDos daquele grupo
export async function deleteToDo(group: GroupProps, ToDo: ToDoProps) {
  await removeToDoAsyncStorage(group.id, ToDo)
}

//Cria um ToDo e adiciona ele no Array de ToDo
// do nome do Group fornecido
export async function createToDo(
  groupId: string,
  identifier: string,
  message: string,
  type: string,
  repeat?: boolean,
  hour?: number,
  minute?: number,
  weekday?: number,
  checked?: boolean
) {
  const newToDo: ToDoProps = {
    identifier: identifier,
    message: message,
    trigger: {
      type: type,
      repeat: repeat,
      hour: hour,
      minute: minute,
      weekday: weekday
    },
    checked: checked
  }
  await addToDoAsyncStorage(groupId, newToDo)

}

//Cria um alarme único com o Expo Notifications e 
// crian um ToDo logo em seguida
export async function scheduleNotificationTimeInterval(
  groupId: string,
  message: string,
  repeat: boolean,
  startMinute: number,
  startHour: number) {

  const type = "timeInterval"
  const totalIntervalTime = getTimeInterval(startHour, startMinute)

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Delfos te lembrou!!",
      body: message,
    },
    trigger: {
      seconds: totalIntervalTime,
      repeats: repeat,
    },
  });

  await createToDo(groupId, id, message, type, repeat, startHour, startMinute, undefined, false);
}

//Cria um alarme diário com o Expo Notifications e 
// cria um ToDo logo em seguida
export async function scheduleNotificationDaily(
  groupId: string,
  message: string,
  startMinute: number,
  startHour: number,) {
  const type = "daily";
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Delfos te lembrou!!",
      body: message,
    },
    trigger: {
      minute: startMinute,
      hour: startHour,
      repeats: true,
    },
  });

  await createToDo(groupId, id, message, type, true, startHour, startMinute, undefined, false)

}

//Cria um alarme semanal com o Expo Notifications e 
// cria um ToDo logo em seguida
export async function scheduleNotificationWeekly(
  groupId: string,
  message: string,
  startMinute: number,
  startHour: number,
  weekday: number) {
  const type = "weekly";
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Delfos te lembrou!!",
      body: message,
    },
    trigger: {
      weekday: weekday,
      hour: startHour,
      minute: startMinute,
      repeats: true,
    },
  });
  await createToDo(groupId, id, message, type, true, startHour, startMinute, weekday, false)
}

export async function filterToDoMessage(group: GroupProps, ToDoMessage: string){
  const ToDos = await getAsyncStorageToDo(group.id);
  const ToDosFiltred = ToDos.filter(item => item.message == ToDoMessage);
  return ToDosFiltred
}
