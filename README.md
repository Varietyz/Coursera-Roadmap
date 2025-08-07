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
Data automatically saves on every change.

## Files
```
├─ 📂 coursera-roadmap-lite
│   ├─ 📜 main.js
│   ├─ 🔧 package.json
│   ├─ 📜 preload.js
│   └─ 📂 src
│       ├─ 📂 controller
│       │   └─ 📜 app.js
│       ├─ 📂 data
│       │   ├─ 🔧 courses.json
│       │   └─ 📜 courseService.js
│       ├─ 🌐 index.html
│       ├─ 📂 style
│       │   └─ 🎨 style.css
│       └─ 📂 ui
│           ├─ 📜 modal.js
│           └─ 📜 render.js
└─ 📘 README.md
```