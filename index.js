
// Just a placeholder file
// As there are many examples of the web server, I have decided to use more files
// Go through app_01.js, app_02.js, etc for the examples of the web server
// You can run each one with `npm run dev:01`, `npm run dev:02`, etc

const tableOfContents  = [
    { name: 'app_01.js', description: 'Basic web server with Express' },
];

console.log('Greetings presumably human consumer - please select corresponding example - app_01.js, app_02.js, etc');
for (const item of tableOfContents) {
    console.log(` - ${item.name} - ${item.description}`);
}
console.log('You can run each one with `npm run dev:01`, `npm run dev:02`, etc');
