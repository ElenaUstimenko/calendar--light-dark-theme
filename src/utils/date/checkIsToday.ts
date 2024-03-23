import { checkDateIsEqual } from './checkDateIsEqual';

// проверяет сегодняшняя дата или нет
export const checkIsToday = (date: Date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};
