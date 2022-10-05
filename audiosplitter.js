// Open file
// read file int buffer
// get Extension tye
// traverse buffer - get data from header if present
// copy bytes from buffer to LEFT and RIGHT buffers depending on size of samples
// write Left buffer to left file, and right to right
// bonus - handle 8, 16, 32 bit?

var fs = require('fs');

const filePath = process.argv[2];
var consoleOutput;
console.log(fs.readFileSync(filePath));

const byteData = new Int8Array(fs.readFileSync(filePath))

for (let i = 0; i<byteData.length; i+=2){
    
    console.log("Left: ", byteData[i], " Right: ", byteData[i]);
}

// consoleOutput = byteData[0];
// console.log(consoleOutput);