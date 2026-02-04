# XP Card Creator - God the Dog on Abstract

## Project Overview
Custom XP card generator for the God the Dog project on Abstract chain (abs.xyz).
Deployed at: https://godthedog-xp-cards.netlify.app
Netlify site ID: 5c6d905d-ba07-43bf-aaf6-9f8dcbe75cda

## Stack
Pure HTML/CSS/JS (no framework). Three files: `index.html`, `style.css`, `app.js`.

## Key Design Decisions
- **Website UI branding**: Matches godthedog.com (Chewy font, yellow #ffde59 bg, cream #fff7e8 cards with 3px solid #1a1a1a borders, hard drop shadows, slight -0.3deg rotation)
- **Card text font**: Lazy Dog (hand-drawn style matching God the Dog art)
- **Abstract branding on card**: Exact Abstract logo SVG from abs.xyz source code, Roobert font files from portal.abs.xyz
- **God the Dog circular badge**: Top right of card (`assets/god-the-dog.png`)
- **Backgrounds**: 48 images from MemeDepot CDN + custom upload

## Features
- Weekly XP Card tab: name, PFP, XP value, background selection
- Cumulative XP Card tab: line graph (canvas-based), weekly data points input, graph line color picker, start/end week labels
- Color swatches for card text color
- Background overlay (black/white with opacity)
- Background shuffle
- PNG export via html2canvas

## Deploying Updates
```bash
npx netlify-cli deploy --dir=/Users/ely/xp-card-creator --prod --site=5c6d905d-ba07-43bf-aaf6-9f8dcbe75cda
```

## Font Files
- `assets/fonts/Roobert-Regular.ttf` - From Abstract (portal.abs.xyz)
- `assets/fonts/Roobert-Medium.ttf` - From Abstract (portal.abs.xyz)
- `assets/fonts/LazyDog.ttf` - From dafont.com (100% free, by Paul Neave)
- Chewy - Loaded from Google Fonts (website UI only)
