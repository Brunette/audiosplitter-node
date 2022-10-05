function getFileExt(filename){
    return filename.split('.').pop();
}

module.exports = {getFileExt};