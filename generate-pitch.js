const PptxGenJS = require('pptxgenjs');
const path = require('path');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';

// Define stunning MASTER SLIDE
pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  bkgd: 'F4F9F5', // Very light, fresh green-white
  objects: [
    // Top banner (Dark Green)
    { rect: { x: 0, y: 0, w: '100%', h: 1.0, fill: '0B1A11' } },
    // Accent border below banner (Vibrant Green)
    { rect: { x: 0, y: 1.0, w: '100%', h: 0.05, fill: '2EBD59' } },
    // Top-right Logo
    { text: { text: 'BioShield AI', options: { x: 8.5, y: 0.25, w: 2, h: 0.5, color: 'FFFFFF', bold: true, fontSize: 20, align: 'right' } } },
    // Footer line
    { rect: { x: 0, y: 7.2, w: '100%', h: 0.3, fill: '0B1A11' } },
    { text: { text: 'Transforming Agriculture through AI', options: { x: 0.2, y: 7.22, w: 5, h: 0.25, color: '2EBD59', fontSize: 12, bold: true } } }
  ]
});

// SLIDE 1: Eye-Catching Title Slide
const slide1 = pptx.addSlide();
slide1.bkgd = '0B1A11'; // Pure dark theme for the title slide to make it POP
slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 3.8, w: '100%', h: 0.1, fill: '2EBD59' });
slide1.addText('BioShield AI', { x: 0, y: 2.2, w: '100%', h: 1.2, fontSize: 72, bold: true, color: 'FFFFFF', align: 'center', glow: { size: 10, opacity: 0.5, color: '2EBD59' } });
slide1.addText('Accessible Organic Farming Tech', { x: 0, y: 4.2, w: '100%', h: 1, fontSize: 32, color: '2EBD59', align: 'center', italic: true });
slide1.addNotes('Welcome judges. Today we present BioShield AI, a platform bridging the gap between rural farmers and vital agricultural data.');

// SLIDE 2: The Problem
const slide2 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide2.addText('THE PROBLEM', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
// Add a visual sidebar box
slide2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.5, w: 9, h: 5, fill: 'FFFFFF', line: { color: '2EBD59', width: 2 }, shadow: { type: 'outer', color: '000000', blur: 10, opacity: 0.1 } });
slide2.addText([
  { text: 'Massive Crop Loss: ', options: { bold: true, color: '0B1A11' } },
  { text: 'Millions of farmers lose crops to pests annually.\n\n', options: { color: '444444' } },
  { text: 'Tech-Literacy Gap: ', options: { bold: true, color: '0B1A11' } },
  { text: 'Many miss out on crucial government aid.\n\n', options: { color: '444444' } },
  { text: 'Language Barriers: ', options: { bold: true, color: '0B1A11' } },
  { text: 'Severe lack of accessible, regional-language info.', options: { color: '444444' } }
], { x: 1, y: 2, w: 8, h: 4, fontSize: 26, bullet: { code: '25B6', color: '2EBD59' } });
slide2.addNotes('Farmers face massive language and tech barriers. They need research-backed organic solutions and financial aid info, but current websites are too complex.');

// SLIDE 3: Our Solution
const slide3 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide3.addText('OUR SOLUTION', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
slide3.addText('A highly accessible, localized web platform designed for maximum usability.', { x: 0.5, y: 1.5, w: 9, h: 0.8, fontSize: 24, color: '0B1A11', bold: true, fill: 'E2F2E7', align: 'center', shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 5 } });

// Feature boxes
const boxY = 2.8;
slide3.addShape(pptx.ShapeType.rect, { x: 0.5, y: boxY, w: 2.8, h: 3.5, fill: '0B1A11' });
slide3.addText('Organic\nPesticides', { x: 0.5, y: boxY, w: 2.8, h: 3.5, fontSize: 24, color: '2EBD59', bold: true, align: 'center', valign: 'middle' });

