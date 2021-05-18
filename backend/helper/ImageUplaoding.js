 const multer = require('multer')
// const path = require('path')


// const storage = multer.diskStorage({
//     destination: 'frontend/public',
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb)
//     }
// }).single('photo')

// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png|gif/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)
//     if (mimetype && filetypes)
//         return cb(null, true)
//     else {
//         cb('Images Only !!')
//     }
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'frontend/public');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
        cb(null, true);
    else 
        cb(null, false);
}

 const upload = multer({
     storage: storage,
     limits: { fileSize: 1024 * 1024 * 5},
     fileFilter: fileFilter
 });

module.exports = upload