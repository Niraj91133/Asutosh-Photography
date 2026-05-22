const fs = require('fs');
const path = require('path');

const targetColor = '#c1272d';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace standard tailwind gold classes
    content = content.replace(/text-gold-\d{3}/g, `text-[${targetColor}]`);
    content = content.replace(/bg-gold-\d{3}/g, `bg-[${targetColor}]`);
    content = content.replace(/border-gold-\d{3}/g, `border-[${targetColor}]`);
    content = content.replace(/shadow-gold-\d{3}/g, `shadow-[${targetColor}]`);
    content = content.replace(/via-gold-\d{3}/g, `via-[${targetColor}]`);
    content = content.replace(/ring-gold-\d{3}/g, `ring-[${targetColor}]`);
    content = content.replace(/fill-gold-\d{3}/g, `fill-[${targetColor}]`);
    
    // Some specific cases like hover:bg-gold-600
    content = content.replace(/hover:bg-gold-\d{3}/g, `hover:bg-[#a81f24]`);
    content = content.replace(/hover:text-gold-\d{3}/g, `hover:text-[${targetColor}]`);
    content = content.replace(/hover:border-gold-\d{3}/g, `hover:border-[${targetColor}]`);
    
    // Opacity variants like bg-gold-600/10 -> bg-[#c1272d]/10
    content = content.replace(/text-\[\#c1272d\]\/(\d+)/g, `text-[#c1272d]/$1`);
    content = content.replace(/bg-\[\#c1272d\]\/(\d+)/g, `bg-[#c1272d]/$1`);
    content = content.replace(/border-\[\#c1272d\]\/(\d+)/g, `border-[#c1272d]/$1`);
    content = content.replace(/shadow-\[\#c1272d\]\/(\d+)/g, `shadow-[#c1272d]/$1`);

    // Fix double-bracket issue if regex misses
    content = content.replace(/text-\[#c1272d\]\/50/g, 'text-[#c1272d]/50');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log("Gold replaced with Signature Red (#c1272d) across src/");
