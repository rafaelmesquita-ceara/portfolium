const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const user_id = request.user_id;

    
    const [count] = await connection('projects').count();

    var projects = await connection('projects')
      .where('user_id', user_id)
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

  async indexOne(request, response){
    const user_id = request.user_id;
    const  {id}  = request.params;
    console.log(id);

    var project = await connection('projects')
      .where({ 'projects.id': id })
      .where('user_id', user_id)
      .join('users', 'users.id', '=', 'projects.user_id')
      .first()
      .select(['projects.*'])
      
    
    project.technologies = await connection('technologies')
      .where('project_id', project.id)
      .select('*');

    project.midia = await connection('uploads')
      .where('project_id', project.id)
      .select('*')

      return response.json(project)
  }
}