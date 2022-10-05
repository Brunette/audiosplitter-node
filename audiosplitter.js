var fs = require('fs');
var file_utl = require('./fileutility');
var audioRead = require('./audioBitReader');
var constants = require('./constants');

const filePath = process.argv[2];

const fileExt = file_utl.getFileExt(filePath);
const byteData = new Int8Array(fs.readFileSync(filePath))

let filePathOut1 = "left.pcm"
let filePathOut2 = "right.pcm"

let headerSize = 0;
let bitsPerSample = 16


// From file extension get Header data, if present;
if (fileExt == "pcm") {
    headerSize = 0;
    bitsPerSample = 16;
}
else if (fileExt == "wav") {
    let bytesAudioHeader = new Int8Array(byteData, 0, constants.HEADER_SIZE);

    bitsPerSample = new Int16Array(bytesAudioHeader, constants.BITS_PER_SAMPLE_OFFSET, 2);
    console.log(bitsPerSample[0]);
    headerSize = constants.HEADER_SIZE;
}

audioRead.splitAudioData(byteData,headerSize,bitsPerSample,filePathOut1,filePathOut2);


// consoleOutput = byteData[0];
// console.log(consoleOutput);

