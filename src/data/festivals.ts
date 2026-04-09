/**
 * Gregorian + year-mapped festivals (lunisolar / Islamic / lunar dates stored per year).
 * Month is 0–11 (JavaScript Date). Year maps cover 2023–2032; extend as needed.
 */

export interface FestivalEntry {
  id: string;
  month: number;
  day: number;
  name: string;
  blurb: string;
}

export interface YearMappedFestival {
  id: string;
  name: string;
  blurb: string;
  /** Gregorian month (0–11) and day for each supported year */
  byYear: Partial<Record<number, { m: number; d: number }>>;
}

const FIXED_FESTIVALS: FestivalEntry[] = [
  {
    id: 'new-year',
    month: 0,
    day: 1,
    name: "New Year's Day",
    blurb: 'Celebrates the start of the Gregorian calendar year with fireworks and gatherings worldwide.',
  },
  {
    id: 'in-republic',
    month: 0,
    day: 26,
    name: 'Republic Day (India)',
    blurb: 'India marks adoption of its constitution with a grand parade and patriotic ceremonies in New Delhi.',
  },
  {
    id: 'valentines',
    month: 1,
    day: 14,
    name: "Valentine's Day",
    blurb: 'A day associated with love and affection—cards, flowers, and time with partners or friends.',
  },
  {
    id: 'womens-day',
    month: 2,
    day: 8,
    name: "International Women's Day",
    blurb: 'Raises focus on women’s rights, equality, and achievements across the world.',
  },
  {
    id: 'st-patrick',
    month: 2,
    day: 17,
    name: "St. Patrick's Day",
    blurb: 'Honors Ireland’s patron saint; parades and wearing green are popular traditions.',
  },
  {
    id: 'april-fools',
    month: 3,
    day: 1,
    name: "April Fools' Day",
    blurb: 'Light-hearted pranks and jokes are common in many countries for one day only.',
  },
  {
    id: 'earth-day',
    month: 3,
    day: 22,
    name: 'Earth Day',
    blurb: 'Raises awareness for environmental protection and climate action.',
  },
  {
    id: 'anzac',
    month: 3,
    day: 25,
    name: 'ANZAC Day',
    blurb: 'Australia and New Zealand honor military personnel; dawn services recall the Gallipoli campaign.',
  },
  {
    id: 'may-day',
    month: 4,
    day: 1,
    name: 'May Day',
    blurb: 'Spring festival and, in many places, a day celebrating workers’ rights.',
  },
  {
    id: 'cinco',
    month: 4,
    day: 5,
    name: 'Cinco de Mayo',
    blurb: 'Commemorates the 1862 Battle of Puebla; widely marked with Mexican culture and food.',
  },
  {
    id: 'mothers-day-us',
    month: 4,
    day: -1,
    name: "Mother's Day (US)",
    blurb: 'Second Sunday in May: honors mothers and mother figures with thanks and gifts.',
  },
  {
    id: 'memorial',
    month: 4,
    day: -2,
    name: 'Memorial Day (US)',
    blurb: 'Last Monday in May: remembers U.S. military members who died in service.',
  },
  {
    id: 'nowruz',
    month: 2,
    day: 21,
    name: 'Nowruz (Persian New Year)',
    blurb: 'Spring equinox festival celebrated across Iran, Central Asia, and diaspora communities.',
  },
  {
    id: 'fathers-day-us',
    month: 5,
    day: -3,
    name: "Father's Day (US)",
    blurb: 'Third Sunday in June: celebrates fathers and father figures.',
  },
  {
    id: 'juneteenth',
    month: 5,
    day: 19,
    name: 'Juneteenth',
    blurb: 'Marks the end of slavery in the U.S.; commemorates freedom and African American history.',
  },
  {
    id: 'canada-day',
    month: 6,
    day: 1,
    name: 'Canada Day',
    blurb: 'Canadian national day marking Confederation; fireworks and civic celebrations.',
  },
  {
    id: 'independence-us',
    month: 6,
    day: 4,
    name: 'Independence Day (US)',
    blurb: 'U.S. national holiday with fireworks and barbecues marking the 1776 Declaration of Independence.',
  },
  {
    id: 'bastille',
    month: 6,
    day: 14,
    name: 'Bastille Day (France)',
    blurb: 'French national day; military parade on the Champs-Élysées and fireworks.',
  },
  {
    id: 'in-independence',
    month: 7,
    day: 15,
    name: 'Independence Day (India)',
    blurb: 'India’s 1947 independence is marked with flag-hoisting, speeches, and cultural programs.',
  },
  {
    id: 'makar-sankranti',
    month: 0,
    day: 14,
    name: 'Makar Sankranti / Pongal (approx.)',
    blurb: 'Harvest / sun transition festival; kite flying in Gujarat and Pongal celebrations in Tamil Nadu (dates vary by tradition).',
  },
  {
    id: 'orthodox-christmas',
    month: 0,
    day: 7,
    name: 'Orthodox Christmas',
    blurb: 'Christmas on the Julian calendar, observed by many Eastern Orthodox churches.',
  },
  {
    id: 'halloween',
    month: 9,
    day: 31,
    name: 'Halloween',
    blurb: 'Costumes, pumpkins, and trick-or-treat; eve of All Saints’ Day in Christian tradition.',
  },
  {
    id: 'in-gandhi',
    month: 9,
    day: 2,
    name: 'Gandhi Jayanti (India)',
    blurb: 'Birth anniversary of Mahatma Gandhi; day of prayer and reflection on non-violence.',
  },
  {
    id: 'veterans',
    month: 10,
    day: 11,
    name: 'Veterans Day (US)',
    blurb: 'Thanks all who served in the U.S. Armed Forces, especially living veterans.',
  },
  {
    id: 'thanksgiving-us',
    month: 10,
    day: -4,
    name: 'Thanksgiving (US)',
    blurb: 'Fourth Thursday in November: gratitude, family meals, and harvest-season traditions.',
  },
  {
    id: 'christmas',
    month: 11,
    day: 25,
    name: 'Christmas',
    blurb: 'Christian feast of Jesus’ birth; widely celebrated with trees, gifts, and gatherings.',
  },
  {
    id: 'boxing',
    month: 11,
    day: 26,
    name: 'Boxing Day',
    blurb: 'Gift-giving and sports in the U.K., Canada, Australia, and other Commonwealth countries.',
  },
  {
    id: 'ny-eve',
    month: 11,
    day: 31,
    name: "New Year's Eve",
    blurb: 'The last night of the year; countdowns and parties welcome the new year at midnight.',
  },
];

