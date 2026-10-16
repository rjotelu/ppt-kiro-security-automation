/**
 * Export HTML Presentation to PDF
 * 
 * Usage:
 *   node export-pdf.js [input.html] [output.pdf]
 * 
 * Examples:
 *   node export-pdf.js                              # Uses defaults
 *   node export-pdf.js presentation.html            # Custom input
 *   node export-pdf.js presentation.html output.pdf # Custom input & output
 * 
 * Requirements:
 *   npm install puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration - match HTML slide dimensions exactly
const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

const CONFIG = {
    // Default files
    defaultInput: 'presentation.html',
    defaultOutput: 'presentation.pdf',
    
    // Viewport settings - match slide dimensions
    viewport: {
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        deviceScaleFactor: 2  // High quality (2x for retina)
    },
    
    // Wait for external resources
    waitUntil: 'networkidle0',
    timeout: 30000
};

async function exportToPdf(inputFile, outputFile) {
    // Resolve paths
    const htmlPath = path.resolve(inputFile);
    const pdfPath = path.resolve(outputFile);
    
    // Check input file exists
    if (!fs.existsSync(htmlPath)) {
        console.error(`❌ Error: File not found: ${htmlPath}`);
        process.exit(1);
    }
    
    console.log('🚀 Starting PDF export...');
    console.log(`   Input:  ${htmlPath}`);
    console.log(`   Output: ${pdfPath}`);
    console.log(`   Size:   ${SLIDE_WIDTH}x${SLIDE_HEIGHT}px per slide`);
    
    let browser;
    try {
        // Launch browser
        console.log('📦 Launching browser...');
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set viewport to match slide dimensions
        await page.setViewport(CONFIG.viewport);
        
        // Navigate to HTML file
        console.log('📄 Loading presentation...');
        await page.goto(`file://${htmlPath}`, {
            waitUntil: CONFIG.waitUntil,
            timeout: CONFIG.timeout
        });
        
        // Wait for fonts and images to fully load
        await page.evaluate(() => {
            return new Promise((resolve) => {
                // Wait for fonts
                const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
                
                // Wait for images
                const images = Array.from(document.images);
                const imagePromises = images.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((res) => {
                        img.onload = res;
                        img.onerror = res;
                    });
                });
                
                Promise.all([fontPromise, ...imagePromises]).then(() => {
                    setTimeout(resolve, 500); // Extra delay for rendering
                });
            });
        });
        
        // Count slides for progress
        const slideCount = await page.evaluate(() => {
            return document.querySelectorAll('.slide').length;
        });
        console.log(`📊 Found ${slideCount} slides`);
        
        // Inject print-specific CSS for proper page breaks
        console.log('🎨 Preparing slides for PDF...');
        await page.evaluate((width, height) => {
            const style = document.createElement('style');
            style.textContent = `
                @page {
                    size: ${width}px ${height}px;
                    margin: 0;
                }
                
                @media print {
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        width: ${width}px !important;
                        background: #0a0f1e !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    .slide {
                        width: ${width}px !important;
                        height: ${height}px !important;
                        margin: 0 !important;
                        page-break-after: always !important;
                        page-break-inside: avoid !important;
                        break-after: page !important;
                        break-inside: avoid !important;
                        position: relative !important;
                        overflow: hidden !important;
                    }
                    
                    .slide:last-child {
                        page-break-after: avoid !important;
                    }
                    
                    /* Ensure backgrounds print */
                    .slide-bg, .dots-bg, .grid-lines {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    
                    /* Ensure SVGs render properly */
                    svg {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }, SLIDE_WIDTH, SLIDE_HEIGHT);
        
        // Generate PDF with exact slide dimensions
        console.log('🖨️  Generating PDF...');
        await page.pdf({
            path: pdfPath,
            width: `${SLIDE_WIDTH}px`,
            height: `${SLIDE_HEIGHT}px`,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            preferCSSPageSize: true
        });
        
        // Get file size
        const stats = fs.statSync(pdfPath);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        
        console.log('');
        console.log('✅ PDF exported successfully!');
        console.log(`   📁 File: ${pdfPath}`);
        console.log(`   📐 Size: ${fileSizeMB} MB`);
        console.log(`   📊 Slides: ${slideCount} pages (${SLIDE_WIDTH}x${SLIDE_HEIGHT}px each)`);
        
    } catch (error) {
        console.error('❌ Export failed:', error.message);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Parse command line arguments
const args = process.argv.slice(2);
const inputFile = args[0] || CONFIG.defaultInput;
const outputFile = args[1] || CONFIG.defaultOutput;

// Run export
exportToPdf(inputFile, outputFile);
