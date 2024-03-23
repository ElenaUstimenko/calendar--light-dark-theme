import React from 'react';
import { Calendar } from './components';
import { formatDate } from './utils/date';
import useTheme from './utils/hooks/useTheme';
import './app/styles/index.scss';

export const App: React.FC = () => {
  const [selectedDate, setSelectedDay] = React.useState(new Date()); // сегодняшняя дата
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={`app__container ${theme}`}>
      <button className='btn' onClick={toggleTheme}>
        {theme}
      </button>
      <div className='date__container'>
        {formatDate(selectedDate, 'DDD DD MMM YYYY')}
      </div>

      <Calendar // можно изменить язык добавив locale='en-US' for english 
                // or 'ko-KR' for korean etc.
        selectedDate={selectedDate}
        selectDate={date => setSelectedDay(date)}
      />

    </div>
  );
};

export default App;
