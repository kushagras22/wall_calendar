# Wall Calendar

An interactive, visually stunning wall calendar web application built with React, TypeScript, Vite, and TailwindCSS. It brings the aesthetic and feel of a physical wall calendar to your browser.

## Features

- **Interactive Calendar Grid**: A functional, easy-to-read grid where you can view days, navigate through months, and select specific date ranges.
- **Realistic Page Flipping**: Experience the feel of a physical calendar with smooth, realistic page-flipping animations when turning to the next or previous month. Navigate by swiping horizontally on the hero photo, using keyboard arrow keys, or clicking the invisible tap zones on the edges of the month banner.
- **Themes**: Switch between two meticulously crafted themes:
  - **Glacier**: Cool blue tones featuring an ice climber hero image.
  - **Sunset**: Warm orange hues featuring a sunset hiker.
- **Premium Aesthetics**: Designed with modern web standards including a complex, dynamically generated SVG twin-loop spiral binding, tasteful drop shadows, drop-down filters, responsive typography, and custom polygon shapes.
- **Notes Section**: A digital ruled paper section to write and save notes specific to the date range you've selected. It automatically records timestamps and displays a list of your saved notes.
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