/** Dates that move on Gregorian calendar (Hindu lunisolar, Islamic, Hebrew, Chinese lunar, etc.) */
const YEAR_MAPPED: YearMappedFestival[] = [
  {
    id: 'holi',
    name: 'Holi',
    blurb: 'Hindu festival of colours; celebrates spring, love, and the triumph of good over evil.',
    byYear: {
      2023: { m: 2, d: 8 },
      2024: { m: 2, d: 25 },
      2025: { m: 2, d: 14 },
      2026: { m: 2, d: 3 },
      2027: { m: 2, d: 22 },
      2028: { m: 2, d: 11 },
      2029: { m: 2, d: 28 },
      2030: { m: 2, d: 18 },
      2031: { m: 2, d: 7 },
      2032: { m: 2, d: 25 },
    },
  },
  {
    id: 'eid-fitr',
    name: 'Eid al-Fitr',
    blurb: 'Islamic festival breaking the Ramadan fast; prayers, charity (zakat), and family meals.',
    byYear: {
      2023: { m: 3, d: 22 },
      2024: { m: 3, d: 10 },
      2025: { m: 2, d: 31 },
      2026: { m: 2, d: 20 },
      2027: { m: 2, d: 10 },
      2028: { m: 1, d: 28 },
      2029: { m: 1, d: 17 },
      2030: { m: 1, d: 6 },
      2031: { m: 0, d: 26 },
      2032: { m: 0, d: 15 },
    },
  },
  {
    id: 'eid-adha',
    name: 'Eid al-Adha',
    blurb: 'Feast of Sacrifice; honors Ibrahim’s willingness to sacrifice; includes prayer and qurbani.',
    byYear: {
      2023: { m: 5, d: 29 },
      2024: { m: 5, d: 17 },
      2025: { m: 5, d: 7 },
      2026: { m: 4, d: 27 },
      2027: { m: 4, d: 17 },
      2028: { m: 4, d: 5 },
      2029: { m: 3, d: 24 },
      2030: { m: 3, d: 14 },
      2031: { m: 3, d: 3 },
      2032: { m: 2, d: 22 },
    },
  },
  {
    id: 'rakhi',
    name: 'Raksha Bandhan',
    blurb: 'Sisters tie a rakhi on brothers’ wrists; celebrates sibling bonds and protection.',
    byYear: {
      2023: { m: 7, d: 30 },
      2024: { m: 7, d: 19 },
      2025: { m: 7, d: 9 },
      2026: { m: 7, d: 19 },
      2027: { m: 7, d: 26 },
      2028: { m: 7, d: 15 },
      2029: { m: 8, d: 3 },
      2030: { m: 7, d: 24 },
      2031: { m: 7, d: 13 },
      2032: { m: 7, d: 31 },
    },
  },
  {
    id: 'janmashtami',
    name: 'Janmashtami',
    blurb: 'Birth of Lord Krishna; fasting, midnight prayers, and dahi-handi in many regions.',
    byYear: {
      2023: { m: 8, d: 7 },
      2024: { m: 7, d: 26 },
      2025: { m: 7, d: 16 },
      2026: { m: 7, d: 26 },
      2027: { m: 7, d: 14 },
      2028: { m: 8, d: 2 },
      2029: { m: 7, d: 22 },
      2030: { m: 7, d: 12 },
      2031: { m: 7, d: 31 },
      2032: { m: 7, d: 19 },
    },
  },
  {
    id: 'ganesh',
    name: 'Ganesh Chaturthi',
    blurb: 'Honors Lord Ganesha; clay idols, puja, and immersion processions—especially in Maharashtra.',
    byYear: {
      2023: { m: 8, d: 19 },
      2024: { m: 8, d: 7 },
      2025: { m: 7, d: 27 },
      2026: { m: 8, d: 15 },
      2027: { m: 8, d: 5 },
      2028: { m: 7, d: 25 },
      2029: { m: 8, d: 13 },
      2030: { m: 8, d: 3 },
      2031: { m: 7, d: 23 },
      2032: { m: 8, d: 11 },
    },
  },
  {
    id: 'onam',
    name: 'Onam (Thiruvonam)',
    blurb: 'Kerala’s harvest festival; flower carpets, boat races, and the legend of King Mahabali.',
    byYear: {
      2023: { m: 7, d: 29 },
      2024: { m: 8, d: 15 },
      2025: { m: 8, d: 5 },
      2026: { m: 7, d: 27 },
      2027: { m: 8, d: 8 },
      2028: { m: 7, d: 28 },
      2029: { m: 8, d: 15 },
      2030: { m: 8, d: 5 },
      2031: { m: 7, d: 26 },
      2032: { m: 8, d: 14 },
    },
  },
  {
    id: 'durga-navami',
    name: 'Maha Navami (Durga Puja)',
    blurb: 'Ninth day of Sharad Navratri; peak Durga Puja rituals in West Bengal and beyond.',
    byYear: {
      2023: { m: 9, d: 23 },
      2024: { m: 9, d: 11 },
      2025: { m: 9, d: 1 },
      2026: { m: 9, d: 20 },
      2027: { m: 9, d: 10 },
      2028: { m: 8, d: 29 },
      2029: { m: 9, d: 17 },
      2030: { m: 9, d: 7 },
      2031: { m: 8, d: 26 },
      2032: { m: 9, d: 14 },
    },
  },
  {
    id: 'dussehra',
    name: 'Vijayadashami / Dussehra',
    blurb: 'Victory of good over evil; effigy burnings of Ravana and immersion of Durga idols.',
    byYear: {
      2023: { m: 9, d: 24 },
      2024: { m: 9, d: 12 },
      2025: { m: 9, d: 2 },
      2026: { m: 9, d: 21 },
      2027: { m: 9, d: 11 },
      2028: { m: 9, d: 1 },
      2029: { m: 9, d: 20 },
      2030: { m: 9, d: 9 },
      2031: { m: 8, d: 28 },
      2032: { m: 9, d: 16 },
    },
  },
  {
    id: 'diwali',
    name: 'Diwali',
    blurb: 'Festival of lights; Lakshmi puja, lamps, sweets, and fireworks across India and the diaspora.',
    byYear: {
      2023: { m: 10, d: 12 },
      2024: { m: 10, d: 1 },
      2025: { m: 9, d: 20 },
      2026: { m: 10, d: 8 },
      2027: { m: 9, d: 29 },
      2028: { m: 9, d: 17 },
      2029: { m: 10, d: 5 },
      2030: { m: 9, d: 26 },
      2031: { m: 10, d: 14 },
      2032: { m: 10, d: 2 },
    },
  },
  {
    id: 'guru-nanak',
    name: 'Guru Nanak Jayanti',
    blurb: 'Birth anniversary of Guru Nanak Dev Ji; prayers and processions in gurdwaras worldwide.',
    byYear: {
      2023: { m: 10, d: 27 },
      2024: { m: 10, d: 15 },
      2025: { m: 10, d: 6 },
      2026: { m: 10, d: 26 },
      2027: { m: 10, d: 15 },
      2028: { m: 10, d: 4 },
      2029: { m: 10, d: 23 },
      2030: { m: 10, d: 12 },
      2031: { m: 10, d: 2 },
      2032: { m: 10, d: 20 },
    },
  },
  {
    id: 'chinese-ny',
    name: 'Chinese / Lunar New Year',
    blurb: 'Spring Festival; family reunion, red envelopes, and Lion dances across China and East Asia.',
    byYear: {
      2023: { m: 0, d: 22 },
      2024: { m: 1, d: 10 },
      2025: { m: 0, d: 29 },
      2026: { m: 1, d: 17 },
      2027: { m: 1, d: 6 },
      2028: { m: 0, d: 26 },
      2029: { m: 1, d: 13 },
      2030: { m: 1, d: 3 },
      2031: { m: 0, d: 23 },
      2032: { m: 1, d: 11 },
    },
  },
  {
    id: 'hanukkah',
    name: 'Hanukkah (first night)',
    blurb: 'Jewish Festival of Lights; eight nights commemorating the rededication of the Second Temple.',
    byYear: {
      2023: { m: 11, d: 7 },
      2024: { m: 11, d: 26 },
      2025: { m: 11, d: 15 },
      2026: { m: 11, d: 5 },
      2027: { m: 11, d: 25 },
      2028: { m: 11, d: 13 },
      2029: { m: 11, d: 3 },
      2030: { m: 11, d: 21 },
      2031: { m: 11, d: 10 },
      2032: { m: 11, d: 28 },
    },
  },
  {
    id: 'losar',
    name: 'Losar (Tibetan New Year)',
    blurb: 'Tibetan Buddhist new year; monastery rituals and family gatherings in Tibet and the Himalayas.',
    byYear: {
      2023: { m: 1, d: 21 },
      2024: { m: 1, d: 10 },
      2025: { m: 1, d: 28 },
      2026: { m: 1, d: 17 },
      2027: { m: 2, d: 6 },
      2028: { m: 1, d: 25 },
      2029: { m: 1, d: 14 },
      2030: { m: 1, d: 3 },
      2031: { m: 1, d: 22 },
      2032: { m: 1, d: 11 },
    },
  },
  {
    id: 'carnival-rio',
    name: 'Rio Carnival (approx. start)',
    blurb: 'World-famous Brazilian street festival before Lent; parades and samba schools in Rio.',
    byYear: {
      2023: { m: 1, d: 17 },
      2024: { m: 1, d: 9 },
      2025: { m: 1, d: 28 },
      2026: { m: 1, d: 13 },
      2027: { m: 1, d: 5 },
      2028: { m: 1, d: 25 },
      2029: { m: 1, d: 9 },
      2030: { m: 1, d: 1 },
      2031: { m: 1, d: 21 },
      2032: { m: 0, d: 31 },
    },
  },
];

