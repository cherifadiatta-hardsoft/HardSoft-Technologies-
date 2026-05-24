const fs = require('fs');
const path = require('path');

const files = [
  'src/App.tsx',
  ...fs.readdirSync('src/components').map(f => `src/components/${f}`)
];

const replacements = {
  'bg-slate-950': 'bg-white dark:bg-slate-950',
  'bg-slate-900': 'bg-slate-50 dark:bg-slate-900',
  'bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
  'bg-slate-700': 'bg-slate-200 dark:bg-slate-700',
  'text-slate-50': 'text-slate-900 dark:text-slate-50',
  'text-slate-200': 'text-slate-800 dark:text-slate-200',
  'text-slate-300': 'text-slate-700 dark:text-slate-300',
  'text-slate-400': 'text-slate-600 dark:text-slate-400',
  'text-slate-500': 'text-slate-500 dark:text-slate-400',
  'border-slate-800': 'border-slate-200 dark:border-slate-800',
  'border-slate-700': 'border-slate-300 dark:border-slate-700',
  'from-slate-950': 'from-white dark:from-slate-950',
  'from-slate-900': 'from-slate-50 dark:from-slate-900',
  'via-slate-950': 'via-white dark:via-slate-950',
  'via-slate-900': 'via-slate-50 dark:via-slate-900',
  'to-slate-950': 'to-white dark:to-slate-950',
  'to-slate-900': 'to-slate-50 dark:to-slate-900',
  'text-white': 'text-slate-900 dark:text-white',
  'bg-white/5': 'bg-slate-900/5 dark:bg-white/5',
  'bg-white/10': 'bg-slate-900/10 dark:bg-white/10',
  'shadow-slate-900/50': 'shadow-slate-200/50 dark:shadow-slate-900/50',
  'placeholder:text-slate-500': 'placeholder:text-slate-400 dark:placeholder:text-slate-500',
  'divide-slate-800': 'divide-slate-200 dark:divide-slate-800',
};

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  for (const [key, value] of Object.entries(replacements)) {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const valueRegex = new RegExp(escapedValue, 'g');
    if (valueRegex.test(content)) continue;
    
    const keyRegex = new RegExp(`(?<!dark:)\\b${key}\\b`, 'g');
    content = content.replace(keyRegex, value);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
console.log('Script done!');
