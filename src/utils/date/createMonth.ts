import { createDate } from './createDate';
import { getMonthNumberOfDays } from './getMonthNumberOfDays';

interface CreateMonthParams {
  date?: Date;
  locale?: string;
}

export const createMonth = (params?: CreateMonthParams) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const getDay = (dayNumber: number) =>
    createDate({ date: new Date(year, monthIndex, dayNumber), locale }); // список всех дней в месяце

  const createMonthDays = () => {  // перечень дней для конкретного месяца
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) { // -1, т.к. мы начинаем с 0 идти по массиву
      days[i] = getDay(i + 1); // заполняем массив days с помощью getDay, прокидывая туда номер дня
    }

    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays
  };
};
