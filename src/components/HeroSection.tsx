import { ThemeConfig } from '../types/calendar';

interface HeroSectionProps {
  theme: ThemeConfig;
  isGlacier: boolean;
  monthLabel: string;
  yearLabel: string;
  /** Tap left/right of month banner or swipe on hero — triggers page flip in parent */
  onNavigateMonth: (direction: -1 | 1) => void;
}

export default function HeroSection({
  theme,
  isGlacier,
  monthLabel,
  yearLabel,
  onNavigateMonth,
}: HeroSectionProps) {
  return (
    <div
      className="relative w-full overflow-visible select-none"
      style={{ height: '260px', touchAction: 'pan-y' }}
    >
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
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 55% 58%, 50% 100%, 45% 58%, 0% 5%)',
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
            className="absolute right-6 top-2 flex flex-col items-end pointer-events-none z-1"
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
