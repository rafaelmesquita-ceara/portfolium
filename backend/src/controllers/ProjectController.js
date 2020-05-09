const connection = require('../database/connection');

module.exports = {
  /**
   * Create Project
   */
  async create(request, response) {
    const {name, description, what_learned, git_url} = request.body;
    const user_id = request.user_id;
    const [id] = await connection('projects').insert({
      name,
      description,
      what_learned,
      git_url,
      user_id,
    });

    return response.json({ id });
  },

  /**s
   * List Projects
   */
  async index(request, response) {

    const [count] = await connection('projects').count();

    var projects = await connection('projects')
      .join('users', 'users.id', '=', 'projects.user_id')
      .select(['projects.*', 'users.nome', 'users.email']);
    
    projects = projects.map( ({ user_id, nome, email, ...demais} ) => {
      projects = demais
      projects.autor = {user_id, nome, email}
      return projects
    })
    for ( i in projects ){
      projects[i].technologies = await connection('technologies')
        .where('project_id', projects[i].id)
        .select('*');
      
      projects[i].midia = await connection('uploads')
        .where('project_id', projects[i].id)
        .select('*')
    }
    


    response.header('X-Total-Count', count['count(*)']);
  
    return response.json(projects);
  },

  /**
   * Update Project
   */
  
  async update (request, response){
    const {name, description, what_learned, git_url} = request.body;
    const user_id = request.user_id;
    const { id } = request.params;


    await connection('projects')
      .where('user_id', '=', user_id)
      .where('id', '=', id)
      .update({
        name,
        description,
        what_learned,
        git_url,
        user_id,
      });
  
    return response.json({"message" : "success"});
  },

  /**
   * Delete Project
   */
  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user_id;

    const project = await connection('projects')
      .where('id', id)
      .select('user_id')
      .first();

      if (project.user_id !== user_id) {
        return response.status(401).json({ error: 'Operation not permitted.' });
      }

      await connection('projects').where('id', id).delete();

    return response.status(204).send();
  },

  /** 
  * Toggle public private
  */
  async togglePublic(request, response) {
    const user_id = request.user_id;
    const  {id}  = request.params;

    project = await connection('projects')
      .where('user_id', '=', user_id)
      .where('id', '=', id)
      .select(['public'])
      .first()
    
    if(project.public === 0){
      await connection('projects')
      .where('user_id', '=', user_id)
      .where('id', '=', id)
      .update({
        public : 1
      });
    }else{
      await connection('projects')
      .where('user_id', '=', user_id)
      .where('id', '=', id)
      .update({
        public : 0
      });
    }
    return response.json({message : 'Sucess'});
  }
}