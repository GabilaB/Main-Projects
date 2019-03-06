const fs = require("fs");

const path = require("path");

// create folder

// fs.mkdir(path.join(__dirname, "/test"), {}, err => {
//   if (err) throw err;
//   console.log("Folder created ..");
// });

//Create and Write to file

fs.writeFile(path.join(__dirname, "/test", "make2.txt"), "Hello!", err => {
  if (err) throw err;
  console.log("Text written ..");
});
