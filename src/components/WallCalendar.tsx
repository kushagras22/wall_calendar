import {
  useMemo,
  useState,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type AnimationEvent as ReactAnimationEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { Theme, ThemeConfig, CalendarDay, DateRange, RangeNote } from '../types/calendar';
import SpiralBinding from './SpiralBinding';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import FestivalPanel from './FestivalPanel';
import { getFestivalsInRange } from '../data/festivals';

type FlipPhase = 'idle' | 'out-next' | 'in-next' | 'out-prev' | 'in-prev';

const FLIP_OUT_NEXT = 'calendarPageFlipOutNext';
const FLIP_IN_NEXT = 'calendarPageFlipInNext';
const FLIP_OUT_PREV = 'calendarPageFlipOutPrev';
const FLIP_IN_PREV = 'calendarPageFlipInPrev';

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

const MONTH_IMAGES = [
  '/images/months/month_00_january_1775716058306.png',
  '/images/months/month_01_february_1775715928699.png',
  '/images/months/month_02_march_1775715945165.png',
  '/images/months/month_03_april_1775715961900.png',
  '/images/months/month_04_may_1775716074803.png',
  '/images/months/month_05_june_1775716091506.png',
  '/images/months/month_06_july_1775716107137.png',
  '/images/months/month_07_august_1775716124028.png',
  '/images/months/month_08_september_1775715982315.png',
  '/images/months/month_09_october_1775715999543.png',
  '/images/months/month_10_november_1775716016175.png',
  '/images/months/month_11_december_1775716034178.png',
];

interface WallCalendarProps {
  visibleMonth: Date;
  setVisibleMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export default function WallCalendar({ visibleMonth, setVisibleMonth }: WallCalendarProps) {
  const [theme, setTheme] = useState<Theme>('glacier');
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [rangeNotes, setRangeNotes] = useState<RangeNote[]>([]);
  const [mounted, setMounted] = useState(false);
  const [flipPhase, setFlipPhase] = useState<FlipPhase>('idle');
  const flipPhaseRef = useRef<FlipPhase>('idle');
  const swipeStart = useRef<{ x: number; pointerId: number } | null>(null);
  const flipOutConsumedRef = useRef(false);

  useEffect(() => {
    flipPhaseRef.current = flipPhase;
  }, [flipPhase]);

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

  const festivalsInSelection = useMemo(() => {
    if (!dateRange.start) return [];
    const end = dateRange.end ?? dateRange.start;
    return getFestivalsInRange(dateRange.start, end, 8);
  }, [dateRange.start, dateRange.end]);

  function addMonths(base: Date, delta: number) {
    return new Date(base.getFullYear(), base.getMonth() + delta, 1);
  }

  function requestMonthChange(direction: -1 | 1) {
    if (flipPhaseRef.current !== 'idle') return;
    flipOutConsumedRef.current = false;
    setDateRange({ start: null, end: null });
    setSelectionError(null);
    setFlipPhase(direction === 1 ? 'out-next' : 'out-prev');
  }

  function handleFlipAnimationEnd(event: ReactAnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;

    const name = event.animationName;
    const phase = flipPhaseRef.current;

    if (phase === 'out-next' && name === FLIP_OUT_NEXT) {
      if (flipOutConsumedRef.current) return;
      flipOutConsumedRef.current = true;
      setVisibleMonth((m) => addMonths(m, 1));
      flipPhaseRef.current = 'in-next';
      setFlipPhase('in-next');
      return;
    }

    if (phase === 'out-prev' && name === FLIP_OUT_PREV) {
      if (flipOutConsumedRef.current) return;
      flipOutConsumedRef.current = true;
      setVisibleMonth((m) => addMonths(m, -1));
      flipPhaseRef.current = 'in-prev';
      setFlipPhase('in-prev');
      return;
    }

    if (phase === 'in-next' && name === FLIP_IN_NEXT) {
      flipOutConsumedRef.current = false;
      flipPhaseRef.current = 'idle';
      setFlipPhase('idle');
      return;
    }

    if (phase === 'in-prev' && name === FLIP_IN_PREV) {
      flipOutConsumedRef.current = false;
      flipPhaseRef.current = 'idle';
      setFlipPhase('idle');
    }
  }

  function normalizedRange(start: Date, end: Date): { from: Date; to: Date } {
    const a = start.getTime();
    const b = end.getTime();
    return a <= b ? { from: start, to: end } : { from: end, to: start };
  }

  function saveNoteForSelectedRange() {
    if (!dateRange.start) return;
    const endRangeDate = dateRange.end || dateRange.start;
    const text = notes.trim();
    if (!text) return;
    const { from, to } = normalizedRange(dateRange.start, endRangeDate);
    const entry: RangeNote = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      start: new Date(from.getFullYear(), from.getMonth(), from.getDate()),
      end: new Date(to.getFullYear(), to.getMonth(), to.getDate()),
      text,
      createdAt: new Date(),
    };
    setRangeNotes((prev) => [entry, ...prev]);
    setNotes('');
  }

  function deleteRangeNote(id: string) {
    setRangeNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function handleFlipStagePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (flipPhaseRef.current !== 'idle') return;
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('textarea') || target.closest('button')) return;
    swipeStart.current = { x: event.clientX, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleFlipStagePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* capture may already be released */
    }
    if (flipPhaseRef.current !== 'idle') return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 56) return;
    requestMonthChange(dx < 0 ? 1 : -1);
  }

  function handleFlipStageKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (flipPhaseRef.current !== 'idle') return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      requestMonthChange(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      requestMonthChange(1);
    }
  }

  function handleDayClick(day: CalendarDay) {
    setSelectionError(null);
    if (!dateRange.start && !dateRange.end) {
      setDateRange({ start: day.fullDate, end: null });
      return;
    }
    if (dateRange.start && !dateRange.end) {
      if (day.fullDate.getTime() === dateRange.start.getTime()) {
        setDateRange({ start: null, end: null });
        return;
      }
      if (day.fullDate.getTime() < dateRange.start.getTime()) {
        setSelectionError('End date cannot be before the start date. Please select a valid range.');
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

      <div className="relative w-full" style={{ backgroundColor: 'transparent' }}>
        <SpiralBinding />
      </div>

      <div
        className="relative rounded-2xl overflow-hidden bg-white"
        style={{
          boxShadow:
            '0 4px 6px rgba(0,0,0,0.07), 0 12px 40px rgba(0,0,0,0.18), 0 32px 80px rgba(0,0,0,0.12), 0 2px 0 #d1d5db',
        }}
      >
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

        {/* Turning "page": hero + body flip together when changing month */}
        <div
          className="calendar-flip-stage outline-none"
          tabIndex={0}
          role="region"
          aria-label="Calendar. Swipe horizontally on the photo, tap the left or right side of the month ribbon, or use arrow keys to turn the page to another month."
          onPointerDown={handleFlipStagePointerDown}
          onPointerUp={handleFlipStagePointerUp}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
          onKeyDown={handleFlipStageKeyDown}
        >
          <div
            className={[
              'calendar-flip-inner',
              flipPhase === 'out-next' ? 'calendar-flip-inner--out-next' : '',
              flipPhase === 'in-next' ? 'calendar-flip-inner--in-next' : '',
              flipPhase === 'out-prev' ? 'calendar-flip-inner--out-prev' : '',
              flipPhase === 'in-prev' ? 'calendar-flip-inner--in-prev' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onAnimationEnd={handleFlipAnimationEnd}
            style={{ pointerEvents: flipPhase === 'idle' ? undefined : 'none' }}
          >
            <div className="relative" style={{ marginBottom: '64px' }}>
              <HeroSection
                theme={themeConfig}
                isGlacier={isGlacier}
                monthLabel={monthLabel}
                yearLabel={yearLabel}
                onNavigateMonth={requestMonthChange}
                customHeroImage={MONTH_IMAGES[visibleMonth.getMonth()]}
              />
            </div>

            <div className="px-5 pb-6 pt-2">
              <div className="flex flex-col-reverse md:flex-row gap-5">
                <div
                  className="md:w-5/12 w-full"
                  style={{ minHeight: '224px' }}
                >
                  <NotesSection
                    notes={notes}
                    onChange={setNotes}
                    rangeNotes={rangeNotes}
                    onDeleteRangeNote={deleteRangeNote}
                    canSaveRangeNote={Boolean(dateRange.start)}
                    onSaveRangeNote={saveNoteForSelectedRange}
                    themePrimary={themeConfig.primary}
                    themeMuted={themeConfig.primaryLighter}
                  />
                </div>

                <div
                  className="hidden md:block w-px self-stretch"
                  style={{ background: '#e5e7eb', margin: '0 4px' }}
                />

                <div className="md:w-8/12 w-full">
                  <CalendarGrid
                    visibleMonth={visibleMonth}
                    dateRange={dateRange}
                    onDayClick={handleDayClick}
                    theme={themeConfig}
                  />
                </div>
              </div>

              {selectionError && (
                <div className="mt-4 px-3 py-2 rounded-lg text-red-600 bg-red-50 border border-red-100 flex items-center justify-between">
                  <span style={{ fontSize: '11px', fontWeight: 600 }}>{selectionError}</span>
                  <button
                    type="button"
                    onClick={() => setSelectionError(null)}
                    className="ml-2 text-red-800 hover:text-red-900 focus:outline-none"
                    style={{ fontSize: '11px', fontWeight: 700 }}
                  >
                    ✕
                  </button>
                </div>
              )}

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
                    type="button"
                    onClick={() => { setDateRange({ start: null, end: null }); setSelectionError(null); }}
                    className="transition-opacity hover:opacity-70"
                    style={{ fontSize: '11px', color: themeConfig.primary, fontWeight: 700 }}
                  >
                    Clear
                  </button>
                </div>
              )}

              {festivalsInSelection.length > 0 && (
                <FestivalPanel
                  festivals={festivalsInSelection}
                  primaryColor={themeConfig.primary}
                  borderColor="#e5e7eb"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
