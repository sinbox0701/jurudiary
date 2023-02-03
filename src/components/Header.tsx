import { format } from 'date-fns';
import { useRef } from 'react';

export default function Header() {
  const currentDate = new Date();
  const monthRef = useRef<HTMLDivElement>(null);
  function scrollCurrentMonth() {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="bg-white w-full py-2 fixed border-b top-0 flex flex-col items-center justify-center">
      <div className="text-2xl text-black font-blackhans mt-1 mb-2">주류일기</div>
      <div className="flex flex-row space-x-4">
        <p onClick={scrollCurrentMonth}>
          {currentDate.toLocaleString('en-US', { month: 'long' })}
          {format(currentDate, ' dd')}
        </p>
        <p>{format(currentDate, ' yyyy')}</p>
      </div>
    </div>
  );
}