slide3.addShape(pptx.ShapeType.rect, { x: 3.6, y: boxY, w: 2.8, h: 3.5, fill: '0B1A11' });
slide3.addText('Fertilizers\n&\nManures', { x: 3.6, y: boxY, w: 2.8, h: 3.5, fontSize: 24, color: '2EBD59', bold: true, align: 'center', valign: 'middle' });

slide3.addShape(pptx.ShapeType.rect, { x: 6.7, y: boxY, w: 2.8, h: 3.5, fill: '0B1A11' });
slide3.addText('Government\nSchemes', { x: 6.7, y: boxY, w: 2.8, h: 3.5, fontSize: 24, color: '2EBD59', bold: true, align: 'center', valign: 'middle' });
slide3.addNotes('Our solution is a simple, icon-driven web app. It instantly translates to native languages and provides actionable organic farming data.');

// SLIDE 4: Core Features
const slide4 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide4.addText('CORE FEATURES', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
slide4.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.5, w: 4.3, h: 4.5, fill: 'FFFFFF', line: { color: '2EBD59', width: 2 } });
slide4.addText('Auto-Updating\nGov Schemes', { x: 0.5, y: 1.8, w: 4.3, h: 1, fontSize: 28, bold: true, color: '0B1A11', align: 'center' });
slide4.addText('Dynamically fetches the latest agricultural welfare programs.', { x: 0.8, y: 3.0, w: 3.7, h: 2, fontSize: 22, color: '444444', align: 'center' });

slide4.addShape(pptx.ShapeType.rect, { x: 5.2, y: 1.5, w: 4.3, h: 4.5, fill: 'FFFFFF', line: { color: '2EBD59', width: 2 } });
slide4.addText('Real-Time\nLocalization', { x: 5.2, y: 1.8, w: 4.3, h: 1, fontSize: 28, bold: true, color: '0B1A11', align: 'center' });
slide4.addText('Allows farmers to read complex data in their native regional language instantly.', { x: 5.5, y: 3.0, w: 3.7, h: 2, fontSize: 22, color: '444444', align: 'center' });
slide4.addNotes('Our app pulls real government schemes and updates them dynamically. Using our translate tool, any farmer can read this in their own language.');

// SLIDE 5: Phase 2 Roadmap
const slide5 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide5.addText('PHASE 2 ROADMAP', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
slide5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.5, w: 9, h: 5, fill: '0B1A11', shadow: { type: 'outer', color: '2EBD59', blur: 5, opacity: 0.5 } });
slide5.addText('Future Integrations & Scaling', { x: 0.5, y: 2, w: 9, h: 1, fontSize: 32, color: '2EBD59', bold: true, align: 'center' });
slide5.addText([
  { text: 'Native Voice Recognition ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'for low-literacy users.\n\n', options: { color: 'DDDDDD' } },
  { text: 'AI Camera Diagnostics ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'for instant disease detection in the field.', options: { color: 'DDDDDD' } }
], { x: 1, y: 3.2, w: 8, h: 3, fontSize: 26, bullet: { code: '2714', color: '2EBD59' } });
slide5.addNotes('For Phase 1 today, we secured the core database and UI. For Phase 2, our architecture is ready to integrate voice commands and image-based crop disease detection.');

// SLIDE 6: Conclusion
const slide6 = pptx.addSlide();
slide6.bkgd = '0B1A11';
slide6.addShape(pptx.ShapeType.rect, { x: 0, y: 2.8, w: '100%', h: 1.9, fill: 'FFFFFF' });
slide6.addText('THANK YOU', { x: 0, y: 3, w: '100%', h: 1, fontSize: 64, bold: true, color: '0B1A11', align: 'center' });
slide6.addText('OPEN FOR Q&A', { x: 0, y: 4, w: '100%', h: 0.5, fontSize: 28, bold: true, color: '2EBD59', align: 'center' });
slide6.addNotes('Thank you for your time. We are now open for any questions.');

// Output to the Desktop folder directly
const outputPath = path.join(__dirname, '..', 'BioShield_Pitch.pptx');

pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`Successfully created stunning presentation: ${fileName}`);
}).catch(err => {
  console.error('Error generating presentation:', err);
});
