import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import React from 'react';
import { useTheme } from 'styled-components';
import { BackgroundLinear } from '../../components/BackgroundLinear';
import { ButtonAdd } from '../../components/ButtonAdd';
import {
  Calendar,
  MarkedDateProps
} from '../../components/Calendar';
import { MenuButton } from '../../components/MenuButton';

import {
  Container,
  Header,
  ButtonGroups,
  HeaderTitle,
  TitleBox,
  Title,
  SubTitle,
} from "./styles";
import { ToDoProps } from '../../../models/toDos';

export function CalendarScreen() {

  interface Params {
    toDosWeekly: ToDoProps[];
  }
  const route = useRoute();
  const { toDosWeekly } = route.params as Params;
  const navigation = useNavigation()
  const theme = useTheme();
  const [intervalAll, setIntervalAll] = useState<MarkedDateProps>({} as MarkedDateProps);

/** 
  const testDates: MarkedDateProps = {
    "2022-04-24": {
      color: theme.colors.primary,
      textColor: theme.colors.text
    },
    "2022-04-23": {
      color: theme.colors.primary,
      textColor: theme.colors.text
    }
  }
*/

  //marcnado todas segundas do proximo e do mês seguinte
  function allWeekDaysOfMonth(weekDay: number) {

    let interval: MarkedDateProps = {};
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    let day = 0;
    const days = [];
    const numberOfDays = new Date(year, month, 0).getDate();
    let weekDayMonth = new Date(`${month}/${day}/${year}`).getDay();

    while (weekDay != weekDayMonth) {
      day++
      weekDayMonth = new Date(`${month}/${day}/${year}`).getDay();
    }

    while (day < numberOfDays) {
      if (day > 9) {
        days.push(`${year}-0${month}-${day}`)
      } else {
        if (month > 9) {
          days.push(`${year}-${month}-0${day}`)
        } else {
          days.push(`${year}-0${month}-0${day}`)
        }
      }
      day = day + 7
    }

    days.forEach((item) => {
      interval = {
        ...interval,
        [item]: {
          color: theme.colors.primary,
          textColor: theme.colors.text
        }
      }
    })

    return interval
  }

  function handleGroupsList() {
    navigation.navigate('Groups')
  }

  function handleGoBack(){
    navigation.goBack();
  }

  useEffect(() => {
    let markDays: MarkedDateProps = {};
    toDosWeekly.forEach((item)=> {
      const response = allWeekDaysOfMonth(item.trigger.weekday!-1)
      markDays= {
        ...markDays,
        ...response
      }
    })
    setIntervalAll(markDays)
    
  }, [])

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
              Calendário
            </SubTitle>
          </HeaderTitle>
        </Header>
      </BackgroundLinear>

      <Calendar
        markedDates={intervalAll}
      />
      <ButtonAdd icon="calendar" onPress={handleGoBack} />
    </Container>
  )
}