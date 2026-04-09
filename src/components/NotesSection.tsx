interface NotesSectionProps {
    notes: string;
    onChange: (value: string) => void;
  }
  
  const LINE_HEIGHT = 28;
  const NUM_LINES = 8;
  
  export default function NotesSection({ notes, onChange }: NotesSectionProps) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-bold tracking-widest uppercase"
            style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.12em' }}
          >
            Notes
          </span>
          <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
        </div>
  
        {/* Ruled paper container */}
        <div
          className="relative flex-1"
          style={{ minHeight: `${LINE_HEIGHT * NUM_LINES}px` }}
        >
          {/* Ruled lines */}
          {Array.from({ length: NUM_LINES }, (_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${(i + 1) * LINE_HEIGHT - 1}px`,
                height: '1px',
                background: '#e8ecf0',
              }}
            />
          ))}
  
          {/* Red margin line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '28px',
              width: '1px',
              background: '#fca5a5',
              opacity: 0.6,
            }}
          />
  
          {/* Textarea */}
          <textarea
            value={notes}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Add your notes here..."
            className="absolute inset-0 w-full resize-none focus:outline-none bg-transparent"
            style={{
              lineHeight: `${LINE_HEIGHT}px`,
              fontSize: '13px',
              color: '#374151',
              padding: `0 4px 0 36px`,
              fontFamily: 'Georgia, serif',
              height: `${LINE_HEIGHT * NUM_LINES}px`,
            }}
            spellCheck={false}
          />
        </div>
      </div>
    );
  }
  