import React from 'react';
import TimetableRow from './TimetableRow';

const Timetable = ({ data }) => {
  const { days, timeSlots, schedule, grades } = data;

  return (
    <table className="timetable">
      <thead>
        <tr>
          <th>Sér.</th>
          <th>Horário</th>
          {days.map(day => <th key={day}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {grades.map(grade => (
          <TimetableRow
            key={grade}
            grade={grade}
            timeSlots={timeSlots}
            days={days}
            schedule={schedule}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Timetable;