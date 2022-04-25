import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";


import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Yup from 'yup';



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

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { WeekDayButton } from "../../components/WeekDayButton";
import theme from "../../components/theme/theme";

import { GroupProps } from '../../../models/groups'

import {
  scheduleNotificationTimeInterval,
  scheduleNotificationDaily,
  scheduleNotificationWeekly,
  deleteToDo
} from '../../../control/todoControl'
import { startOfMinute } from "date-fns";
import { ToDoProps } from "../../../models/toDos";


//setando o padrão de notificações 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export function AddTodo() {

  ///Configurações do Expo Notifications///

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token!));

    // executar uma ação quando: ou a notificação é feita e o usuário ainda está na tela 
    //ou quando ele clica na notificação e abre o app
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
  ///Configurações do Expo Notifications///

  interface Params {
    groupSelected: GroupProps;
    EditToDo: ToDoProps;
  }

  const route = useRoute();
  const { groupSelected } = route.params as Params;
  const { EditToDo } = route.params as Params;
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
  const navigation = useNavigation();


  function handleRepeatButton() {
    if (!repeat) {
      setRepeat(true);
    } else {
      setRepeat(false);
    }
  }

  function handleDailyButton() {
    if (!daily) {
      setDaily(true);
      setWeekly(false);
    } else {
      setDaily(false);
    }
  }

  function handleWeeklyButton() {
    if (!weekly) {
      setWeekly(true);
      setDaily(false);
    } else {
      setWeekly(false);
      setWeekDay(0);
    }
  }

  function handleWithEndButton() {
    if (!withEnd) {
      setWithEnd(true);
    } else {
      setWithEnd(false);
    }
  }

  function handleSetWeekDay(weekDay: number) {
    setWeekDay(weekDay)
  }

  async function handleCancel() {
    navigation.navigate('Home');
  }

  //Confirma a criação do ToDo 
  async function handleConfirm(groupId: string) {

    function convertStringToNumber(numberINstring: string) {
      if (numberINstring === '') {
        numberINstring = '-1'
        const number = Number.parseInt(numberINstring);
        return number;
      } else {
        const number = Number.parseInt(numberINstring);
        return number;
      }
    }

    const startHourNumber = convertStringToNumber(startHour);
    const startMinuteNumber = convertStringToNumber(startMinute);
    const endHourNumber = convertStringToNumber(endHour);
    const endMinuteNumber = convertStringToNumber(endMinute);

    const schemaDaily = Yup.object().shape({
      message: Yup.string()
        .required('A mensagem do ToDo é obrigatória'),
      minute: Yup.number()
        .required('O minuto para inciar é obrigatório')
        .min(0, "O minuto para inciar não pode ser menor que 0").max(59, "O minuto para inciar não pode ser maior que 59"),
      hour: Yup.number()
        .required('A hora para inciar é obrigatória')
        .min(0, "A hora para inciar não pode ser menor que 0").max(23, "A hora para inciar não pode ser maior que 23"),
    });

    const schemaDailyWithEnd = Yup.object().shape({
      message: Yup.string()
        .required('A mensagem do ToDo é obrigatória'),
      minute: Yup.number()
        .required('O minuto para inciar é obrigatório')
        .min(0, "O minuto para inciar não pode ser menor que 0").max(59, "O minuto para inciar não pode ser maior que 59"),
      hour: Yup.number()
        .required('A hora para inciar é obrigatória')
        .min(0, "A hora para inciar não pode ser menor que 0").max(23, "A hora para inciar não pode ser maior que 23"),
      endMinute: Yup.number()
        .required('O minuto para encerrar é obrigatório')
        .min(0, "O minuto para encerrar não pode ser menor que 0").max(59, "O minuto para encerrar não pode ser maior que 59"),
      endHour: Yup.number()
        .required('A hora para encerrar é obrigatória')
        .min(0, "A hora para encerrar não pode ser menor que 0").max(23, "A hora para encerrar não pode ser maior que 23"),
    });

    const schemaWeekly = Yup.object().shape({
      message: Yup.string()
        .required('A mensagem do ToDo é obrigatória'),
      minute: Yup.number()
        .required('O minuto para inciar é obrigatório')
        .min(0, "O minuto para inciar não pode ser menor que 0").max(59, "O minuto para inciar não pode ser maior que 59"),
      hour: Yup.number()
        .required('A hora para inciar é obrigatória')
        .min(0, "A hora para inciar não pode ser menor que 0").max(23, "A hora para inciar não pode ser maior que 23"),
      weekDay: Yup.number()
        .required('Escolha o dia da semana, por favor!')
        .min(1, 'Escolha o dia da semana, por favor!')
    });

    const schemaWeeklyWithEnd = Yup.object().shape({
      message: Yup.string()
        .required('A mensagem do ToDo é obrigatória'),
      minute: Yup.number()
        .required('O minuto para inciar é obrigatório')
        .min(0, "O minuto para inciar não pode ser menor que 0").max(59, "O minuto para inciar não pode ser maior que 59"),
      hour: Yup.number()
        .required('A hora para inciar é obrigatória')
        .min(0, "A hora para inciar não pode ser menor que 0").max(23, "A hora para inciar não pode ser maior que 23"),
      endMinute: Yup.number()
        .required('O minuto para encerrar é obrigatório')
        .min(0, "O minuto para encerrar não pode ser menor que 0").max(59, "O minuto para encerrar não pode ser maior que 59"),
      endHour: Yup.number()
        .required('A hora para encerrar é obrigatória')
        .min(0, "A hora para encerrar não pode ser menor que 0").max(23, "A hora para encerrar não pode ser maior que 23"),
      weekDay: Yup.number()
        .required('Escolha o dia da semana, por favor!')
        .min(1, 'Escolha o dia da semana, por favor!')
    });

    if(EditToDo){
      await deleteToDo(groupSelected, EditToDo)
    }
    if (daily) {
      if (withEnd) {
        try {
          const data = {
            message: message,
            minute: startMinuteNumber,
            hour: startHourNumber,
            endMinute: endMinuteNumber,
            endHour: endHourNumber,
          }
          await schemaDailyWithEnd.validate(data);
          await scheduleNotificationDaily(groupId, message, startMinuteNumber, startHourNumber);
          await scheduleNotificationDaily(groupId, `${message} END`, endMinuteNumber, endHourNumber);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            return Alert.alert('Opa', error.message);
          }
        }
      } else {
        try {
          const data = {
            message: message,
            minute: startMinuteNumber,
            hour: startHourNumber
          }
          await schemaDaily.validate(data);
          await scheduleNotificationDaily(groupId, message, startMinuteNumber, startHourNumber);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            return Alert.alert('Opa', error.message);
          }
        }
      }
    };
    if (weekly) {
      if (withEnd) {
        try {
          const data = {
            message: message,
            minute: startMinuteNumber,
            hour: startHourNumber,
            endMinute: endMinuteNumber,
            endHour: endHourNumber,
            weekDay: weekDay
          }
          await schemaWeeklyWithEnd.validate(data);
          await scheduleNotificationWeekly(groupId, message, startMinuteNumber, startHourNumber, weekDay);
          await scheduleNotificationWeekly(groupId, `${message} END`, endMinuteNumber, endHourNumber, weekDay);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            return Alert.alert('Opa', error.message);
          }
        }
      } else {
        try {
          const data = {
            message: message,
            minute: startMinuteNumber,
            hour: startHourNumber,
            weekDay: weekDay
          }
          await schemaWeekly.validate(data);
          await scheduleNotificationWeekly(groupId, message, startMinuteNumber, startHourNumber, weekDay);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            return Alert.alert('Opa', error.message);
          }
        }
      }
    };
    if (!daily && !weekly) {
      if (withEnd) {
        try {
          const data = {
            message: message,
            minute: startMinuteNumber,
            hour: startHourNumber,
            endMinute: endMinuteNumber,
            endHour: endHourNumber,
          }
          await schemaDailyWithEnd.validate(data);
          await scheduleNotificationTimeInterval(groupId, message, repeat, startMinuteNumber, startHourNumber);
          await scheduleNotificationTimeInterval(groupId, `${message} END`, repeat, endMinuteNumber, endHourNumber);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            return Alert.alert('Opa', error.message);
          }
        }
      } else {
        try {
          const data = {
            message: message,
            minute: startMinuteNumber,
            hour: startHourNumber
          }
          await schemaDaily.validate(data);
          await scheduleNotificationTimeInterval(groupId, message, repeat, startMinuteNumber, startHourNumber);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            return Alert.alert('Opa', error.message);
          }
        }
      }
    }
    navigation.navigate('Home');
  }

  useEffect(() => {
    if(EditToDo){
      setStartHour(EditToDo.trigger.hour!.toString())
      setStartMinute(EditToDo.trigger.minute!.toString())
      setMessage(EditToDo.message)
      setDaily(EditToDo.trigger.type == 'daily')
      setWeekly(EditToDo.trigger.type == "weekly")
      setWeekDay(EditToDo.trigger.weekday!)
    }
  },[]);

  return (
    <Container>
      <BackgroundLinear>
        <Header>
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

            <InputTimeText onChangeText={setStartHour} defaultValue={EditToDo ? EditToDo.trigger.hour?.toString() : ""}/>
            <TextButton style={{ fontSize: 15 }}> : </TextButton>
            <InputTimeText onChangeText={setStartMinute} defaultValue={EditToDo ? EditToDo.trigger.minute?.toString() : ""} />

            {
              withEnd &&
              <>
                <TextButton style={{ fontSize: 15, margin: 10 }}>até</TextButton>

                <InputTimeText onChangeText={setEndHour} value={endHour} />
                <TextButton style={{ fontSize: 15 }}> : </TextButton>
                <InputTimeText onChangeText={setEndMinute} value={endMinute} />
              </>
            }

          </InputTime>
        </BackgroundLinear>

        <BackgroundLinear>
          <InputTodo
            numberOfLines={1}
            onChangeText={setMessage}
            defaultValue={EditToDo ? EditToDo.message : ""}
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
          <ConfirmButton onPress={() => handleConfirm(groupSelected.id)}>
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