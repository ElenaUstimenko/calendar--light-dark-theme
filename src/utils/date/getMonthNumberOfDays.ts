export const getMonthNumberOfDays = (
  monthIndex: number,
  yearNumber: number = new Date().getFullYear()
) => new Date(yearNumber, monthIndex + 1, 0).getDate(); 
// вернётся год, нынешний месяц, и за счёт 0 => последняя дата этого месяца, 
// затем getDate() вернёт число этого дня (например 31)
// таким образом понятно сколько дней в месяце