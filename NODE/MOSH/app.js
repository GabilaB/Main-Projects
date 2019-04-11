// const os = require("os");

// var TotMemo = os.totalmem();
// var FreeMemo = os.freemem();

// console.log(`Total memory is: ${TotMemo} `);
// console.log(`Free memory is: ${FreeMemo}`);

const fs = require("fs");

const files = fs.readdirSync("./");

console.log(files);
