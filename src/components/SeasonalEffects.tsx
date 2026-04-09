interface SeasonalEffectsProps {
  currentMonth: number;
}

export default function SeasonalEffects({ currentMonth }: SeasonalEffectsProps) {
  const isWinter = currentMonth === 11 || currentMonth === 0;
  const isSpring = currentMonth === 1 || currentMonth === 2;
  const isSummer = currentMonth >= 3 && currentMonth <= 5;
  const isMonsoon = currentMonth === 6 || currentMonth === 7;
  const isAutumn = currentMonth >= 8 && currentMonth <= 10;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <style>{`
        /* SNOW */
        .snow-flake {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: fall linear infinite;
        }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }

        /* PETALS */
        .petal {
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 15px 0 15px 0;
          opacity: 0.7;
          animation: petalFall linear infinite;
        }
        @keyframes petalFall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0); }
          100% { transform: translateY(110vh) rotate(720deg) translateX(50px); }
        }

        /* SUN RAYS & HEAT */
        .heatwave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background: linear-gradient(to top, rgba(234,88,12,0.1), transparent);
          animation: wave 3s ease-in-out infinite alternate;
        }
        .sun-glare {
          position: absolute;
          top: -10vw;
          right: -10vw;
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, rgba(253,224,71,0.4) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite alternate;
        }
        @keyframes wave {
          0% { transform: translateY(10px) scaleY(1); opacity: 0.5; }
          100% { transform: translateY(-10px) scaleY(1.2); opacity: 0.8; }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        /* RAIN */
        .drop {
          position: absolute;
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8));
          animation: rain 0.8s linear infinite;
        }
        @keyframes rain {
          0% { transform: translateY(-10vh) rotate(10deg); }
          100% { transform: translateY(110vh) rotate(10deg); }
        }

        /* AUTUMN LEAVES */
        .autumn-leaf {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 20px 0 20px 0;
          opacity: 0.8;
          animation: leafFall linear infinite;
        }
        @keyframes leafFall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(-20px); }
          100% { transform: translateY(110vh) rotate(360deg) translateX(50px); }
        }
      `}</style>

      {/* SNOW EFFECTS */}
      {isWinter && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #94a3b8, #cbd5e1)', zIndex: -2 }}>
          {/* Subtle frost / dew effect at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.7), transparent)' }} />
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="snow-flake"
              style={{
                left: Math.random() * 100 + 'vw',
                animationDuration: (Math.random() * 3 + 4) + 's',
                animationDelay: '-' + (Math.random() * 5) + 's',
                width: (Math.random() * 6 + 4) + 'px',
                height: (Math.random() * 6 + 4) + 'px',
                boxShadow: '0 0 6px rgba(255,255,255,0.9)',
              }}
            />
          ))}
        </div>
      )}

      {/* SPRING EFFECTS */}
      {isSpring && (
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: Math.random() * 100 + 'vw',
                animationDuration: (Math.random() * 4 + 5) + 's',
                animationDelay: '-' + (Math.random() * 5) + 's',
                background: ['#ffb7b2', '#ffdac1', '#e2f0cb'][Math.floor(Math.random() * 3)],
              }}
            />
          ))}
        </div>
      )}

      {/* SUMMER EFFECTS */}
      {isSummer && (
        <div className="absolute inset-0 bg-yellow-50 overflow-hidden" style={{ zIndex: -2 }}>
          <div className="sun-glare" />
          <div className="heatwave" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="snow-flake"
              style={{
                background: '#ea580c',
                opacity: 0.2,
                left: Math.random() * 100 + 'vw',
                animationDuration: (Math.random() * 10 + 10) + 's',
                animationDelay: '-' + (Math.random() * 5) + 's',
                width: '6px',
                height: '6px',
              }}
            />
          ))}
        </div>
      )}

      {/* MONSOON EFFECTS */}
      {isMonsoon && (
        <div className="absolute inset-0" style={{ background: 'rgba(51,65,85,0.4)', zIndex: -2 }}>
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="drop"
              style={{
                left: Math.random() * 100 + 'vw',
                animationDuration: (Math.random() * 0.3 + 0.5) + 's',
                animationDelay: '-' + (Math.random() * 2) + 's',
              }}
            />
          ))}
        </div>
      )}

      {/* AUTUMN EFFECTS */}
      {isAutumn && (
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #fff7ed, #ffedd5)', zIndex: -2 }}>
          {/* Subtle autumn sun glow at top right */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle at top right, rgba(253,186,116,0.3) 0%, transparent 60%)' }} />
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="autumn-leaf"
              style={{
                left: Math.random() * 100 + 'vw',
                animationDuration: (Math.random() * 4 + 6) + 's',
                animationDelay: '-' + (Math.random() * 5) + 's',
                background: ['#d97706', '#b45309', '#92400e', '#f59e0b'][Math.floor(Math.random() * 4)],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
