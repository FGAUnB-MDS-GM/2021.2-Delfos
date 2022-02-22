import { eachDayOfInterval, format } from 'date-fns';

import { MarkedDateProps, DayProps } from '.';
import theme from '../../global/theme';
import { addDays } from 'date-fns';
import { Platform } from 'react-native';

function getPlatformDate(date: Date) {
  if (Platform.OS === 'ios') {
    return addDays(date, 1);
  } else {
    return date;
  }
}
export function generateInterval(start: DayProps, end: DayProps) {

  let interval: MarkedDateProps = {};

  const startDay = addDays(new Date(start.timestamp),1);
  const endDay = addDays(new Date(end.timestamp),1);

  eachDayOfInterval({start: startDay,end: endDay})
  .forEach((item)=> {
    const date = format(getPlatformDate(item), 'yyyy-MM-dd');
    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date 
        ? theme.colors.primary : theme.colors.primary_light,

        textColor: start.dateString === date || end.dateString === date 
        ? theme.colors.secondary : theme.colors.text,
      }
    }
  });
  
  return interval; 
}
