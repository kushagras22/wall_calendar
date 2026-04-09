interface FestivalRow {
  date: Date;
  name: string;
  blurb: string;
}

interface FestivalPanelProps {
  festivals: FestivalRow[];
  primaryColor: string;
  borderColor: string;
}

export default function FestivalPanel({ festivals, primaryColor, borderColor }: FestivalPanelProps) {
  if (festivals.length === 0) return null;

  return (
    <div
      className="mt-3 rounded-lg overflow-hidden border"
      style={{ borderColor, background: 'rgba(249,250,251,0.95)' }}
    >
      <div
        className="px-3 py-2 font-bold tracking-wide uppercase"
        style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: primaryColor,
          background: `${primaryColor}12`,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        Festivals in your selection
        {festivals.length >= 8 ? ' (showing up to 8 in date order)' : ''}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ fontSize: '11px' }}>
          <thead>
            <tr style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <th className="px-3 py-2 font-semibold border-b" style={{ borderColor }}>
                Date
              </th>
              <th className="px-3 py-2 font-semibold border-b" style={{ borderColor }}>
                Festival
              </th>
              <th className="px-3 py-2 font-semibold border-b" style={{ borderColor }}>
                About
              </th>
            </tr>
          </thead>
          <tbody>
            {festivals.map((f, i) => (
              <tr key={`${f.name}-${f.date.getTime()}-${i}`} style={{ borderBottom: `1px solid ${borderColor}` }}>
                <td className="px-3 py-2 whitespace-nowrap align-top font-medium" style={{ color: primaryColor }}>
                  {f.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-3 py-2 align-top font-semibold text-gray-800">{f.name}</td>
                <td className="px-3 py-2 align-top text-gray-600 leading-snug">{f.blurb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
