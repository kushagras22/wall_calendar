import { useMemo, useState, useEffect } from 'react';
import { Theme, ThemeConfig, CalendarDay, DateRange } from '../types/calendar';
import SpiralBinding from './SpiralBinding';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';

const THEMES: Record<Theme, ThemeConfig> = {
  glacier: {
    primary: '#0ea5e9',
    primaryHover: '#0284c7',
    primaryLight: 'rgba(14,165,233,0.18)',
    primaryLighter: 'rgba(14,165,233,0.10)',
    weekendText: '#0ea5e9',
    heroImage:
      'https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&cs=tinysrgb&w=900',
    heroImageAlt: 'Ice climber ascending a frozen mountain face',
    polygonLabel: '#0ea5e9',
  },
  sunset: {
    primary: '#ea580c',
    primaryHover: '#c2410c',
    primaryLight: 'rgba(234,88,12,0.18)',
    primaryLighter: 'rgba(234,88,12,0.09)',
    weekendText: '#ea580c',
    heroImage:
      'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=900',
    heroImageAlt: 'Hiker silhouetted against a vivid mountain sunset',
    polygonLabel: '#f97316',
  },
};

export default function WallCalendar() {
  const [theme, setTheme] = useState<Theme>('glacier');
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState('');
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const themeConfig = THEMES[theme];
  const isGlacier = theme === 'glacier';

  const monthLabel = useMemo(
    () =>
      visibleMonth.toLocaleDateString('en-US', {
        month: 'long',
      }),
    [visibleMonth]
  );

  const yearLabel = useMemo(() => String(visibleMonth.getFullYear()), [visibleMonth]);

  function addMonths(base: Date, delta: number) {
    return new Date(base.getFullYear(), base.getMonth() + delta, 1);
  }

  function goPrevMonth() {
    setVisibleMonth((prev) => addMonths(prev, -1));
    setDateRange({ start: null, end: null });
  }

  function goNextMonth() {
    setVisibleMonth((prev) => addMonths(prev, 1));
    setDateRange({ start: null, end: null });
  }

  function handleDayClick(day: CalendarDay) {
    if (!dateRange.start && !dateRange.end) {
      setDateRange({ start: day.fullDate, end: null });
      return;
    }
    if (dateRange.start && !dateRange.end) {
      if (day.fullDate.getTime() === dateRange.start.getTime()) {
        setDateRange({ start: null, end: null });
        return;
      }
      setDateRange({ start: dateRange.start, end: day.fullDate });
      return;
    }
    setDateRange({ start: null, end: null });
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'glacier' ? 'sunset' : 'glacier'));
  }

  return (
    <div
      className="calendar-reveal"
      style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        animation: mounted ? 'calendarReveal 0.85s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
        opacity: mounted ? undefined : 0,
      }}
    >
      {/* Wall-mounted paper shadow */}
      <div
        className="relative bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            '0 4px 6px rgba(0,0,0,0.07), 0 12px 40px rgba(0,0,0,0.18), 0 32px 80px rgba(0,0,0,0.12), 0 2px 0 #d1d5db',
        }}
      >
        {/* Spiral binding — sits at very top */}
        <div
          className="relative w-full"
          style={{
            background: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            zIndex: 10,
          }}
        >
          <SpiralBinding numCoils={35} />
        </div>

        {/* Theme switcher */}
        <button
          onClick={toggleTheme}
          className="absolute top-10 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: isGlacier
              ? 'linear-gradient(135deg, #ea580c, #f97316)'
              : 'linear-gradient(135deg, #0284c7, #0ea5e9)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
          aria-label={`Switch to ${isGlacier ? 'Sunset' : 'Glacier'} theme`}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isGlacier ? '#f97316' : '#0ea5e9',
              border: '1.5px solid rgba(255,255,255,0.8)',
            }}
          />
          {isGlacier ? 'SUNSET' : 'GLACIER'}
        </button>

        {/* Hero section */}
        <div className="relative" style={{ marginBottom: '28px' }}>
          <HeroSection
            theme={themeConfig}
            isGlacier={isGlacier}
            monthLabel={monthLabel}
            yearLabel={yearLabel}
            onPrevMonth={goPrevMonth}
            onNextMonth={goNextMonth}
          />
        </div>

        {/* Body section */}
        <div className="px-5 pb-6 pt-2">
          {/* Desktop: side by side | Mobile: calendar top, notes bottom */}
          <div className="flex flex-col-reverse md:flex-row gap-5">
            {/* Notes — bottom on mobile, left on desktop */}
            <div
              className="md:w-5/12 w-full"
              style={{ minHeight: '224px' }}
            >
              <NotesSection notes={notes} onChange={setNotes} />
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px self-stretch"
              style={{ background: '#e5e7eb', margin: '0 4px' }}
            />

            {/* Calendar — top on mobile, right on desktop */}
            <div className="md:w-8/12 w-full">
              <CalendarGrid
                visibleMonth={visibleMonth}
                dateRange={dateRange}
                onDayClick={handleDayClick}
                theme={themeConfig}
              />
            </div>
          </div>

          {/* Selection info strip */}
          {(dateRange.start || dateRange.end) && (
            <div
              className="mt-4 flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300"
              style={{ background: themeConfig.primaryLighter }}
            >
              <div style={{ fontSize: '11px', color: themeConfig.primary, fontWeight: 600 }}>
                {dateRange.start && !dateRange.end && (
                  <span>
                    From{' '}
                    <strong>
                      {dateRange.start.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </strong>{' '}
                    — select an end date
                  </span>
                )}
                {dateRange.start && dateRange.end && (
                  <span>
                    {dateRange.start.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    &rarr;{' '}
                    {dateRange.end.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    &middot;{' '}
                    {Math.abs(
                      Math.round(
                        (dateRange.end.getTime() - dateRange.start.getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    ) + 1}{' '}
                    days
                  </span>
                )}
              </div>
              <button
                onClick={() => setDateRange({ start: null, end: null })}
                className="transition-opacity hover:opacity-70"
                style={{ fontSize: '11px', color: themeConfig.primary, fontWeight: 700 }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
