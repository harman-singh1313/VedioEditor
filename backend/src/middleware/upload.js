const multer= require("multer");
const storage= multer.memoryStorage();  //Uploaded file nu temporary memory vich rakho
const upload= multer({
    storage:storage,
});

module.exports= upload;