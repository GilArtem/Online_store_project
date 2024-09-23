const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class File {
    save(file) {
        if(!file) return null;
        const [, ext] = file.mimetype.split('/')
        const fileName = uuid.v4() + '.' + ext
        const filePath = path.resolve(__dirname, '..', 'static', fileName)
        file.mv(filePath)
        return fileName;
    }
    delete(file) {
        if (file) {
            const filePath = path.resolve(__dirname, '..', 'static', file)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        }
    }
}

module.exports = new File();