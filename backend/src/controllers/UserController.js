const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
  /**
   *  Create Users
   */
  async create(request, response) {
    const { username, password,  nome, email, git_url} = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('users').insert({
      id,
      username, 
      password, 
      nome, 
      email,
      git_url
    })

    return response.json({ id });
  },

  /**
   *  List Users
   */
  async index (request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('users').count();

    const users = await connection('users')
      .limit(5)
      .offset((page - 1) * 5)  
      .select([
        'users.*',
        'users.nome',
        'users.email'
       ]);

    response.header('X-Total-Count', count['count(*)']);
  
    return response.json(users);
  },

  /**
   *  Update users
   */
  async update (request, response){
    const { username, password,  nome, email, git_url} = request.body;
    const id = request.headers.authorization;

    const [count] = await connection('users').count();

    const users = await connection('users')
      .where('id', '=', id)
      .update({
        id,
        username, 
        password, 
        nome, 
        email,
        git_url
      });

    response.header('X-Total-Count', count['count(*)']);
  
    return response.json(users);
  }
}