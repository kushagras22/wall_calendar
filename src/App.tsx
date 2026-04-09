import { useState } from 'react';
import WallCalendar from './components/WallCalendar';
import SeasonalEffects from './components/SeasonalEffects';

export default function App() {
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  return (
    <>
      <SeasonalEffects currentMonth={visibleMonth.getMonth()} />
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative z-10"
        style={{ background: 'transparent' }}
      >
        <WallCalendar visibleMonth={visibleMonth} setVisibleMonth={setVisibleMonth} />
        
        <div className="mt-8 text-center" style={{ color: '#090e15ff', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textShadow: '0 2px 4px rgba(255,255,255,0.5)' }}>
          Made with ♥️ by Kushagra
        </div>
      </div>
    </>
  );
}
