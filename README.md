# Security Compliance Automation using Kiro

## 📋 Presentation Overview

Presentasi ini menjelaskan bagaimana menggunakan KIRO untuk automasi security compliance di AWS.

### Slides

| # | Title | Description |
|---|-------|-------------|
| 1 | Cover | Halaman pembuka |
| 2 | Overview | Daftar fitur yang bisa dilakukan dengan KIRO |
| 3 | Digital Twin | AWS SSO Multi-Account login & audit |
| 4 | Security Hub | CSPM findings collection dengan pagination |
| 5 | AWS WAF | WebACL customization & remediation |
| 6 | Workspace | Setup workspace untuk prompting berulang |
| 7 | Autopilot | Full automation dengan Auto Approve |
| 8 | Closing | Terima kasih |

## 🚀 Cara Menggunakan

### Method 1: Buka di Browser
1. Buka file `presentation.html` di browser (Chrome/Edge recommended)
2. Scroll untuk melihat semua slides

### Method 2: Export ke PDF (Otomatis dengan Script)
```bash
# Install dependencies (sekali saja)
npm install

# Export ke PDF
npm run export

# Atau dengan custom filename
node export-pdf.js presentation.html custom-output.pdf
```

Output: `presentation.pdf` (8 halaman, ~1.1 MB, 1280x720px per slide)

### Method 3: Export ke PDF (Manual Chrome)
1. Buka `presentation.html` di Chrome
2. Tekan `Ctrl + P` (Windows) atau `Cmd + P` (Mac)
3. Pilih **"Save as PDF"** di Destination
4. Set **Layout: Landscape**
5. Set **Paper size: Custom** (1920x1080 pixels)
6. Disable **Headers and footers**
7. Enable **Background graphics**
8. Klik **Save**

### Method 4: Present Mode
Untuk presentasi langsung, buka di fullscreen browser (F11)

## 📂 File Structure

```
ppt-kiro-security-automation/
├── presentation.html           # Presentasi final (1280x720px per slide)
├── presentation.pdf            # PDF export (8 halaman, 1280x720px)
├── TEMPLATE-presentation.html  # Template untuk presentasi baru
├── export-pdf.js               # Script untuk export PDF
├── package.json                # npm configuration
├── README.md                   # File ini
├── Pasted1.png                 # Screenshot 1
├── Pasted2.png                 # Screenshot 2
├── docs/
│   └── presentation-guide.md   # Panduan styling & spesifikasi
└── node_modules/               # Dependencies (puppeteer)
```

## 🔄 Membuat Presentasi Baru

### Quick Start
1. **Copy template**: Salin `TEMPLATE-presentation.html` dengan nama baru
2. **Baca guide**: Buka `docs/presentation-guide.md` untuk referensi styling
3. **Edit konten**: Ganti teks, diagram, dan gambar sesuai topik

### Template Features
- 8 slide dengan struktur standar
- Dark theme dengan gradient background
- SVG flow diagram dengan arrow markers
- Code block styling untuk command/script
- Footer dengan Kiro wordmark
- Responsive layout

### Design Specifications
Semua spesifikasi detail ada di `docs/presentation-guide.md`:

| Element | Spec |
|---------|------|
| Slide Dimensions | 1280x720px (16:9) |
| Arrow Gap | 50px (antar elemen diagram) |
| Info Box Font | 11-13px |
| Code Block Font | 10-11px |
| Screenshot Layout | Side-by-side (row) |
| Footer Logo | kiro.dev/images/kiro-wordmark.png |
| Primary Color | #3b82f6 (Blue) |
| Secondary Color | #06b6d4 (Cyan) |

## 🎨 Customization

### Mengganti Warna
Edit CSS variables di bagian `<style>`:
- Primary: `#3b82f6` (Blue)
- Secondary: `#06b6d4` (Cyan)
- Accent: `#8b5cf6` (Purple)
- Background: `#0f172a` → `#1e2d4a` → `#0f2744` (gradient)

### SVG Diagram Tips
- Setiap SVG harus punya `<defs>` sendiri dengan arrow marker
- Gunakan gap 50px antar elemen (BUKAN 25px)
- Warna: hijau (start/end), biru (process), orange (decision), ungu (loop)
- Arrow fill: `#3b82f6`

### Menambah Screenshot
```html
<div style="display:flex; gap:15px; flex-direction:row;">
    <img src="screenshot1.png" style="max-width:280px; border-radius:8px;">
    <img src="screenshot2.png" style="max-width:280px; border-radius:8px;">
</div>
```

## 📝 Notes

- Semua command di presentasi adalah contoh dan tidak mengandung credential
- Flow diagrams dibuat dalam SVG inline untuk portability
- Design menggunakan dark theme yang konsisten di semua slides
- Template dan guide dibuat untuk reproduksi konsisten
