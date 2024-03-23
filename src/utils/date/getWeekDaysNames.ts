import { createDate } from './createDate';

export const getWeekDaysNames = (
  firstWeekDay: number = 4, // чтобы неделя начиналась с понедельника
  locale: string = 'default'
) => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>['day'];
    dayShort: ReturnType<typeof createDate>['dayShort'];
  }[] = Array.from({ length: 7 }); // пустой массив, длинной 7

  const date = new Date();

  // пройти по массиву и заполнить его наименованиями дней недель
  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
    });

    weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
  });

  return [
    ...weekDaysNames.slice(firstWeekDay - 1),
    ...weekDaysNames.slice(0, firstWeekDay - 1)
  ];
};
