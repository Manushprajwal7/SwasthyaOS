# Favicon Update - Stethoscope Icon

## Overview

The SwasthyaOS favicon has been updated from the generic "N" logo to a professional stethoscope icon that better represents the healthcare platform.

## Changes Made

### 1. SVG Icon (`public/icon.svg`)

- Created a medical-grade stethoscope design
- Adaptive color scheme:
  - **Light mode**: Teal background (#0F766E) with white foreground
  - **Dark mode**: Lighter teal background (#14B8A6) with dark foreground (#0F172A)
- Features:
  - Dual earpiece tubes with realistic curves
  - Center connection piece
  - Main tube leading to chest piece
  - Detailed diaphragm with concentric circles
  - Professional medical aesthetic

### 2. Icon Configuration (`app/layout.tsx`)

The layout already includes proper icon configuration:

```typescript
icons: {
  icon: [
    { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
    { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
    { url: "/icon.svg", type: "image/svg+xml" }
  ],
  apple: "/apple-icon.png"
}
```

## PNG Generation Required

The PNG files need to be generated from the SVG. You have two options:

### Option 1: Online Conversion (Recommended)

1. Visit https://cloudconvert.com/svg-to-png or similar service
2. Upload `public/icon.svg`
3. Generate the following sizes:
   - **32x32** for `icon-light-32x32.png` and `icon-dark-32x32.png`
   - **180x180** for `apple-icon.png`
4. Replace the existing PNG files in the `public/` directory

### Option 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# For light mode (32x32)
magick convert -background "#0F766E" -density 300 public/icon.svg -resize 32x32 public/icon-light-32x32.png

# For dark mode (32x32)
magick convert -background "#14B8A6" -density 300 public/icon.svg -resize 32x32 public/icon-dark-32x32.png

# For Apple icon (180x180)
magick convert -background "#0F766E" -density 300 public/icon.svg -resize 180x180 public/apple-icon.png
```

### Option 3: Using Node.js (Automated)

Install sharp package and run:

```bash
npm install sharp
```

Create a script `generate-icons.js`:

```javascript
const sharp = require("sharp");
const fs = require("fs");

const svg = fs.readFileSync("public/icon.svg");

// Light mode 32x32
sharp(svg).resize(32, 32).png().toFile("public/icon-light-32x32.png");

// Dark mode 32x32
sharp(svg).resize(32, 32).png().toFile("public/icon-dark-32x32.png");

// Apple icon 180x180
sharp(svg).resize(180, 180).png().toFile("public/apple-icon.png");
```

Run: `node generate-icons.js`

## Testing

1. **Development Server**: Run `npm run dev` and check the browser tab icon
2. **Production Build**: Run `npm run build` (already verified ✓)
3. **Browser Testing**: Test in Chrome, Firefox, Safari, and Edge
4. **Mobile Testing**: Test on iOS (Apple icon) and Android devices
5. **Theme Testing**: Switch between light and dark modes to verify adaptive colors

## Design Rationale

The stethoscope icon was chosen because:

- **Medical Identity**: Instantly recognizable as a healthcare tool
- **Professional**: Conveys clinical expertise and medical authority
- **Universal**: Understood across all cultures and languages
- **Simple**: Clean design that scales well at small sizes
- **Brand Alignment**: Matches SwasthyaOS's focus on clinical decision support

## Color Scheme

- **Primary Teal (#0F766E)**: Represents trust, healthcare, and professionalism
- **Light Teal (#14B8A6)**: Softer variant for dark mode
- **White/Dark Contrast**: Ensures visibility in all contexts

## Browser Compatibility

The icon configuration supports:

- Modern browsers with SVG support
- Fallback PNG for older browsers
- Adaptive color schemes (prefers-color-scheme)
- Apple devices with dedicated apple-icon.png
- High-DPI displays with proper density

## Next Steps

1. Generate PNG files using one of the methods above
2. Clear browser cache to see the new icon
3. Test across different devices and browsers
4. Consider adding additional sizes (16x16, 48x48) if needed
