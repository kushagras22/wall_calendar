export type Theme = 'glacier' | 'sunset';

export interface CalendarDay {
  date: number;
  month: 'prev' | 'current' | 'next';
  fullDate: Date;
  isWeekend: boolean;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface RangeNote {
  id: string;
  start: Date;
  end: Date;
  text: string;
  createdAt: Date;
}

export interface ThemeConfig {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryLighter: string;
  weekendText: string;
  heroImage: string;
  heroImageAlt: string;
  polygonLabel: string;
}
