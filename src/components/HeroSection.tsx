import { ThemeConfig } from '../types/calendar';

interface HeroSectionProps {
  theme: ThemeConfig;
  isGlacier: boolean;
  monthLabel: string;
  yearLabel: string;
  /** Tap left/right of month banner or swipe on hero — triggers page flip in parent */
  onNavigateMonth: (direction: -1 | 1) => void;
  customHeroImage: string;
  isCurrentMonth?: boolean;
  onReturnToToday?: () => void;
}

export default function HeroSection({
  theme,
  isGlacier,
  monthLabel,
  yearLabel,
  onNavigateMonth,
  customHeroImage,
  isCurrentMonth,
  onReturnToToday,
}: HeroSectionProps) {
  return (
    <div
      className="relative w-full overflow-visible select-none"
      style={{ height: '260px', touchAction: 'pan-y' }}
    >
      {/* Hero image */}
      <img
        src={customHeroImage}
        alt={`${monthLabel} themed illustration`}
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
          bottom: '-64px',
          height: '88px',
          zIndex: 5,
        }}
      >
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id="heroCurve" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1,0 L 1,0.85 C 0.75,0.85 0.65,0.4 0.5,0.95 C 0.35,0.4 0.25,0.85 0,0.85 Z" />
            </clipPath>
          </defs>
        </svg>
        <div
          className="w-full h-full relative transition-all duration-700"
          style={{
            background: isGlacier
              ? theme.primary
              : `linear-gradient(135deg, ${theme.primary}, ${theme.polygonLabel})`,
            clipPath: 'url(#heroCurve)',
          }}
        >
          {/* Left decorative element (below tap targets) */}
          <div className="absolute left-6 top-2 h-[51px] flex flex-col justify-center pointer-events-none z-1">
            <div
              className="w-8 h-0.5 mb-1.5"
              style={{ background: 'rgba(255,255,255,0.5)' }}
            />
            <div
              className="w-5 h-0.5"
              style={{ background: 'rgba(255,255,255,0.3)' }}
            />
          </div>

          {/* Month / Year text - right side (ensure no clipping) */}
          <div
            className="absolute right-6 top-2 flex flex-col items-end pointer-events-none z-20"
            style={{
              maxWidth: '60%',
              overflow: 'visible',
            }}
          >
            <div className="flex items-center gap-2.5">
              {!isCurrentMonth && onReturnToToday && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReturnToToday();
                  }}
                  className="pointer-events-auto px-3 py-[3px] rounded-full bg-white/25 hover:bg-white/40 transition-colors uppercase font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm backdrop-blur-sm"
                  style={{ fontSize: '8.5px', letterSpacing: '0.12em', transform: 'translateY(1px)' }}
                  title="Return to current month"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  GO TO TODAY
                </button>
              )}
              <span
                className="font-black tracking-widest leading-none text-white pointer-events-none"
                style={{ fontSize: '22px', letterSpacing: '0.18em' }}
              >
                {monthLabel.toUpperCase()}
              </span>
            </div>
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

          {/* Invisible tap zones: flip month like turning a page */}
          <button
            type="button"
            onClick={() => onNavigateMonth(-1)}
            className="absolute inset-y-0 left-0 w-[38%] z-10 cursor-pointer border-0 p-0 bg-transparent"
            style={{ maxWidth: '220px' }}
            aria-label="Previous month"
            title="Previous month (tap here or swipe right on the photo)"
          />
          <button
            type="button"
            onClick={() => onNavigateMonth(1)}
            className="absolute inset-y-0 right-0 w-[38%] z-10 cursor-pointer border-0 p-0 bg-transparent"
            style={{ maxWidth: '220px' }}
            aria-label="Next month"
            title="Next month (tap here or swipe left on the photo)"
          />
        </div>
      </div>
    </div>
  );
}
