import React from 'react';
import { Calendar } from './components';
import { formatDate } from './utils/date';

import './app/styles/global.css';

export const App: React.FC = () => {
  const [selectedDate, setSelectedDay] = React.useState(new Date()); // сегодняшняя дата

  return (
    <div className="app__container">
      <div className="date__container">
        {formatDate(selectedDate, 'DDD DD MMM YYYY')}
      </div>

      <Calendar
        selectedDate={selectedDate}
        selectDate={date => setSelectedDay(date)}
      />
    </div>
  );
};

export default App;