function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function memorialDay(year: number): Date {
  const may31 = new Date(year, 4, 31);
  const dow = may31.getDay();
  const delta = (dow + 6) % 7;
  return new Date(year, 4, 31 - delta);
}

function nthSundayOfMonth(year: number, month: number, n: number): Date {
  const first = new Date(year, month, 1);
  const dow = first.getDay();
  const firstSunday = 1 + ((7 - dow) % 7);
  return new Date(year, month, firstSunday + 7 * (n - 1));
}

function thanksgivingUs(year: number): Date {
  const nov1 = new Date(year, 10, 1);
  const dow = nov1.getDay();
  const firstThu = 1 + ((4 - dow + 7) % 7);
  return new Date(year, 10, firstThu + 21);
}

function resolveDate(entry: FestivalEntry, year: number): Date | null {
  if (entry.day === -1) return nthSundayOfMonth(year, 4, 2);
  if (entry.day === -2) return memorialDay(year);
  if (entry.day === -3) return nthSundayOfMonth(year, 5, 3);
  if (entry.day === -4) return thanksgivingUs(year);
  return new Date(year, entry.month, entry.day);
}

function allOccurrencesForYear(year: number): { id: string; date: Date; name: string; blurb: string }[] {
  const list = FIXED_FESTIVALS.map((e) => {
    const d = resolveDate(e, year);
    if (!d || Number.isNaN(d.getTime())) return null;
    return { id: `${e.id}-${year}`, date: d, name: e.name, blurb: e.blurb };
  }).filter((x): x is NonNullable<typeof x> => x != null);

  for (const yf of YEAR_MAPPED) {
    const md = yf.byYear[year];
    if (md) {
      const d = new Date(year, md.m, md.d);
      if (!Number.isNaN(d.getTime())) {
        list.push({ id: `${yf.id}-${year}`, date: d, name: yf.name, blurb: yf.blurb });
      }
    }
  }

  const easter = easterSunday(year);
  list.push({
    id: `easter-${year}`,
    date: easter,
    name: 'Easter Sunday',
    blurb: 'Christian celebration of the Resurrection; eggs and spring themes are common.',
  });

  return list;
}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/**
 * Festivals whose calendar day falls inside [from, to] (inclusive), sorted by date.
 * Uses each calendar year that touches the range.
 */
export function getFestivalsInRange(from: Date, to: Date, maxResults = 8): { date: Date; name: string; blurb: string }[] {
  const t0 = Math.min(startOfDay(from), startOfDay(to));
  const t1 = Math.max(startOfDay(from), startOfDay(to));
  const yStart = new Date(t0).getFullYear();
  const yEnd = new Date(t1).getFullYear();
  const merged: { date: Date; name: string; blurb: string }[] = [];

  for (let y = yStart; y <= yEnd; y++) {
    for (const o of allOccurrencesForYear(y)) {
      const td = startOfDay(o.date);
      if (td >= t0 && td <= t1) {
        merged.push({ date: o.date, name: o.name, blurb: o.blurb });
      }
    }
  }

  merged.sort((a, b) => a.date.getTime() - b.date.getTime());

  const seen = new Set<string>();
  const unique: typeof merged = [];
  for (const item of merged) {
    const key = `${item.name}-${startOfDay(item.date)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= maxResults) break;
  }

  return unique;
}
