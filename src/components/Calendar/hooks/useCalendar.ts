import React from 'react';

import {
  getMonthesNames,
  createMonth,
  getWeekDaysNames,
  getMonthNumberOfDays,
  createDate
} from '../../../utils/date';

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
  locale = 'default',
  selectedDate: date,
  firstWeekDayNumber = 2
}: UseCalendarParams) => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days');
  const [selectedDay, setSelectedDay] = React.useState(createDate({ date })); // для отслеживания выбранной даты
  const [selectedMonth, setSelectedMonth] = React.useState(
    createMonth({
      date: new Date(selectedDay.year, selectedDay.monthIndex),
      locale
    }) // для отслеживания выбранного месяца
  );
  // для отслеживания выбранного года
  const [selectedYear, setSelectedYear] = React.useState(selectedDay.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(
    getYearsInterval(selectedDay.year)
  ); // для отслеживания промежутка между годами

  const monthesNames = React.useMemo(() => getMonthesNames(locale), []); // наименования месяцев
  const weekDaysNames = React.useMemo(
    () => getWeekDaysNames(firstWeekDayNumber, locale), // наименования дней недели
    []
  );

  // дни текущего месяца
  const days = React.useMemo(
    () => selectedMonth.createMonthDays(),
    [selectedMonth, selectedYear]
  );

  // дни с предыдущего и будущего месяцев
  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(
      selectedMonth.monthIndex,
      selectedYear
    );

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    // переменная для логики отображения календаря в зависимости от того, 
    // с какого дня недели начинается месяц
    const shiftIndex = firstWeekDayNumber - 1;

    // отображение календаря (дни предыдущего и последующего месяцев)
    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    // сколько дней всего для отображения
    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    // в эту константу будем складывать все дни, которые хотим отобразить
    const result = []; 

    // для отображения дней ДО текущего месяца
    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    // для отображения дней текущего месяца
    for (
      let i = numberOfPrevDays;
      i < totalCalendarDays - numberOfNextDays;
      i += 1
    ) {
      result[i] = days[i - numberOfPrevDays];
    }

    // для отображения дней ПОСЛЕ текущего месяца
    for (
      let i = totalCalendarDays - numberOfNextDays;
      i < totalCalendarDays;
      i += 1
    ) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  // работа стрелок
  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearsInterval(
        getYearsInterval(selectedYearsInterval[0] - 10)
      );
    }

    if (mode === 'years' && direction === 'right') {
      return setSelectedYearsInterval(
        getYearsInterval(selectedYearsInterval[0] + 10)
      );
    }

    if (mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year))
        setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (mode === 'days') {
      const monthIndex =
        direction === 'left'
          ? selectedMonth.monthIndex - 1 // клик влево
          : selectedMonth.monthIndex + 1; // клик вправо
      if (monthIndex === -1) { // переход из января в декабрь
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) // обновление года
          // обновление интервала, если  мы вышли за его пределы
          setSelectedYearsInterval(getYearsInterval(year)); 
        return setSelectedMonth(
          createMonth({ date: new Date(selectedYear - 1, 11), locale })
        );
      }

      if (monthIndex === 12) { // переход из декабря в январь
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) // обновление года
          // обновление интервала, если  мы вышли за его пределы
          setSelectedYearsInterval(getYearsInterval(year)); 
        return setSelectedMonth(
          createMonth({ date: new Date(year, 0), locale })
        );
      }

      setSelectedMonth(
        createMonth({ date: new Date(selectedYear, monthIndex), locale })
      );
    }
  };

  // метод, который будет сeтить месяц по id - выбираешь месяц, тебя туда перекидывает...
  // выбор сохраняется
  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(
      createMonth({ date: new Date(selectedYear, monthIndex), locale })
    );
  };

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearsInterval
    }
  };
};
