const connection = require('../database/connection');
require('dotenv/config');
var jwt = require('jsonwebtoken');

module.exports = {
  async create(request, response) {
    const { username, password } = request.body;

    const user = await connection('users')
      .where({
        'username': username,
        'password':  password
      })
      .select('id','nome')
      .first();

      if (!user) {
        return response
        .status(400)
        .json({ error: 'NO USER FOUND.' });
      }

      var token = jwt.sign({ id : user.id }, process.env.SECRET, {
        expiresIn: 7200000 // expires in 2h
      });

      return response.status(200).send({ user_id : user.id, nome : user.nome, auth: true, token: token });
  }
}