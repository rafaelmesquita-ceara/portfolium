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
        
      projects[i].ratings = await connection('rating')
        .where('project_id', projects[i].id)
        .select(['*'])

      countRating = await connection('rating').where('project_id', projects[i].id).count('comment').count('id')
      var string = JSON.stringify(countRating[0]).split(':')
      var comments = string[1].split(',')
      var ratings = string[2].split('}')

      projects[i].comments = comments[0]
      projects[i].ratings = ratings[0]
      

      var likes = await connection('rating')
        .where('project_id', projects[i].id)
        .select(['rating.stars']);

      var likesMedia = 0.0
      for (k in likes){
        likesMedia += likes[k].stars
      }
      likesMedia = likesMedia / ratings[0]
      likesMedia = parseFloat(likesMedia.toFixed(2))
      console.log(likesMedia)
      projects[i].likesMedia = likesMedia
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

    project.ratings = await connection('rating')
      .where('project_id', project.id)
      .select(['*'])

    countRating = await connection('rating').where('project_id', project.id).count('comment').count('id')
    var string = JSON.stringify(countRating[0]).split(':')
    var comments = string[1].split(',')
    var ratings = string[2].split('}')

    var likes = await connection('rating')
      .where('project_id', project.id)
      .select(['rating.stars']);
    var likesMedia = 0.0
    for (i in likes){
      likesMedia += likes[i].stars
    }
    likesMedia = likesMedia / ratings[0]
    likesMedia = parseFloat(likesMedia.toFixed(2))
    project.likesMedia = likesMedia

    project.comments = comments[0]
    project.ratingsCount = ratings[0]
    return response.json(project)
  }
}