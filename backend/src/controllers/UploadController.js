const multer = require('multer');
const multerConfig = require('../config/multer')
const connection = require('../database/connection');
var fs = require('fs');

module.exports = {
  async create(req, res){
    
    console.log(req.file.filename);

    const { filename, originalname,  mimetype} = req.file;
    const description = req.body.description;

    console.log(req.body.description);
    const user_id = req.user_id;
    const project_id = req.headers.project_id;

    await connection('uploads').insert({
      filename,
      originalname,
      description,
      mimetype,
      user_id,
      project_id
    })

    return res.json({filename : filename})
  },

  async list(req, res){
    const [count] = await connection('uploads').count();

    const uploads = await connection('uploads').select(['*']);

    res.header('X-Total-Count', count['count(*)']);
    return res.json(uploads);
  },

  async delete(req, res){
    const { id } = req.params;
    const user_id = req.user_id;

    const upload = await connection('uploads')
      .where('id', id)
      .select('filename' ,'user_id')
      .first();

    if (upload.user_id !== user_id) {
      return res.status(401).json({ 'error': 'Operation not permitted.' });
    }
    console.log(upload.filename)
    fs.unlink(`img/uploads/${upload.filename}`, function (err) {
      if (err) throw err;
    }); 
    await connection('uploads').where('id', id).delete();

    return res.status(204).send({message : "Registro deletado com sucesso"});
  }

}