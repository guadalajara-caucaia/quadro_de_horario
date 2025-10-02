import React from 'react';
import TimeSlot from './TimeSlot';

const TimetableRow = ({ grade, timeSlots, days, schedule }) => {
  const formatGrade = (grade) => {
    return grade.replace(' - Manhã', '<br/>Manhã');
  };

  return (
    <>
      {timeSlots.map((timeSlot, index) => (
        <tr key={`${grade}-${timeSlot}`}>
          {index === 0 && (
            <td
              rowSpan={timeSlots.length}
              className="grade-cell"
              dangerouslySetInnerHTML={{ __html: formatGrade(grade) }}
            />
          )}
          <td className="time-cell">{timeSlot}</td>
          {days.map(day => {
            const classInfo = schedule[grade]?.[day]?.[timeSlot];
            return <TimeSlot key={day} classInfo={classInfo} />;
          })}
        </tr>
      ))}
    </>
  );
};

export default TimetableRow;