const connection = require('../database/connection');


module.exports = {
  
  /** 
   * Create Tech
   */
  async create(request, response) {
    const {title, description} = request.body;
    const project_id = request.headers.authorization;
    const user_id = request.headers.authorization2;
    const [id] = await connection('technologies').insert({
      title,
      description,
      project_id,
      user_id
    });

    return response.json(id);
  },

  /**s
   * List technologies
   */
  async index(request, response) {
    const [count] = await connection('technologies').count();

    const technologies = await connection('technologies')
      .join('projects', 'projects.id', '=', 'technologies.project_id') 
      .select(['technologies.*',
        'projects.name',
      ]);
      
    response.header('X-Total-Count', count['count(*)']);
  
    return response.json(technologies);
  },

  /**
   * Delete technologie
   */
  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const technologie = await connection('technologies')
      .where('id', id)
      .select('user_id')
      .first();

      if (technologie.user_id !== user_id) {
        return response.status(401).json({ error: 'Operation not permitted.' });
      }
      
      await connection('technologies').where('id', id).delete();

    return response.status(204).send();
  },

}
