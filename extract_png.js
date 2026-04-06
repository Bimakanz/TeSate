const fs = require('fs');
const svg = fs.readFileSync('assets/images/sateh 1.svg', 'utf8');
const match = svg.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
if (match) {
  const base64 = match[1];
  fs.writeFileSync('assets/images/sateh1.png', Buffer.from(base64, 'base64'));
  console.log('PNG extracted successfully! -> assets/images/sateh1.png');
} else {
  console.log('No embedded PNG found in the SVG');
}
