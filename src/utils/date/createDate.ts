import { getWeekNumber } from './getWeekNumber';

interface CreateDateParams {
  locale?: string;
  date?: Date;
}

export const createDate = (params?: CreateDateParams) => {
  const locale = params?.locale ?? 'default';

  const d = params?.date ?? new Date(); // сама дата => если даты нет, то возьми new Date
  const dayNumber = d.getDate();
  const day = d.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = d.getDay() + 1; // номер дня в неделе
  const dayShort = d.toLocaleDateString(locale, { weekday: 'short' });
  const year = d.getFullYear();
  const yearShort = d.toLocaleDateString(locale, { year: '2-digit' });
  const month = d.toLocaleDateString(locale, { month: 'long' });
  const monthShort = d.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = d.getMonth() + 1; // + 1 чтобы это было числом, а не индексом
  const monthIndex = d.getMonth();
  const timestamp = d.getTime();
  const week = getWeekNumber(d); // номер недели

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week
  };
};
