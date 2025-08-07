# 📚 Course Roadmap Tracker

Simple Electron desktop app for tracking personal course progress.

## Purpose

Track learning courses from various providers with completion status and basic metrics.

## Features

- Add courses via right-click context menu
- Toggle completion status with checkboxes
- Auto-save to JSON file
- Summary dashboard (total courses, completed, cost)
- Keyboard shortcuts (Ctrl+N to add, ESC to close)

## Usage

```bash
npm install
npm start
```

Right-click anywhere to add courses. Click checkboxes to mark complete.

## Files

- `main.js`, `preload.js` - Electron main processes
- `roadmap.js` - App logic and UI
- `courses.json` - Data storage
- `index.html` - Interface
- `style.css` - Dark theme

Data automatically saves on every change.