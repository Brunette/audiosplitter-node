var fs = require('fs');

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

function read8bitAudio(startingPos, byteData, filePathLeft, filePathRight){
    const bytesLeft = new Int8Array(byteData.length)
    const bytesRight = new Int8Array(byteData.length)
    let j = 0; 
   
    for (let i = startingPos; i<byteData.length; i+=2){
        bytesLeft[j] = byteData[i];
        bytesRight[j] = byteData[i+2];       
        j+=1;
    }    
    fs.writeFileSync(filePathLeft,Buffer.from(bytesLeft));
    fs.writeFileSync(filePathRight,Buffer.from(bytesRight));
}

function read32bitAudio(startingPos, byteData, filePathLeft, filePathRight){
    const bytesLeft = new Int32Array(byteData.length/2)
    const bytesRight = new Int32Array(byteData.length/2)
    let j = 0; 
   
    for (let i = startingPos; i<byteData.length; i+=8){
        bytesLeft[j] = byteData[i];
        bytesLeft[j+1] = byteData[i+1];
        bytesLeft[j+2] = byteData[i+2];       
        bytesLeft[j+3] = byteData[i+3];
        bytesRight[j] = byteData[i+4];
        bytesRight[j+1] = byteData[i+5];
        bytesRight[j+2] = byteData[i+6];       
        bytesRight[j+3] = byteData[i+7];
        j+=4;
    }
    
    fs.writeFileSync(filePathLeft,Buffer.from(bytesLeft));
    fs.writeFileSync(filePathRight,Buffer.from(bytesRight));
}

module.exports = {read8bitAudio, read16bitAudio, read32bitAudio}