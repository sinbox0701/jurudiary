import { useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import { format, addMonths, startOfWeek, addDays } from 'date-fns';
import { endOfWeek, isSameDay, isSameMonth } from 'date-fns';
import { startOfMonth, endOfMonth } from 'date-fns';

interface CalendarHeaderProps {
  currentMonth: Date;
}

interface CalendarCellProps {
  currentMonth: Date;
  selectedDate: Date;
}

const RenderHeader = ({ currentMonth }: CalendarHeaderProps) => {
  return (
    <div className="items-center text-center">
      {currentMonth.toLocaleString('en-US', { month: 'long' })}
    </div>
  );
};

const RenderDays = () => {
  const days: any[] = [];
  const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'];
  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i} className=" bg-[#D587B2] px-2 py-1 rounded-lg">
        {date[i]}
      </div>
    );
  }
  return <div className="flex flex-row gap-3">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate }: CalendarCellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows: any[] = [];
  let days: any[] = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : 'not-valid'
          }`}
          key={uuid()}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : isSameMonth(day, monthStart) && isSameDay(day, selectedDate)
                ? 'text today'
                : ''
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={uuid()} className="grid grid-cols-7 gap-8">
        {days}
      </div>
    );
    days = [];
  }
  return <div>{rows}</div>;
};

export default function Calender() {
  const currentDate = new Date();
  const selectedDate = new Date();

  let currentMonth = new Date(format(currentDate, 'yyyy'));
  let months: any[] = [];

  const monthRef = useRef<HTMLDivElement>(null);

  for (let i = 0; i < 12; i++) {
    months.push(
      <div
        key={uuid()}
        ref={format(currentMonth, 'MM') === format(selectedDate, 'MM') ? monthRef : null}
      >
        <RenderHeader currentMonth={currentMonth} />
        <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} />
      </div>
    );
    currentMonth = addMonths(currentMonth, 1);
  }

  useEffect(() => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  return (
    <div>
      <RenderDays />
      <div className="space-y-2">{months}</div>
    </div>
  );
}
