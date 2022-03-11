import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { ptBR } from "./localeConfig";
import { generateInterval } from "./generateInterval";

import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from "react-native-calendars";

//correção, pois por algum motivo o package de types n esta exportando
// essa interface
type DateCallbackHandler = (date: DateObject) => void;

//correção, pois por algum motivo o package de types n esta exportando
// essa interface
interface DateObject {
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
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
  onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction == "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.white,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.number,
        textDayHeaderFontFamily: theme.fonts.text,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.text,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.text,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      style={{ marginBottom: 20 }}
    />
  );
}

export { Calendar, DayProps, MarkedDateProps, generateInterval };
