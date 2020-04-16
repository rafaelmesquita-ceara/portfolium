const connection = require('../database/connection');

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

      return response.json(user);
  }
}