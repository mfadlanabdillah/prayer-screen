# Mosque Prayer Screen

A Vue 3 web application for displaying prayer times in mosques, featuring countdown timers, Islamic calendar, multi-location support, and Adhan notifications with large text optimized for distant viewing.

## Features

- **Prayer Times Display**: Shows all 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)
- **Countdown Timer**: Real-time countdown to the next prayer
- **Islamic Calendar**: Displays current date in Hijri calendar
- **Next Prayer Highlight**: Automatically highlights the upcoming prayer
- **Multiple Mosque Support**: Save and switch between different mosque locations
- **Adhan Notifications**: Browser notifications for prayer time reminders
- **Large Text**: Optimized for distant viewing on display screens
- **Dark Mode**: High contrast design suitable for display screens

## Tech Stack

- Vue 3 (Composition API)
- Tailwind CSS
- Aladhan API for prayer times and Islamic calendar
- Vite for build tooling
- Axios for API calls

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## Usage

- The app defaults to Jakarta, Indonesia
- Click "Change Location" to:
  - Use your current GPS location
  - Search for a city (e.g., "Jakarta, Indonesia")
  - Select from saved locations
- Click "Enable Notifications" to receive prayer time reminders

## Location Storage

Locations are saved in your browser's localStorage, so your preferences persist between sessions.

## API

The app uses the [Aladhan API](https://aladhan.com/prayer-times-api) for:
- Prayer times calculation based on location
- Islamic calendar dates
- Support for multiple calculation methods

## Deployment

This is a static single-page application that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Browser Compatibility

Requires a modern browser with:
- JavaScript ES6+ support
- Geolocation API (for location detection)
- Notifications API (for prayer reminders)
