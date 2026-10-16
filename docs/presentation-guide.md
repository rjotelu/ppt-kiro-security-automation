# Presentation Generation Guide

## Overview

This guide provides instructions for creating professional HTML presentations with consistent styling, flow diagrams, and code blocks.

## Presentation Specifications

### Theme & Styling

- **Background**: Dark gradient (`#0f172a` to `#1e2d4a` to `#0f2744`)
- **Primary Color**: Blue (`#3b82f6`)
- **Secondary Color**: Cyan (`#06b6d4`)
- **Accent Color**: Purple (`#8b5cf6`)
- **Text Color**: `#f8fafc` (white-ish)
- **Font Family**: 'Inter', 'Segoe UI', sans-serif

### Slide Dimensions

- **Width**: 1280px
- **Height**: 720px (16:9 aspect ratio)
- **Padding**: 40-60px on all sides

### Typography

| Element | Size | Weight |
|---------|------|--------|
| Main Title (Cover) | 52px | 800 |
| Slide Title | 32-36px | 700 |
| Section Header | 18-20px | 600 |
| Body Text | 14-16px | 400 |
| Code Block | 10-11px | 400 (monospace) |
| Info Box Labels | 11-13px | 500 |
| Footer | 12-14px | 600 |

### Code Blocks

```css
.code-block {
    background: rgba(15, 23, 42, 0.9);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: 8px;
    padding: 12-15px;
    font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
    font-size: 10-11px;
    line-height: 1.4;
    white-space: pre;
    overflow-x: auto;
    color: #e2e8f0;
}
```

## Flow Diagram Guidelines

### SVG Specifications

- **ViewBox**: Adjust height based on content (typically 280-360px)
- **Arrow Gap**: 50px between elements (NOT 25px)
- **Box Width**: 140-180px for process boxes
- **Box Height**: 40-50px for process boxes
- **Diamond Size**: 50x50px for decision nodes
- **Border Radius**: 8px for rectangles, 25px for rounded boxes

### Arrow Markers

Each SVG must define its own arrow marker in `<defs>`:

```xml
<defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
    </marker>
</defs>
```

### Color Coding

- **Start/End**: Green (`#10b981`)
- **Process**: Blue (`#3b82f6`)
- **Decision**: Orange/Amber (`#f59e0b`)
- **Loop Indicator**: Purple (`#8b5cf6`)
- **Arrows**: Blue (`#3b82f6`)

### Loop Indicators

For circular/loop flows, use a curved path:

```xml
<path d="M x1,y1 C cx1,cy1 cx2,cy2 x2,y2" 
      stroke="#8b5cf6" stroke-width="2" 
      fill="none" marker-end="url(#arrowhead)"/>
```

## Content Boxes

### Best Practices / Benefits Boxes

```css
.info-box {
    background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
    border: 1px solid rgba(59,130,246,0.3);
    border-radius: 12px;
    padding: 15-20px;
}

.info-box h4 {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #3b82f6;
}

.info-box li {
    font-size: 11-12px;
    line-height: 1.5;
    margin-bottom: 6px;
    color: #cbd5e1;
}
```

## Background Layers

Every slide uses layered backgrounds:

```html
<div class="slide-bg"></div>      <!-- Base gradient -->
<div class="dots-bg"></div>       <!-- Dot pattern overlay -->
<div class="grid-lines"></div>    <!-- Grid lines overlay -->
<div class="accent-bar-top"></div>
<div class="accent-bar-bottom"></div>
<div class="deco-circle-1"></div> <!-- Decorative circles -->
<div class="deco-circle-2"></div>
```

## Footer

Every slide includes a footer with:

- Kiro wordmark logo: `https://kiro.dev/images/kiro-wordmark.png`
- Logo height: 24px
- Year: 2026
- Position: Bottom right (`bottom: 20px; right: 40px`)

```html
<div class="slide-footer">
    <div class="kiro-logo-footer">
        <img src="https://kiro.dev/images/kiro-wordmark.png" alt="KIRO" style="height:24px; width:auto;">
    </div>
    <span class="footer-year">2026</span>
</div>
```

## Image Guidelines

### Screenshots

- **Max Width**: 280px per image (side-by-side), or 100% (single)
- **Layout**: Side-by-side with `flex-direction: row`
- **Gap**: 12-15px between images
- **Border**: 1px solid rgba(59,130,246,0.2)
- **Border Radius**: 4-8px
- **Container Background**: rgba(15,23,42,0.8)
- **Container Padding**: 8px

### Cover Slide Icon

- **Kiro Icon**: `https://kiro.dev/icon.svg`
- **Icon Size**: 80px height
- **Container**: Gradient background with glow effect

## Slide Structure Template

```html
<div class="slide slide-N">
    <!-- Background layers -->
    <div class="slide-bg"></div>
    <div class="dots-bg"></div>
    <div class="grid-lines"></div>
    <div class="accent-bar-top"></div>
    <div class="accent-bar-bottom"></div>
    <div class="deco-circle-1"></div>
    <div class="deco-circle-2"></div>
    
    <!-- Content -->
    <div class="slide-content" style="position:relative; z-index:1; height:100%; display:flex; flex-direction:column; padding:40px;">
        <h2 class="slide-title">Title Here</h2>
        
        <!-- Main content area -->
        <div style="display:flex; gap:30px; flex:1;">
            <!-- Left column -->
            <div style="flex:1;">
                <!-- Content -->
            </div>
            <!-- Right column (SVG diagram) -->
            <div style="flex:1;">
                <svg>...</svg>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <div class="slide-footer">
        <div class="kiro-logo-footer">
            <img src="https://kiro.dev/images/kiro-wordmark.png" alt="KIRO" style="height:24px; width:auto;">
        </div>
        <span class="footer-year">2026</span>
    </div>
    
    <!-- Slide number -->
    <div class="slide-number">0N</div>
</div>
```

## PDF Export

Use the included `export-pdf.js` script:

```bash
# Install dependencies (once)
npm install

# Export to PDF
npm run export

# Custom output
node export-pdf.js presentation.html custom-output.pdf
```

### PDF Settings (in export-pdf.js)
- **Dimensions**: 1280x720px per page (matches HTML)
- **Device Scale**: 2x (high quality)
- **Print Background**: true
- **Margin**: 0 (edge-to-edge)

## Checklist Before Finalizing

- [ ] Slide dimensions are 1280x720px
- [ ] All SVGs have their own `<defs>` with arrow markers
- [ ] Arrow gaps are 50px (not 25px)
- [ ] Font sizes for info boxes are 11-13px
- [ ] Footer uses wordmark PNG on all slides
- [ ] Code blocks use `white-space: pre`
- [ ] Screenshots use correct filenames (Pasted1.png, Pasted2.png)
- [ ] Screenshots are side-by-side if multiple
- [ ] No code blocks overlap with images
- [ ] ViewBox height adjusted for arrow lengths
- [ ] All background layers present on each slide

## Usage

1. Copy `TEMPLATE-presentation.html` as starting point
2. Update slide content following this guide
3. Place screenshots in same folder with simple names
4. Run `npm run export` to generate PDF
5. Test both HTML and PDF output
