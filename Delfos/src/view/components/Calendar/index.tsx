import React from "react";
import { Feather } from '@expo/vector-icons';
import { useTheme } from "styled-components";
import { ptBR } from './localeConfig';

import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from 'react-native-calendars';




LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
  },
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
}

function Calendar({ markedDates }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) =>
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction == 'left' ? "chevron-left" : "chevron-right"}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.white,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text,
        paddingBottom: 10,
        marginBottom: 10,
      }}

      theme={{
        textDayFontFamily: theme.fonts.text,
        textDayHeaderFontFamily: theme.fonts.text,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.text,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.text,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}

      firstDay={1}
      markingType="period"
      markedDates={markedDates}

    />
  );
}

export {
  Calendar,
  DayProps,
  MarkedDateProps,
}