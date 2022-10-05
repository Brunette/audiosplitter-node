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

const byteData = new Int16Array(fs.readFileSync(filePath))


//const bytesAudioHeader = new Int8Array(44)

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

function uint16 (n) {
    return n & 0xFFFF;
  }

//   byteData.forEach(sample => { 
//     left = sample & 0x000F;
//     left2 = sample & 0x00F0 >> 8;
//     right = (sample & 0x0F00) >> 16;
//     right2 = (sample & 0xF000) >> 24;
// })

function read16bitAudio(startingPos, byteData, filePathLeft, filePathRight){
    const bytesLeft = new Int16Array(byteData.length/2)
    const bytesRight = new Int16Array(byteData.length/2)
    let j = 0; 
   
    for (let i = startingPos; i<byteData.length; i+=4){
        bytesLeft[j] = byteData[i];
        bytesLeft[j+1] = byteData[i+1];
        bytesRight[j] = byteData[i+2];       
        bytesRight[j+1] = byteData[i+3];
        j+=2;
    }
    
    fs.writeFileSync(filePathLeft,Buffer.from(bytesLeft));
    fs.writeFileSync(filePathRight,Buffer.from(bytesRight));
}

read16bitAudio(startingPos, byteData, filePathOut1, filePathOut2);


// consoleOutput = byteData[0];
// console.log(consoleOutput);

