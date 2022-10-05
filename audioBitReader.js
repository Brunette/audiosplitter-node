function read16bitAudio(startingPos, byteData, filePathLeft, filePathRight){
    const bytesLeft = new Int16Array(byteData.length/2)
    const bytesRight = new Int16Array(byteData.length/2)
    let j = 0; 
    for (let i = startingPos; i<byteData.length; i+=4){
        bytesLeft[j] = byteData[i];
        bytesRight[j] = byteData[i+2];    
        bytesLeft[j+1] = byteData[i+1];
        bytesRight[j+1] = byteData[i+3];
        j+=2;
    }
    
    fs.writeFileSync(filePathLeft,Buffer.from(bytesLeft));
    fs.writeFileSync(filePathRight,Buffer.from(bytesRight));
}
