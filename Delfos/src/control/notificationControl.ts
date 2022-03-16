import * as Notifications from 'expo-notifications';

export function getTimeInterval(startHour: number, startMinute: number) {
  let hour = startHour - new Date().getHours();
  let minute = startMinute - new Date().getMinutes();

  //lógica para pegar o intervalo de tempo entre o tempo atual e o 
  // tempo que foi setado pelo usuário
  if (hour == 0) {
    if (minute < 0) {
      hour = 23 + hour
      minute = 60 - (minute * (-1))
    }
    if (minute == 0) {
      hour += 24
    }
  }

  if (hour < 0) {
    hour = 24 + hour
    if (minute < 0) {
      hour -= 1
      minute = 60 - (minute * (-1))
    }
  }

  if (minute < 0) {
    minute = 60 + minute
    hour = hour - 1
  }

  const totalIntervalTime = minute * 60 + hour * 3600;
  return totalIntervalTime;
}

//Cria uma alarme do Expo Notification timeInterval
export async function notificationTimeInterval(
  message: string,
  repeat: boolean,
  startMinute: number,
  startHour: number) {

  const totalIntervalTime = getTimeInterval(startHour, startMinute);
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Delfos te lembrou!!',
      body: message,
    },
    trigger: {
      seconds: totalIntervalTime,
      repeats: repeat,
    },
  });
  return id;
}

//Cria um alarme do Expo Notification diário
export async function notificationDaily(
  message: string,
  startMinute: number,
  startHour: number,
) {
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
  return id;
}

//Cria um alarme do Expo Notification semanal
export async function notificationWeekly(
  message: string,
  startMinute: number,
  startHour: number,
  weekday: number
) {
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
  return id;
}