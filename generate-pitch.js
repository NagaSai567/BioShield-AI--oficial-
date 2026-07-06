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
    // Top-right Logo (Fixed position to not overflow: x=7.8, w=2 to stay within 10in width)
    { text: { text: 'BioShield AI', options: { x: 7.8, y: 0.25, w: 2.0, h: 0.5, color: 'FFFFFF', bold: true, fontSize: 20, align: 'right' } } },
    // Footer line
    { rect: { x: 0, y: 5.3, w: '100%', h: 0.35, fill: '0B1A11' } },
    { text: { text: 'Transforming Agriculture through AI  |  Team BioShield', options: { x: 0.2, y: 5.35, w: 6, h: 0.25, color: '2EBD59', fontSize: 12, bold: true } } }
  ]
});

// SLIDE 1: Eye-Catching Title Slide
const slide1 = pptx.addSlide();
slide1.bkgd = '0B1A11'; // Pure dark theme for the title slide to make it POP
slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 2.7, w: '100%', h: 0.1, fill: '2EBD59' });
slide1.addText('BioShield AI', { x: 0, y: 1.2, w: '100%', h: 1.2, fontSize: 72, bold: true, color: 'FFFFFF', align: 'center', glow: { size: 10, opacity: 0.5, color: '2EBD59' } });
slide1.addText('Empowering Rural Farmers with Accessible Organic Tech', { x: 0, y: 3.1, w: '100%', h: 1, fontSize: 28, color: '2EBD59', align: 'center', italic: true });
slide1.addNotes('Welcome judges. Today we present BioShield AI, a highly accessible platform designed to bridge the massive gap between rural farmers and vital, life-saving agricultural data.');

// SLIDE 2: The Problem
const slide2 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide2.addText('THE PROBLEM', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
slide2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.4, w: 9, h: 3.6, fill: 'FFFFFF', line: { color: '2EBD59', width: 2 }, shadow: { type: 'outer', color: '000000', blur: 10, opacity: 0.1 } });
slide2.addText([
  { text: 'Massive Crop Loss: ', options: { bold: true, color: '0B1A11' } },
  { text: 'Over 40% of potential crop yield is lost to pests and diseases annually due to a lack of immediate, actionable knowledge.\n\n', options: { color: '444444' } },
  { text: 'The Information Void: ', options: { bold: true, color: '0B1A11' } },
  { text: 'Vital data exists, but severe tech-literacy and language barriers prevent rural farmers from accessing government schemes and organic farming research.\n\n', options: { color: '444444' } },
  { text: 'Toxicity Cycle: ', options: { bold: true, color: '0B1A11' } },
  { text: 'Without access to organic alternatives, farmers default to highly toxic chemical pesticides, degrading soil health over time.', options: { color: '444444' } }
], { x: 0.8, y: 1.6, w: 8.4, h: 3.2, fontSize: 20, bullet: { code: '25B6', color: '2EBD59' } });
slide2.addNotes('Farmers face a crisis of information. Millions lose crops to pests or miss out on critical financial aid simply because current agricultural websites are incredibly difficult to navigate and are rarely available in native dialects.');

// SLIDE 3: Our Solution
const slide3 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide3.addText('OUR SOLUTION', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
slide3.addText('A streamlined, icon-driven Glassmorphism web platform delivering immediate agricultural intelligence.', { x: 0.5, y: 1.3, w: 9, h: 0.6, fontSize: 18, color: '0B1A11', bold: true, fill: 'E2F2E7', align: 'center', shadow: { type: 'outer', color: '000000', opacity: 0.1, blur: 5 } });

const boxY = 2.1;
slide3.addShape(pptx.ShapeType.rect, { x: 0.5, y: boxY, w: 2.8, h: 2.8, fill: '0B1A11' });
slide3.addText('Organic\nPesticides', { x: 0.5, y: boxY, w: 2.8, h: 1.2, fontSize: 22, color: '2EBD59', bold: true, align: 'center', valign: 'middle' });
slide3.addText('Detailed, crop-specific natural remedies to safely eliminate pests without degrading soil quality.', { x: 0.7, y: boxY + 1.2, w: 2.4, h: 1.4, fontSize: 14, color: 'FFFFFF', align: 'center' });

slide3.addShape(pptx.ShapeType.rect, { x: 3.6, y: boxY, w: 2.8, h: 2.8, fill: '0B1A11' });
slide3.addText('Fertilizers\n&\nManures', { x: 3.6, y: boxY, w: 2.8, h: 1.2, fontSize: 22, color: '2EBD59', bold: true, align: 'center', valign: 'middle' });
slide3.addText('Tailored manure guides spanning 14 major crops to maximize yield and ensure sustainable farming.', { x: 3.8, y: boxY + 1.2, w: 2.4, h: 1.4, fontSize: 14, color: 'FFFFFF', align: 'center' });

slide3.addShape(pptx.ShapeType.rect, { x: 6.7, y: boxY, w: 2.8, h: 2.8, fill: '0B1A11' });
slide3.addText('Government\nSchemes', { x: 6.7, y: boxY, w: 2.8, h: 1.2, fontSize: 22, color: '2EBD59', bold: true, align: 'center', valign: 'middle' });
slide3.addText('Direct access to 8+ vital financial welfare programs like KCC and PM-KISAN, removing bureaucratic friction.', { x: 6.9, y: boxY + 1.2, w: 2.4, h: 1.4, fontSize: 14, color: 'FFFFFF', align: 'center' });
slide3.addNotes('Our solution solves the complexity problem. It is a highly visual, simple-to-use web app. It immediately connects farmers to organic pesticide methods, specific fertilizer guides for over 14 crops, and directs them to financial aid.');

// SLIDE 4: Core Features
const slide4 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide4.addText('CORE FEATURES', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });

