import React from 'react';

const TimeSlot = ({ classInfo }) => {
  if (!classInfo) {
    return <td className="time-slot empty"></td>;
  }

  const { subject, teacher } = classInfo;

  if (subject === 'INTERVALO') {
    return <td className="time-slot intervalo">{subject}</td>;
  }

  return (
    <td className="time-slot">
      <div className="subject">{subject}</div>
      <div className="teacher">{teacher}</div>
    </td>
  );
};

export default TimeSlot;