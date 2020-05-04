const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
require('dotenv');
module.exports = {
  dest : path.resolve(__dirname, '..', '..', 'img', 'uploads'),
  storage : multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'img', 'uploads'));
    },
    filename: (req, file, cb) => { 
      crypto.randomBytes(process.env.BYTES_CRYPTO, (err, hash) => {
        if (err) cb(err);

        const filename = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, filename);
      })
     }
  }),
  limits: {
    fileSize : process.env.MAX_SIZE
  },
  fileFilter: (req, file, cb) =>{
    const allowedMimes = [
      process.env.MIMETYPES[0],
      process.env.MIMETYPES[1],
      process.env.MIMETYPES[2],
      process.env.MIMETYPES[3],
      process.env.MIMETYPES[4]
    ];

    if(allowedMimes.includes(file.mimetype)) { 
      cb(null, true);
    } else{
      cb(new Error('Invalid file type.'))
    }
  }
}