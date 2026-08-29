const fs = require('fs');
let content = fs.readFileSync('src/components/billing/BillingApp.jsx', 'utf8');

// Replace classes
content = content.replace(/bg-black/g, 'bg-zinc-50 dark:bg-black');
content = content.replace(/bg-zinc-800/g, 'bg-white dark:bg-zinc-800');
content = content.replace(/bg-zinc-900/g, 'bg-zinc-100 dark:bg-zinc-900');
content = content.replace(/bg-zinc-950/g, 'bg-zinc-100 dark:bg-zinc-950');
content = content.replace(/text-white/g, 'text-zinc-900 dark:text-white');
content = content.replace(/text-zinc-300/g, 'text-zinc-600 dark:text-zinc-300');
content = content.replace(/text-zinc-400/g, 'text-zinc-500 dark:text-zinc-400');
content = content.replace(/border-white\/10/g, 'border-black\/10 dark:border-white\/10');
content = content.replace(/border-white\/20/g, 'border-black\/20 dark:border-white\/20');
content = content.replace(/border-white\/5/g, 'border-black\/5 dark:border-white\/5');
content = content.replace(/bg-white\/10/g, 'bg-black\/5 dark:bg-white\/10');
content = content.replace(/bg-white\/5/g, 'bg-black\/5 dark:bg-white\/5');

// For specific text gradient
content = content.replace(/from-white to-zinc-500/g, 'from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500');

// Write back
fs.writeFileSync('src/components/billing/BillingApp.jsx', content);
console.log("Transformed");
