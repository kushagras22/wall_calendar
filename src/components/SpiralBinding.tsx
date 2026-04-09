interface SpiralBindingProps {
    numCoils?: number;
  }
  
  export default function SpiralBinding({ numCoils = 26 }: SpiralBindingProps) {
    const viewWidth = 1000;
    const paddingX = 18;
    const usableWidth = viewWidth - paddingX * 2;
    const spacing = usableWidth / (numCoils - 1);
  
    return (
      <div className="relative w-full" style={{ height: '46px', zIndex: 20 }}>
        <svg
          width="100%"
          height="46"
          viewBox={`0 0 ${viewWidth} 46`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="metalStroke" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1f1f1" />
              <stop offset="45%" stopColor="#bcbcbc" />
              <stop offset="100%" stopColor="#6f6f6f" />
            </linearGradient>
            <linearGradient id="metalShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
  
          {/* Paper edge shadow */}
          <rect
            x="0"
            y="36"
            width={viewWidth}
            height="10"
            fill="rgba(0,0,0,0.04)"
          />
  
          {Array.from({ length: numCoils }, (_, i) => {
            const cx = paddingX + i * spacing;

            return (
              <g key={i}>
                {/* Coil shadow */}
                <path
                  d={`M ${cx - 9} 10 C ${cx - 4} 2, ${cx + 4} 2, ${cx + 9} 10 C ${cx + 4} 18, ${cx - 4} 18, ${cx - 9} 10 Z`}
                  fill="rgba(0,0,0,0.10)"
                  transform="translate(1.2 1.3)"
                />

                {/* Spiral coil (vertical loop) */}
                <path
                  d={`M ${cx - 9} 10 C ${cx - 4} 2, ${cx + 4} 2, ${cx + 9} 10 C ${cx + 4} 18, ${cx - 4} 18, ${cx - 9} 10 Z`}
                  fill="none"
                  stroke="url(#metalStroke)"
                  strokeWidth="3.6"
                  strokeLinejoin="round"
                />

                {/* Inner shine */}
                <path
                  d={`M ${cx - 5} 10 C ${cx - 2.5} 4.5, ${cx + 2.5} 4.5, ${cx + 5} 10 C ${cx + 2.5} 15.5, ${cx - 2.5} 15.5, ${cx - 5} 10 Z`}
                  fill="none"
                  stroke="url(#metalShine)"
                  strokeWidth="1.6"
                  opacity="0.9"
                />

                {/* Punch point on paper */}
                <ellipse cx={cx} cy="37" rx="3.5" ry="2.5" fill="rgba(0,0,0,0.12)" />
                <ellipse cx={cx} cy="36.6" rx="2.8" ry="2" fill="rgba(20,20,20,0.55)" />
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
  