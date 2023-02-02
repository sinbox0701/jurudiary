import { Icon } from '@iconify/react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from 'date-fns';
import { useState } from 'react';

interface CalendarHeaderProps {
  currentMonth: number | Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

interface CalendarCellProps {
  currentMonth: number | Date;
  selectedDate: Date;
  onDateClick: (value: Date) => void;
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }: CalendarHeaderProps) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex flex-row">
        <span>
          <span className="mr-1">{format(currentMonth, 'M')}월</span>
          {format(currentMonth, 'yyyy')}
        </span>
      </div>
      <div className="flex flex-row">
        <Icon icon="bi:arrow-left-circle-fill" className="mr-1" onClick={prevMonth} />
        <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="bg-red-300 text-white font-medium px-2" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="flex flex-row gap-4">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }: CalendarCellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day.toString()}
          onClick={() => onDateClick(parse(cloneDay.toDateString(), 'd', new Date()))}
        >
          <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-4 items-center justify-center" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }
  return <div>{rows}</div>;
};

export default function Calender() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  return (
    <div>
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
}
