import { useId } from 'react';


interface SpiralBindingProps {
  numPairs?: number;
}

/**
 * Twin-loop wire coils with clear spacing between each coil and between the two loops.
 * Wrapper is transparent — page background reads as the wall.
 */
export default function SpiralBinding({ numPairs: _numPairs }: SpiralBindingProps) {
  void _numPairs;
  const uid = useId().replace(/:/g, '');
  const filterSoft = `spiralSoft-${uid}`;
  const gradWire = `wireGrad-${uid}`;
  const gradNail = `nailGrad-${uid}`;

  const viewWidth = 1000;
  const viewHeight = 70;
  const centerX = viewWidth / 2;
  const paddingX = 20;

  /* One “coil” = twin ellipses; geometry keeps loops visually separate (not merged). */
  const loopRx = 3.35;
  const loopRy = 10;
  const twinOffset = 4.6;
  const coilUnitHalf = twinOffset + loopRx;
  /** Horizontal breathing room between one coil group and the next */
  const betweenCoils = 20;
  const pitch = 2 * coilUnitHalf + betweenCoils;

  const wireY = 42;
  const pinY = 8;
  const hangerClearR = 30;

  const stations: number[] = [];
  const xMax = viewWidth - paddingX - coilUnitHalf;
  for (let cx = paddingX + coilUnitHalf; cx <= xMax + 0.001; cx += pitch) {
    if (Math.abs(cx - centerX) < hangerClearR) continue;
    stations.push(Math.round(cx * 1000) / 1000);
  }

  const leftOfHanger = stations.filter((s) => s < centerX);
  const rightOfHanger = stations.filter((s) => s > centerX);
  let xLeftAttach =
    leftOfHanger.length > 0 ? leftOfHanger[leftOfHanger.length - 1] + coilUnitHalf - 0.5 : centerX - 44;
  let xRightAttach = rightOfHanger.length > 0 ? rightOfHanger[0] - coilUnitHalf + 0.5 : centerX + 44;

  xLeftAttach = Math.min(xLeftAttach, centerX - 18);
  xRightAttach = Math.max(xRightAttach, centerX + 18);

  return (
    <div
      className="relative w-full pointer-events-none"
      style={{
        backgroundColor: 'transparent',
        zIndex: 20,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <defs>
          <filter id={filterSoft} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.8" floodColor="#000" floodOpacity="0.22" />
          </filter>
          <linearGradient id={gradWire} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="22%" stopColor="#141414" />
            <stop offset="78%" stopColor="#101010" />
            <stop offset="100%" stopColor="#252525" />
          </linearGradient>
          <radialGradient id={gradNail} cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#9a9a9a" />
            <stop offset="100%" stopColor="#404040" />
          </radialGradient>
        </defs>

        <g filter={`url(#${filterSoft})`}>
          {stations.map((c, idx) => (
            <g key={`coil-${idx}-${c}`}>
              <ellipse
                cx={c - twinOffset}
                cy={wireY}
                rx={loopRx}
                ry={loopRy}
                fill="none"
                stroke={`url(#${gradWire})`}
                strokeWidth="2.35"
                strokeLinecap="round"
              />
              <ellipse
                cx={c + twinOffset}
                cy={wireY}
                rx={loopRx}
                ry={loopRy}
                fill="none"
                stroke={`url(#${gradWire})`}
                strokeWidth="2.35"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        <g filter={`url(#${filterSoft})`}>
          <circle cx={centerX} cy={pinY} r={5.5} fill={`url(#${gradNail})`} />
          <circle cx={centerX - 1.1} cy={pinY - 1} r={1.6} fill="rgba(255,255,255,0.38)" />
          <path
            d={`M ${xLeftAttach} ${wireY + 1.5} Q ${centerX - 15} ${wireY - 10} ${centerX} ${pinY + 4} Q ${centerX + 15} ${wireY - 10} ${xRightAttach} ${wireY + 1.5}`}
            fill="none"
            stroke={`url(#${gradWire})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M ${xLeftAttach - 1.5} ${wireY + 4.5} Q ${centerX - 13} ${wireY - 5} ${centerX} ${pinY + 6.5} Q ${centerX + 13} ${wireY - 5} ${xRightAttach + 1.5} ${wireY + 4.5}`}
            fill="none"
            stroke={`url(#${gradWire})`}
            strokeWidth="2.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
}
