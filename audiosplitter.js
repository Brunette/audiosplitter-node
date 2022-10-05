/* TODOs:
*  1) TEST
        no unit tests of any kind were done. Unfamiliar with any unit test frameworks for node.
    2) Support multi bit Types; 
*
/
var fs = require('fs');
var file_utl = require('./fileutility');
var audioRead = require('./audioBitReader');
//var audioReadCleaner = require('./audioBitReader_cleaner');
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



/* Ideal end of function but can't get it to work, yet */
// const [leftBuffer, rightBuffer] = audioReadCleaner.splitAudioData(byteData,headerSize,bitsPerSample,filePathOut1,filePathOut2);
// fs.writeFileSync(leftBuffer, Buffer.from());
// fs.writeFileSync(rightBuffer, Buffer.from());

