import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";


import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


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
   scheduleNotificationWeekly
  } from '../../../control/todoControl'


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
  }
  
  const route = useRoute();
  const { groupSelected } = route.params as Params;
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

  //Confirma a criação do ToDo (falta fazer a validção do que foi preenchido)
  async function handleConfirm(groupName: string) {
    const startHourNumber = Number.parseInt(startHour);
    const startMinuteNumber = Number.parseInt(startMinute);
    const endHourNumber = Number.parseInt(endHour);
    const endMinuteNumber = Number.parseInt(endMinute);

    if (daily) {
      if (withEnd) {
        scheduleNotificationDaily(groupName, message, startMinuteNumber, startHourNumber);
        scheduleNotificationDaily(groupName, `ENCERRAMENTO ${message}`, endMinuteNumber, endHourNumber);
      } else {
        scheduleNotificationDaily(groupName, message, startMinuteNumber, startHourNumber);
      }
    };
    if (weekly) {
      if (withEnd) {
        scheduleNotificationWeekly(groupName, message, startMinuteNumber, startHourNumber, weekDay);
        scheduleNotificationWeekly(groupName,`ENCERRAMENTO ${message}`, endMinuteNumber, endHourNumber, weekDay);
      } else {
        scheduleNotificationWeekly(groupName, message, startMinuteNumber, startHourNumber, weekDay);
      }
    };
    if (!daily && !weekly) {
      if(withEnd){ 
        scheduleNotificationTimeInterval(groupName, message, repeat, startMinuteNumber, startHourNumber);
        scheduleNotificationTimeInterval(groupName, `ENCERRAMENTO ${message}`, repeat, endMinuteNumber, endHourNumber);
      } else {
        scheduleNotificationTimeInterval(groupName, message, repeat, startMinuteNumber, startHourNumber);
      }
    }
    navigation.navigate('Home');
  }


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
          <ConfirmButton onPress={()=> handleConfirm(groupSelected.groupName)}>
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