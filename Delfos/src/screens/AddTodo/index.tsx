import React, { useEffect, useState, useRef } from "react";
import { Alert, Platform } from "react-native";
import { addDays, format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { PermissionStatus } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { TodoCard } from "../../components/TodoCard";
import { WeekDayButton } from "../../components/WeekDayButton";

import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps
} from "../../components/Calendar";

import {
  Container,
  Header,
  ButtonGroups,
  HeaderTitle,
  TitleBox,
  Title,
  SubTitle,
  Listagem,
  InputTodo,
  ToggleButton,
  TextButton,
  FinalButton,
  CancelButton,
  ConfirmButton,
  InputTime,
  InputTimeText,
  WeekDaySelectBox,

} from './styles';
import { RectButtonProps } from "react-native-gesture-handler";
import theme from "../../global/theme";
import { useNavigation } from "@react-navigation/native";
import { setWeek } from "date-fns/esm";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface ToggleButton extends RectButtonProps {
  isActive: boolean
}

interface idAlarms {
  id: string;
  checked: boolean;
}

//setando o padrão de notificações 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function AddTodo() {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //quando for carregar a tela verifica se ter as permissões para emitir notificações

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  //Usar asyncStorege para salvar esse Array
  const [idAlarms, setIdAlarms] = useState<idAlarms[]>([]);


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token!));

    // aqui ele pode executar uma ação quando ou a notificação é feita o usuário ainda está na tela ou quando ele clica na notificação
    // (eu acho ainda estou testand pra ver o que dá certo)
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(!notification);
      console.log(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);

    });
    return () => {
      //tirando a notificação da lista de agendadas, pois ela já foi executada
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  async function scheduleNotificationSecond(message: string, repeat: boolean, startMinute: number, startHour: number, endMinute?: number, endHour?: number) {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delfos te lembrou!!",
        body: message,
      },
      trigger: {
        seconds: startMinute * 60 + startHour * 3600,
        repeats: repeat,
      },
    });

    setIdAlarms(rest=> [...rest, {id, checked: false}]);
    

    if (endMinute != null && endHour != null) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Delfos te lembrou!!",
          body: `ENCERRAMENTO ${message}`,
        },
        trigger: {
          seconds: endMinute * 60 + endHour * 3600,
          repeats: repeat,
        },
      });
    }

    console.log(idAlarms)
  }

  async function scheduleNotificationWeekly(message: string, startMinute: number, startHour: number, weekday: number, endMinute?: number, endHour?: number) {

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


    if (endMinute != null && endHour != null) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Delfos te lembrou!!",
          body: `ENCERRAMENTO ${message}`,
        },
        trigger: {
          weekday: weekday,
          hour: endHour,
          minute: endMinute,
          repeats: true,
        },
      });
    }
  }

  async function scheduleNotificationDaily(message: string, startMinute: number, startHour: number, endMinute?: number, endHour?: number) {
    await Notifications.scheduleNotificationAsync({
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

    if (endMinute != null && endHour != null)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Delfos te lembrou!!",
          body: `ENCERRAMENTO! ${message} `,
        },
        trigger: {
          minute: endMinute,
          hour: endHour,
          repeats: true,
        },
      });
  }


  async function alarmesSetados() {
    const alarmes = await Notifications.getAllScheduledNotificationsAsync();
    console.log(alarmes);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const [weekDay, setWeekDay] = useState(0);
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [message, setMessage] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [withEnd, setWithEnd] = useState(false);


  const [notificationButton, setNotificationButton] = useState(false);

  const navigation = useNavigation();

  function handleOpenModalGrupos() {
    Alert.alert("abrir modal")
    /* abre o modal com os grupos de ToDos criados pelo usuário*/
  }
  function handleTest() {
    Alert.alert("teste2")
    /* marcar como feito e desfeito*/
  }

  function getPlatformDate(date: Date) {
    if (Platform.OS === 'ios') {
      return addDays(date, 1);
    } else {
      return date;
    }
  }

  function handleChangeDate(date: DayProps) {

    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;


    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })

    setWeekDay(weekDayConvert(new Date(firstDate).getDay()))
  }
  function weekDayConvert(weekDay: number) {
    switch (weekDay) {
      case 6:
        return 1;
      default:
        return weekDay + 2;
    }
  }

  function handleRepeatButton() {
    if (!repeat) {
      setRepeat(true);
      console.log('eita')
    } else {
      setRepeat(false);
      console.log('uepa!!')
    }
  }

  function handleDailyButton() {
    if (!daily) {
      setDaily(true);
      setWeekly(false);
      console.log('daily true')
    } else {
      setDaily(false);
      console.log('daily false')
    }
  }

  function handleWeeklyButton() {
    if (!weekly) {
      setWeekly(true);
      setDaily(false);
      console.log('weekly true')
    } else {
      setWeekly(false);
      setWeekDay(0);
      console.log('weekly false')
    }
  }

  function handleWithEndButton() {
    if (!withEnd) {
      setWithEnd(true);
    } else {
      setWithEnd(false);
    }
  }

  function handleNotificationButton() {
    if (!notificationButton) {
      setNotificationButton(true);
      console.log("Notificando")
    } else {
      setNotificationButton(false);
      console.log("N notificando")
    }
  }

  function handleSetWeekDay(weekDay: number) {
    setWeekDay(weekDay)
    console.log(weekDay)
  }

  async function handleCancel() {
    Alert.alert('Cancelamento', 'Cancelamento feito com sucesso');
    await Notifications.cancelAllScheduledNotificationsAsync();
    //alarmesSetados();
    //console.log(idAlarms)

  }

  async function handleConfirm() {
    Alert.alert('Confirmado', 'Todo anotado com sucesso');
    //setAlarm();
    const startHourNumber = Number.parseInt(startHour);
    const startMinuteNumber = Number.parseInt(startMinute);
    const endHourNumber = Number.parseInt(endHour);
    const endMinuteNumber = Number.parseInt(endMinute);

    // FAZER A VERIFICAÇÃO SE O TEMPO DE ENCERRAMENTO É REALMENTE DEPOIS DO DE INICIO 
    // E AINDA PREPARAR A LÓGICA DE CASO N TENHA TEMPO DE ENCERRAMENTO SETAR O ALARME APENAS COM O INICIO
    // SE TIVER ENCERRAMENTO SETAR COM INICIO E COM ENCERRAMENTO
    if (daily) {
      if (withEnd) {
        scheduleNotificationDaily(message, startMinuteNumber, startHourNumber, endMinuteNumber, endHourNumber);
      } else {
        scheduleNotificationDaily(message, startMinuteNumber, startHourNumber);
      }
    };

    if (weekly) {
      if (withEnd) {
        scheduleNotificationWeekly(message, startMinuteNumber, startHourNumber, weekDay, endMinuteNumber, endHourNumber);
      } else {
        scheduleNotificationWeekly(message, startMinuteNumber, startHourNumber, weekDay);
      }
    };

    if (!daily && !weekly) {
      let hour = startHourNumber - new Date().getHours();
      let minute = startMinuteNumber - new Date().getMinutes();

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

      //mesma lógica anterior, contudo agora aplicada para o horário de encerramento
      let hourEnd = endHourNumber - new Date().getHours();
      let minuteEnd = endMinuteNumber - new Date().getMinutes();

      if (hourEnd == 0) {
        if (minuteEnd < 0) {
          hourEnd = 23 + hourEnd
          minuteEnd = 60 - (minuteEnd * (-1))
        }
        if (minuteEnd == 0) {
          hourEnd += 24
        }
      }

      if (hourEnd < 0) {
        hourEnd = 24 + hourEnd
        if (minuteEnd < 0) {
          hourEnd -= 1
          minuteEnd = 60 - (minuteEnd * (-1))
        }
      }

      console.log(hour, minute);

      await scheduleNotificationSecond(message, repeat, minute, hour);
      
    }
  }


  return (
    <Container>
      <BackgroundLinear>
        <Header>
          <ButtonGroups>
            <MenuButton
              onPress={handleOpenModalGrupos}
            />
          </ButtonGroups>
          <HeaderTitle>
            <TitleBox>
              <Title>
                Just Do it!
              </Title>
            </TitleBox>
            <SubTitle>
              Adicionar Todos
            </SubTitle>
          </HeaderTitle>
        </Header>
      </BackgroundLinear>

      <Listagem>
        <BackgroundLinear type="secondary">
          <InputTime>

            <InputTimeText onChangeText={setStartHour} />
            <TextButton style={{ fontSize: 15 }}> : </TextButton>
            <InputTimeText onChangeText={setStartMinute} />

            {
              withEnd &&
              <>
                <TextButton style={{ fontSize: 15, margin: 10 }}>até</TextButton>

                <InputTimeText onChangeText={setEndHour} />
                <TextButton style={{ fontSize: 15 }}> : </TextButton>
                <InputTimeText onChangeText={setEndMinute} />
              </>
            }

          </InputTime>
        </BackgroundLinear>

        <BackgroundLinear>
          <InputTodo
            numberOfLines={1}
            onChangeText={setMessage}
          />
        </BackgroundLinear>

        <BackgroundLinear>
          <GestureHandlerRootView>
            <ToggleButton
              isActive={withEnd}
              onPress={handleWithEndButton}
            >
              <TextButton>Tempo para encerrar</TextButton>
              <Feather
                name={withEnd ? "toggle-right" : "toggle-left"}
                size={30}
                color={withEnd ? theme.colors.secondary : theme.colors.white}
              />
            </ToggleButton>
          </GestureHandlerRootView>
        </BackgroundLinear>

        <BackgroundLinear>
          <GestureHandlerRootView>
            <ToggleButton
              isActive={repeat}
              onPress={handleRepeatButton}
            >
              <TextButton>Repetir em loop</TextButton>
              <Feather
                name={repeat ? "toggle-right" : "toggle-left"}
                size={30}
                color={repeat ? theme.colors.secondary : theme.colors.white}
              />
            </ToggleButton>
          </GestureHandlerRootView>
        </BackgroundLinear>

        <BackgroundLinear>
          <GestureHandlerRootView>
            <ToggleButton
              isActive={daily}
              onPress={handleDailyButton}
            >
              <TextButton>Diário</TextButton>
              <Feather
                name={daily ? "toggle-right" : "toggle-left"}
                size={30}
                color={daily ? theme.colors.secondary : theme.colors.white}
              />
            </ToggleButton>
          </GestureHandlerRootView>
        </BackgroundLinear>

        <BackgroundLinear>
          <GestureHandlerRootView>
            <ToggleButton
              isActive={weekly}
              onPress={handleWeeklyButton}
            >
              <TextButton>Semanal</TextButton>
              <Feather
                name={weekly ? "toggle-right" : "toggle-left"}
                size={30}
                color={weekly ? theme.colors.secondary : theme.colors.white}
              />
            </ToggleButton>
          </GestureHandlerRootView>
        </BackgroundLinear>

        {
          weekly &&
          <BackgroundLinear>
            <WeekDaySelectBox>
              <WeekDayButton setWeekDay={handleSetWeekDay} weekDaySelected={weekDay} />
            </WeekDaySelectBox>
          </BackgroundLinear>
        }

      </Listagem>

      <FinalButton>
        <GestureHandlerRootView>
          <CancelButton onPress={handleCancel}>
            <Feather
              name="x"
              color={theme.colors.white}
              size={30}
            />
          </CancelButton>
        </GestureHandlerRootView>
        <GestureHandlerRootView>
          <ConfirmButton onPress={handleConfirm}>
            <Feather
              name="check"
              color={theme.colors.white}
              size={30}
            />
          </ConfirmButton>
        </GestureHandlerRootView>
      </FinalButton>
    </Container>
  );
}