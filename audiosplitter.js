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
const bytesLeft = new Int8Array(byteData.length/2)
const bytesRight = new Int8Array(byteData.length/2)
for (let i = 0; i<byteData.length/2; i+=2){
    
    bytesLeft[i] = byteData[i*2];
    bytesRight[i] = byteData[(i+1)*2];
    console.log("Left: ", bytesLeft[i], " Right: ", bytesRight[i]);
}

// consoleOutput = byteData[0];
// console.log(consoleOutput);
