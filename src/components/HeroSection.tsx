import { ThemeConfig } from '../types/calendar';

interface HeroSectionProps {
  theme: ThemeConfig;
  isGlacier: boolean;
  monthLabel: string;
  yearLabel: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function HeroSection({
  theme,
  isGlacier,
  monthLabel,
  yearLabel,
  onPrevMonth,
  onNextMonth,
}: HeroSectionProps) {
  return (
    <div className="relative w-full overflow-visible" style={{ height: '260px' }}>
      {/* Hero image */}
      <img
        src={theme.heroImage}
        alt={theme.heroImageAlt}
        className="w-full h-full object-cover transition-all duration-700"
        style={{ display: 'block' }}
      />

      {/* Dark gradient overlay for mood */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: isGlacier
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(120,40,0,0.25) 100%)',
        }}
      />

      {/* Polygon banner at bottom of hero — overlaps into body section */}
      <div
        className="absolute left-0 right-0 flex items-start transition-all duration-700"
        style={{
          bottom: '-28px',
          height: '88px',
          zIndex: 5,
        }}
      >
        <div
          className="w-full h-full relative transition-all duration-700"
          style={{
            background: isGlacier
              ? theme.primary
              : `linear-gradient(135deg, ${theme.primary}, ${theme.polygonLabel})`,
            clipPath: 'polygon(0 0, 100% 0, 100% 58%, 55% 58%, 50% 100%, 45% 58%, 0 58%)',
          }}
        >
          {/* Month / Year text - right side (ensure no clipping) */}
          <div
            className="absolute right-6 top-2 flex flex-col items-end"
            style={{
              maxWidth: '60%',
              overflow: 'visible',
            }}
          >
            <span
              className="font-black tracking-widest leading-none text-white"
              style={{ fontSize: '22px', letterSpacing: '0.18em' }}
            >
              {monthLabel.toUpperCase()}
            </span>
            <span
              className="font-light text-white"
              style={{
                fontSize: '28px',
                letterSpacing: '0.06em',
                opacity: 0.9,
                lineHeight: 1.05,
              }}
            >
              {yearLabel}
            </span>
          </div>

          {/* Month navigation */}
          <div
            className="absolute left-1/2 top-2 -translate-x-1/2 flex items-center gap-2"
            style={{ height: '52px' }}
          >
            <button
              type="button"
              onClick={onPrevMonth}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.45)',
                background: 'rgba(0,0,0,0.18)',
                color: 'white',
                fontSize: '18px',
                lineHeight: '34px',
                fontWeight: 700,
                boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                backdropFilter: 'blur(6px)',
              }}
              aria-label="Previous month"
              title="Previous month"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onNextMonth}
              className="transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.45)',
                background: 'rgba(0,0,0,0.18)',
                color: 'white',
                fontSize: '18px',
                lineHeight: '34px',
                fontWeight: 700,
                boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                backdropFilter: 'blur(6px)',
              }}
              aria-label="Next month"
              title="Next month"
            >
              ›
            </button>
          </div>

          {/* Left decorative element */}
          <div className="absolute left-6 top-2 h-[51px] flex flex-col justify-center">
            <div
              className="w-8 h-0.5 mb-1.5"
              style={{ background: 'rgba(255,255,255,0.5)' }}
            />
            <div
              className="w-5 h-0.5"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
