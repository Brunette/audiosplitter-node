const HEADER_SIZE = 44;
const BITS_PER_SAMPLE_OFFSET = 34;
var fs = require('fs');
var file_utl = require('./fileutility');
var audioRead = require('./audioBitReader');

const filePath = process.argv[2];

const fileExt = file_utl.getFileExt(filePath);
const byteData = new Int8Array(fs.readFileSync(filePath))
const bytesAudioHeader = new Int8Array(44)

let filePathOut1 = "left.pcm"
let filePathOut2 = "right.pcm"

let startingPos = 0;
if (fileExt == "pcm") {
    // assume 16 bit?
}
else if (fileExt == "wav") {
    let bytesAudioHeader = new Int8Array(byteData, 0, HEADER_SIZE);
    bitsPerSample = new Int16Array(bytesAudioHeader, BITS_PER_SAMPLE_OFFSET, 2);
    console.log(bitsPerSample[0]);
    startingPos = HEADER_SIZE;
}


switch (bitsPerSample) {
    case 8:
        {
            const byteData8 = new Int8Array(byteData, startingPos, byteData.length)
            audioRead.read8bitAudio(startingPos, byteData8, filePathOut1, filePathOut2);
            break;
        }
    case 16:
        {
            const byteData16 = new Int16Array(byteData, startingPos, (byteData.length - HEADER_SIZE) / 2)
            audioRead.read16bitAudio(startingPos, byteData16, filePathOut1, filePathOut2);
        }
        break;
    case 32:
        {
            const byteData32 = new Int32Array(byteData, startingPos, (byteData.length - HEADER_SIZE) / 4)
            audioRead.read32bitAudio(startingPos, byteData32, filePathOut1, filePathOut2);
        }
        break;
    default:
        {
            const byteData16 = new Int16Array(byteData, startingPos, (byteData.length - HEADER_SIZE) / 2)
            audioRead.read16bitAudio(startingPos, byteData16, filePathOut1, filePathOut2);
        }
    }

// consoleOutput = byteData[0];
// console.log(consoleOutput);

