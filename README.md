# Wall Calendar

An interactive, visually stunning wall calendar web application built with React, TypeScript, Vite, and TailwindCSS. It brings the aesthetic and feel of a physical wall calendar to your browser.

## Features

- **Interactive Calendar Grid**: A functional, easy-to-read grid where you can view days, navigate through months, and select specific date ranges. The grid includes smart validation with an inline UI error banner that gracefully prevents selecting reversed date ranges.
- **Today Highlighter**: Specifically identifies the current day across the grid with a sleek inset border highlight and bold typography, making it effortless to orient yourself without clashing with the active theme elements.
- **Realistic Page Flipping & Corner Folds**: Experience the feel of a real top-bound wall calendar. Instead of boring slides, the pages execute a rich 3D page curl over the top spiral. Interact via keyboard arrows, or physically 'peel' the month by interacting with the beautifully modeled, curved paper dog-ears situated at the bottom-left and bottom-right corners. Hovering these corners subtly lifts the entire calendar page in full 3D layout!
- **'Go to Today' Shortcut**: Should you ever get lost in future or past months, a sleek, condition-aware 'GO TO TODAY' glassmorphism action button automatically emerges on the polygon banner to instantly snap you back to the present.
- **Visual Holiday Markers & Tooltips**: Instantly identify important days with clean, theme-colored indicator dots directly on the date cells. Hover over any marked date to reveal a stylish, responsive floating tooltip summarizing the significance of the festival or holiday in real-time.
- **Dynamic Month-Specific Artwork**: Swapping months dynamically transitions the calendar's hero banner to distinct, vector art tailored perfectly to Indian festivals and cultural seasons.
- **Immersive Seasonal Environments**: The application's very background acts as a window to the outside, generating pure weather effects synced to the Indian season timeline. Watch as heat waves ripple across summer months, heavy monsoons pour down in July, or thick frosty snowfall accumulates during winter.
- **Themes**: Switch between two meticulously crafted core UI themes (Glacier and Sunset) which modify primary highlights and components dynamically.
- **Premium Aesthetics**: Designed with modern web standards including a complex, dynamically generated SVG twin-loop spiral binding, tasteful drop shadows, drop-down filters, responsive typography, and an elegant, sweeping double-valley curved banner to house layout elements without clipping photography.
- **Notes Section**: A digital ruled paper section to write and save notes specific to the date range you've selected. It natively supports creating targeted notes for just a single day or spanning multiple days. It automatically records timestamps and neatly formats your list of saved notes.
- **Festival Panel**: Automatically calculates and displays upcoming global festivals and holidays falling within your selected date range. Powered by a robust internal data structure supporting both fixed Gregorian dates and moving lunisolar/Islamic/Hebrew calendar events.

## Project Setup

Follow these instructions to get the application running locally:

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (Node Package Manager)

### Installation

1. Navigate to the project directory:
   ```bash
   cd wall_calendar
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

### Available Scripts

In the project directory, you can run:

- **Start Development Server**:
  ```bash
  npm run dev
  ```
  Runs the app in the development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

- **Build for Production**:
  ```bash
  npm run build
  ```
  Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- **Check Types**:
  ```bash
  npm run typecheck
  ```
  Runs the TypeScript compiler to check for any type errors.

- **Lint Code**:
  ```bash
  npm run lint
  ```
  Runs ESLint to statically analyze the code and quickly find problems.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```
  Locally preview the production build generated from `npm run build`.

## Technologies

- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
