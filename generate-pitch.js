const PptxGenJS = require('pptxgenjs');

// Create a new Presentation
const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_16x9';

// Define a consistent master slide / layout elements
pptx.defineSlideMaster({
  title: 'MASTER_SLIDE',
  bkgd: 'FFFFFF',
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: '0B1A11' } }, // Dark green top bar
    { text: { text: 'BioShield AI Pitch Deck', options: { x: 0.3, y: 0.15, w: 4, h: 0.5, color: 'FFFFFF', bold: true, fontSize: 18 } } }
  ]
});

// SLIDE 1: Title
const slide1 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide1.addText('BioShield AI', { x: 1, y: 2, w: '80%', h: 1, fontSize: 48, bold: true, color: '0B1A11', align: 'center' });
slide1.addText('Accessible Organic Farming Tech', { x: 1, y: 3, w: '80%', h: 1, fontSize: 24, color: '2EBD59', align: 'center' });
slide1.addNotes('Welcome judges. Today we present BioShield AI, a platform bridging the gap between rural farmers and vital agricultural data.');

// SLIDE 2: The Problem
const slide2 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide2.addText('The Problem (1 Min)', { x: 0.5, y: 1.2, w: '90%', h: 0.8, fontSize: 32, bold: true, color: '0B1A11' });
slide2.addText([
  { text: '• Millions of farmers lose crops to pests annually.\n' },
  { text: '• Many miss out on government aid due to tech-literacy.\n' },
  { text: '• Severe language barriers limit access to vital information.' }
], { x: 0.5, y: 2.2, w: '90%', h: 2.5, fontSize: 22, color: '333333', bullet: true });
slide2.addNotes('Farmers face massive language and tech barriers. They need research-backed organic solutions and financial aid info, but current websites are too complex.');

// SLIDE 3: Our Solution
const slide3 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide3.addText('Our Solution (1 Min)', { x: 0.5, y: 1.2, w: '90%', h: 0.8, fontSize: 32, bold: true, color: '0B1A11' });
slide3.addText('A highly accessible, localized web platform designed for usability.', { x: 0.5, y: 2.2, w: '90%', h: 0.5, fontSize: 20, color: '2EBD59', bold: true });
slide3.addText([
  { text: 'Key Features:\n', options: { bold: true } },
  { text: '• Organic Pesticides Database\n' },
  { text: '• Fertilizers & Manures Guide\n' },
  { text: '• Government Schemes Directory' }
], { x: 0.5, y: 3.0, w: '90%', h: 2, fontSize: 22, color: '333333' });
slide3.addNotes('Our solution is a simple, icon-driven Glassmorphism web app. It instantly translates to native languages and provides actionable organic farming data.');

// SLIDE 4: Core Features
const slide4 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide4.addText('Core Features (1 Min)', { x: 0.5, y: 1.2, w: '90%', h: 0.8, fontSize: 32, bold: true, color: '0B1A11' });
slide4.addText([
  { text: 'Auto-Updating Government Schemes:\n', options: { bold: true, color: '2EBD59' } },
  { text: 'Dynamically fetches the latest agricultural welfare programs.\n\n' },
  { text: 'Real-Time Localization:\n', options: { bold: true, color: '2EBD59' } },
  { text: 'Standard Google Translate integration allows farmers to read complex data in their native regional language instantly.' }
], { x: 0.5, y: 2.2, w: '90%', h: 3, fontSize: 22, color: '333333' });
slide4.addNotes('Our app pulls real government schemes and updates them dynamically. Using our translate tool, any farmer can read this in their own language.');

// SLIDE 5: Phase 2 Roadmap
const slide5 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide5.addText('Phase 2 Roadmap (1 Min)', { x: 0.5, y: 1.2, w: '90%', h: 0.8, fontSize: 32, bold: true, color: '0B1A11' });
slide5.addText('Future Integrations & Scaling', { x: 0.5, y: 2.2, w: '90%', h: 0.5, fontSize: 20, color: '2EBD59', bold: true });
slide5.addText([
  { text: '• Native Voice Recognition for low-literacy users.\n' },
  { text: '• AI Camera Diagnostics (Helpdesk Phase 2) for instant disease detection.' }
], { x: 0.5, y: 2.8, w: '90%', h: 2, fontSize: 22, color: '333333', bullet: true });
slide5.addNotes('For Phase 1 today, we secured the core database and UI. For Phase 2, our architecture is ready to integrate voice commands and image-based crop disease detection.');

// SLIDE 6: Conclusion
const slide6 = pptx.addSlide({ masterName: 'MASTER_SLIDE' });
slide6.addText('Thank You!', { x: 1, y: 2, w: '80%', h: 1, fontSize: 48, bold: true, color: '0B1A11', align: 'center' });
slide6.addText('Open for Q&A', { x: 1, y: 3.2, w: '80%', h: 1, fontSize: 28, color: '2EBD59', align: 'center' });
slide6.addNotes('Thank you for your time. We are now open for any questions.');

// Export Presentation
pptx.writeFile({ fileName: 'BioShield_Pitch.pptx' }).then(fileName => {
  console.log(`Successfully created presentation: ${fileName}`);
}).catch(err => {
  console.error('Error generating presentation:', err);
});
