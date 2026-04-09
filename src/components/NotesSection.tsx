import type { RangeNote } from '../types/calendar';

interface NotesSectionProps {
  notes: string;
  onChange: (value: string) => void;
  rangeNotes: RangeNote[];
  onDeleteRangeNote: (id: string) => void;
  canSaveRangeNote: boolean;
  onSaveRangeNote: () => void;
  themePrimary: string;
  themeMuted: string;
}

const LINE_HEIGHT = 28;
const NUM_LINES = 6;

function formatRange(from: Date, to: Date) {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  if (from.getTime() === to.getTime()) {
    return from.toLocaleDateString('en-US', opts);
  }
  return `${from.toLocaleDateString('en-US', opts)} → ${to.toLocaleDateString('en-US', opts)}`;
}

export default function NotesSection({
  notes,
  onChange,
  rangeNotes,
  onDeleteRangeNote,
  canSaveRangeNote,
  onSaveRangeNote,
  themePrimary,
  themeMuted,
}: NotesSectionProps) {
  return (
    <div className="flex flex-col h-full min-h-0 gap-3">
      <div className="flex items-center gap-2">
        <span
          className="font-bold tracking-widest uppercase shrink-0"
          style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '0.12em' }}
        >
          Notes
        </span>
        <div className="flex-1 h-px" style={{ background: '#e5e7eb' }} />
      </div>

      {canSaveRangeNote && (
        <div className="rounded-lg px-2.5 py-2" style={{ background: themeMuted }}>
          <p style={{ fontSize: '10px', color: themePrimary, fontWeight: 600, marginBottom: 6 }}>
            Add a note for your selected dates, then save. Timestamp is stored automatically.
          </p>
          <button
            type="button"
            onClick={onSaveRangeNote}
            disabled={!notes.trim()}
            className="w-full rounded-md py-1.5 text-white font-bold tracking-wide transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              fontSize: '10px',
              letterSpacing: '0.08em',
              background: themePrimary,
            }}
          >
            Save note
          </button>
        </div>
      )}

      {/* Ruled paper — draft */}
      <div
        className="relative flex-1 shrink-0"
        style={{ minHeight: `${LINE_HEIGHT * NUM_LINES}px` }}
      >
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

        <div
          className="absolute top-0 bottom-0"
          style={{
            left: '28px',
            width: '1px',
            background: '#fca5a5',
            opacity: 0.6,
          }}
        />

        <textarea
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            canSaveRangeNote
              ? 'Write a note for the selected date(s)…'
              : 'Select a date or date range on the calendar, then write a note here…'
          }
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

      {rangeNotes.length > 0 && (
        <div className="flex flex-col gap-2 min-h-0">
          <span
            className="font-bold tracking-widest uppercase"
            style={{ fontSize: '9px', color: '#9ca3af', letterSpacing: '0.1em' }}
          >
            Saved for ranges ({rangeNotes.length})
          </span>
          <ul
            className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-0.5"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {rangeNotes.map((n) => (
              <li
                key={n.id}
                className="rounded-lg border px-2.5 py-2"
                style={{ borderColor: '#e5e7eb', background: '#fafafa' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: themePrimary,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {formatRange(n.start, n.end)}
                    </p>
                    <p style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>
                      Added {n.createdAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#374151',
                        marginTop: 6,
                        fontFamily: 'Georgia, serif',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {n.text}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteRangeNote(n.id)}
                    className="shrink-0 px-2 py-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                    style={{ fontSize: '10px', fontWeight: 700 }}
                    aria-label={`Delete note for ${formatRange(n.start, n.end)}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