slide4.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.4, w: 4.3, h: 3.6, fill: 'FFFFFF', line: { color: '2EBD59', width: 2 } });
slide4.addText('Dynamic Data', { x: 0.5, y: 1.6, w: 4.3, h: 0.6, fontSize: 26, bold: true, color: '0B1A11', align: 'center' });
slide4.addText('• Fully modular database housing 14 diverse crops.\n• Auto-fetching architecture pulls the latest Government Schemes.\n• Built on Node.js/Express for rapid, lightweight delivery in low-bandwidth rural areas.', { x: 0.8, y: 2.3, w: 3.7, h: 2.2, fontSize: 16, color: '444444', align: 'left', bullet: true });

slide4.addShape(pptx.ShapeType.rect, { x: 5.2, y: 1.4, w: 4.3, h: 3.6, fill: 'FFFFFF', line: { color: '2EBD59', width: 2 } });
slide4.addText('1-Click Localization', { x: 5.2, y: 1.6, w: 4.3, h: 0.6, fontSize: 26, bold: true, color: '0B1A11', align: 'center' });
slide4.addText('• Seamless Google Translate integration built directly into the UI.\n• Instantly converts all complex agricultural jargon into 10+ regional Indian languages (Hindi, Tamil, Telugu, Marathi, etc.) instantly.\n• Breaks the language barrier entirely.', { x: 5.5, y: 2.3, w: 3.7, h: 2.2, fontSize: 16, color: '444444', align: 'left', bullet: true });
slide4.addNotes('The platform is incredibly lightweight for rural internet speeds. Furthermore, our 1-click localization instantly translates complex scientific farming terms into native languages so any farmer can understand the data.');

// SLIDE 5: Phase 2 Roadmap
const slide5 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide5.addText('PHASE 2 ROADMAP', { x: 0.5, y: 0.2, w: '50%', h: 0.6, fontSize: 36, bold: true, color: 'FFFFFF' });
slide5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.4, w: 9, h: 3.6, fill: '0B1A11', shadow: { type: 'outer', color: '2EBD59', blur: 5, opacity: 0.5 } });
slide5.addText('Future Integrations & Scaling', { x: 0.5, y: 1.6, w: 9, h: 0.8, fontSize: 30, color: '2EBD59', bold: true, align: 'center' });
slide5.addText([
  { text: 'Native Voice Recognition: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'We will implement Voice-to-Text allowing illiterate farmers to simply speak their crop issues into the platform to get instant acoustic diagnostics.\n\n', options: { color: 'DDDDDD' } },
  { text: 'AI Camera Diagnostics: ', options: { bold: true, color: 'FFFFFF' } },
  { text: 'Integration of an LLM Vision model. Farmers can snap a photo of a diseased leaf in the field, and the AI will instantly identify the exact pest and recommend the organic cure from our database.', options: { color: 'DDDDDD' } }
], { x: 1, y: 2.6, w: 8, h: 2.2, fontSize: 18, bullet: { code: '2714', color: '2EBD59' } });
slide5.addNotes('For Phase 1 today, we secured the core data and UX. Looking ahead to Phase 2, we will integrate Voice Recognition for illiterate farmers, and an AI Camera tool that diagnoses diseased leaves right in the field using LLM Vision.');

// SLIDE 6: Conclusion
const slide6 = pptx.addSlide();
slide6.bkgd = '0B1A11';
slide6.addShape(pptx.ShapeType.rect, { x: 0, y: 2.1, w: '100%', h: 1.6, fill: 'FFFFFF' });
slide6.addText('THANK YOU', { x: 0, y: 2.3, w: '100%', h: 0.8, fontSize: 64, bold: true, color: '0B1A11', align: 'center' });
slide6.addText('OPEN FOR Q&A', { x: 0, y: 3.2, w: '100%', h: 0.4, fontSize: 24, bold: true, color: '2EBD59', align: 'center' });
slide6.addText('Together, we can build a sustainable, tech-driven future for every farmer.', { x: 0, y: 4.5, w: '100%', h: 0.5, fontSize: 18, color: 'FFFFFF', align: 'center', italic: true });
slide6.addNotes('Thank you for your time. We firmly believe this tool can change lives, and we are now open for any questions.');

// Output to the Desktop folder directly
const outputPath = path.join(__dirname, '..', 'BioShield_Pitch.pptx');

pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`Successfully created stunning presentation: ${fileName}`);
}).catch(err => {
  console.error('Error generating presentation:', err);
});
