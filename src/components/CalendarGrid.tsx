import { useMemo } from 'react';
import { CalendarDay, DateRange, ThemeConfig } from '../types/calendar';
import { getFestivalsInRange } from '../data/festivals';

interface CalendarGridProps {
  visibleMonth: Date;
  dateRange: DateRange;
  onDayClick: (day: CalendarDay) => void;
  theme: ThemeConfig;
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function mondayIndex(date: Date) {
  // 0=Sun..6=Sat -> convert to 0=Mon..6=Sun
  return (date.getDay() + 6) % 7;
}

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function generateCalendarDays(visibleMonth: Date): CalendarDay[] {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const firstDow = mondayIndex(firstOfMonth); // 0..6 (Mon..Sun)
  const currentMonthDays = daysInMonth(year, month);

  const prevMonth = new Date(year, month - 1, 1);
  const prevMonthDays = daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());

  const cells = 42; // 6 rows x 7 cols
  const days: CalendarDay[] = [];

  for (let i = 0; i < cells; i++) {
    const cellDow = i % 7;
    const isWeekendCol = cellDow === 5 || cellDow === 6;

    const dayOfMonth = i - firstDow + 1;
    if (dayOfMonth < 1) {
      const d = prevMonthDays + dayOfMonth;
      days.push({
        date: d,
        month: 'prev',
        fullDate: new Date(year, month - 1, d),
        isWeekend: isWeekendCol,
      });
      continue;
    }

    if (dayOfMonth > currentMonthDays) {
      const d = dayOfMonth - currentMonthDays;
      days.push({
        date: d,
        month: 'next',
        fullDate: new Date(year, month + 1, d),
        isWeekend: isWeekendCol,
      });
      continue;
    }

    days.push({
      date: dayOfMonth,
      month: 'current',
      fullDate: new Date(year, month, dayOfMonth),
      isWeekend: isWeekendCol,
    });
  }

  return days;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBetween(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t > s && t < e;
}

export default function CalendarGrid({
  visibleMonth,
  dateRange,
  onDayClick,
  theme,
}: CalendarGridProps) {
  const days = useMemo(() => generateCalendarDays(visibleMonth), [visibleMonth]);

  const gridFestivals = useMemo(() => {
    if (!days.length) return [];
    const firstDay = days[0].fullDate;
    const lastDay = days[days.length - 1].fullDate;
    return getFestivalsInRange(firstDay, lastDay, 100);
  }, [days]);

  return (
    <div className="flex flex-col gap-1">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day, i) => {
          const isWeekendHeader = i === 5 || i === 6;
          return (
            <div
              key={day}
              className="text-center py-1"
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: isWeekendHeader ? theme.primary : '#4b5563',
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Calendar days grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, i) => {
          const colIndex = i % 7;
          const isWeekendCol = colIndex === 5 || colIndex === 6;
          const isOverflow = day.month !== 'current';

          const isStart =
            dateRange.start && isSameDay(day.fullDate, dateRange.start);
          const isEnd =
            dateRange.end && isSameDay(day.fullDate, dateRange.end);
          const isSelected = isStart || isEnd;
          const isInRange = isBetween(
            day.fullDate,
            dateRange.start,
            dateRange.end
          );
          const isTodayDate = isSameDay(day.fullDate, new Date());

          let textColor = '#374151';
          if (isOverflow) textColor = '#d1d5db';
          else if (isWeekendCol) textColor = theme.primary;
          
          if (isSelected) textColor = '#ffffff';
          else if (isTodayDate) textColor = theme.primary;

          const dayFestivals = gridFestivals.filter(f => isSameDay(f.date, day.fullDate));
          const primaryFestival = dayFestivals[0];

          return (
            <div key={i} className="flex items-center justify-center py-0.5 relative group">
              <button
                onClick={() => onDayClick(day)}
                className="relative flex items-center justify-center transition-all duration-150 focus:outline-none group"
                style={{
                  width: '34px',
                  height: '34px',
                  minWidth: '34px',
                  minHeight: '34px',
                  borderRadius: '50%',
                  fontSize: '12px',
                  fontWeight: isSelected || isTodayDate ? 700 : isOverflow ? 400 : 500,
                  color: textColor,
                  background: isSelected
                    ? theme.primary
                    : isInRange
                    ? theme.primaryLighter
                    : 'transparent',
                  boxShadow: isTodayDate && !isSelected ? `inset 0 0 0 1.5px ${theme.primary}` : 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Hover ring */}
                {!isSelected && (
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ background: '#f3f4f6' }}
                  />
                )}
                <span className="relative z-10" style={{ transform: primaryFestival ? 'translateY(-1px)' : 'none' }}>{day.date}</span>
                {primaryFestival && (
                  <span 
                    className="absolute bottom-1.5 w-1 h-1 rounded-full z-10" 
                    style={{ background: isSelected ? 'rgba(255,255,255,0.9)' : theme.primary }} 
                  />
                )}
              </button>

              {primaryFestival && (
                 <div 
                  className={`absolute bottom-full mb-1 ${colIndex < 3 ? 'left-0' : colIndex > 3 ? 'right-0' : 'left-1/2 -translate-x-1/2'} w-44 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 bg-white rounded-lg shadow-xl shadow-gray-200/50 border border-gray-100 p-2.5 translate-y-2 group-hover:translate-y-0`}
                 >
                    <div style={{ fontSize: '11px', fontWeight: 700, color: theme.primary, marginBottom: '2px', lineHeight: 1.2 }}>
                      {primaryFestival.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280', lineHeight: 1.3 }}>
                      {primaryFestival.blurb}
                    </div>
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
