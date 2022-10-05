function read16bitAudio(startingPos, byteData){
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
    
    return [bytesLeft,bytesRight];
}

function read8bitAudio(startingPos, byteData){
    const bytesLeft = new Int8Array(byteData.length)
    const bytesRight = new Int8Array(byteData.length)
    let j = 0; 
   
    for (let i = startingPos; i<byteData.length; i+=2){
        bytesLeft[j] = byteData[i];
        bytesRight[j] = byteData[i+2];       
        j+=1;
    }    
    return [bytesLeft,bytesRight];
}

function read32bitAudio(startingPos, byteData){
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
    
    return [bytesLeft,bytesRight];
}



/* TODO: This function does too much.
* Takes in data, calls secondary function AND then writes to files
* improved signature would be something like
* 
    function splitAudioData(byteData, startingPos,bitsPerSample){
        ....
        return [bufferLeft, bufferRight]
    }
*   passing the fileNames is shameful;    
* 
*/
function splitAudioData(byteData, startingPos,bitsPerSample){
switch (bitsPerSample) {
    case 8:
        {
            const byteData8 = new Int8Array(byteData, startingPos, byteData.length)
            return read8bitAudio(startingPos, byteData8);
        }
    case 16:
        {
            const byteData16 = new Int16Array(byteData, startingPos, (byteData.length - startingPos) / 2)
            return read16bitAudio(startingPos, byteData16);
        }
    case 32:
        {
            const byteData32 = new Int32Array(byteData, startingPos, (byteData.length - startingPos) / 4)
            return read32bitAudio(startingPos, byteData32);
        }
    default:
        {
            const byteData16 = new Int16Array(byteData, startingPos, (byteData.length - startingPos) / 2)
            return read16bitAudio(startingPos, byteData16);
        }
    }
}

module.exports = {splitAudioData}