const connection = require('../database/connection');

module.exports = {

  async create(req, res){
    let {stars, comment, user_name, user_email} = req.body;
    const project_id = req.headers.project_id;
    const user_id = req.user_id;
    console.log(user_name)
    if (user_name === undefined){
      user_name = "Anônimo"
    }
    const [id] = await connection('rating').insert({
      stars,
      comment,
      user_name,
      user_email,
      project_id,
      user_id
    });

    return res.json({ message : 'Sucesso', id });
  },

  async index(req, res){
    const rating = await connection('rating').select(['*'])
    return res.json(rating);
  },

  async delete(req, res){
    const { id } = req.params;

      await connection('rating').where('id', id).delete();

      return res.json({message : 'Sucesso'});
  }

}