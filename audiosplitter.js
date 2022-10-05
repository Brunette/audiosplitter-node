// Open file
// read file int buffer
// get Extension tye
// traverse buffer - get data from header if present
// copy bytes from buffer to LEFT and RIGHT buffers depending on size of samples
// write Left buffer to left file, and right to right
// bonus - handle 8, 16, 32 bit?
const HEADER_SIZE = 44;

var fs = require('fs');
var file_utl = require('./fileutility');

const filePath = process.argv[2];

const fileExt = file_utl.getFileExt(filePath);

let filePathOut1 = "left.pcm"
let filePathOut2 = "right.pcm"

const byteData = new Int8Array(fs.readFileSync(filePath))
const bytesLeft = new Int8Array(byteData.length/2)
const bytesRight = new Int8Array(byteData.length/2)

const bytesAudioHeader = new Int8Array(44)

const startingPos = 0;

if (fileExt == "pcm"){
    // assume 16 bit?
}
else if (fileExt == "wav"){
    for (let i = 0; i<HEADER_SIZE; i+=1){
        bytesAudioHeader[i] = byteData[i];
    }
    startingPos = HEADER_SIZE;
}

for (let i = startingPos; i<byteData.length/2; i+=2){
    bytesLeft[i] = byteData[(i*2)];
    bytesRight[i] = byteData[(i*2)+1];
}

fs.writeFileSync(filePathOut1,Buffer.from(bytesLeft));
fs.writeFileSync(filePathOut2,Buffer.from(bytesRight));

// consoleOutput = byteData[0];
// console.log(consoleOutput);

