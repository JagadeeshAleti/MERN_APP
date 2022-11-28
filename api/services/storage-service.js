const { FirebaseService } = require("./firebase")

module.exports.StorageService = {
    uploadFile:(file)=> {
        return FirebaseService.uploadFile(file);
    }
}