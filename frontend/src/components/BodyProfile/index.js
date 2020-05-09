import React from 'react'
import './style.css'
import { FiStar, FiPlus, FiTrash2, FiEye, FiEyeOff, FiEdit, FiMonitor, FiMessageSquare } from 'react-icons/fi'
import api from '../../services/api'
import { withRouter } from 'react-router-dom';
import {Modal} from 'react-bootstrap';

class BodyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectID : localStorage.getItem('projectID'),
      project : {technologies : [], midia : [], ratings : []},
      editModal : false,
      tech : {title : '', description: ''},
      midiaModal : false,
      file : {file : {}, description: ''},
      showButton : ''
    }

  }

  componentDidMount(prevProps, prevState, snapshot) {
    this.atualizaProject()
  }
  

  atualizaProject = () => {
    api.get(`profile/project/${this.state.projectID}`).then(response => {
      this.setState({project : response.data})
    })
  }

  handleShared = async () => {
    try{
      await api.get(`/projectsToggle/${this.state.projectID}`)
    }catch(err){
      alert('Erro ao tornar público, tente novamente mais tarde');
    }
    this.atualizaProject()
  }

  handleDelete = async () => {
    try{
      await api.delete(`/projects/${this.state.projectID}`)
    }catch(err){
      alert('Erro ao deletar projeto, tente novamente mais tarde');
    }
    this.props.history.push("/admin/profile") 
  }

  handleEditProject = async (e) => {
    //console.log(`%c PROJECTID = ${projetoSelecionado}` , 'background: #222; color: #bada55');
    e.preventDefault()
    try{
      await api.put(`projects/${this.state.projectID}`, this.state.project)
    }catch(err){
      alert('Erro ao cadastrar projeto');
      this.atualizaProjeto();
    }
    this.setState({editModal : false})
  } 

  handleAddMidia = async () => {
    const formData = new FormData();
    formData.append("file", this.state.file.file);
    formData.append("description", this.state.file.description);
    try{
      await api.post(`postImageVideo/`, formData, {
        headers: {
          project_id : this.state.projectID
        }
      })
    }catch(err){
    alert('Erro ao fazer upload');
    }
    this.atualizaProject()
    this.setState({midiaModal : false})
  }

  handleDeleteMidia = async (id) => {
    try{
      await api.delete(`/postImageVideo/${id}`)
    }catch(err){
      alert('Erro ao deletar midia, tente novamente mais tarde');
    }
    this.atualizaProject()
  }

  handleAddTech = async () => {
    try{
      console.log(this.state.tech)
      await api.post('tech', this.state.tech, {
        headers: {
          project_id : this.state.projectID,
        }
      })
    }catch(err){
      alert('Erro ao cadastrar projeto');
    }
    this.atualizaProject()
    this.setState({addTechModal : false})
  }

  handleDeleteTech = async (id) => {
    try{
      await api.delete(`/tech/${id}`)
    }catch(err){
      alert('Erro ao deletar tecnologia, tente novamente mais tarde');
    }
    this.atualizaProject()
  }

  handleToggleView = () =>{
    if(this.state.showButton === ''){
      this.setState({showButton : 'unShow'})
    }else{
      this.setState({showButton : ''})
    }
  }

  

  render() {
    function Midia(props) {
      if(props.mimetype[0] === "i"){
        return (
          <div>
          <a href = {`${process.env.REACT_APP_STATIC_URL}/${props.filename}`}>
            <img src={`${process.env.REACT_APP_STATIC_URL}/${props.filename}`} title={`${props.description}`} />
          </a>
          </div>
        )
      }else{
        return (
          <a href = {`${process.env.REACT_APP_STATIC_URL}/${props.filename}`}>
            <video src={`${process.env.REACT_APP_STATIC_URL}/${props.filename}`} title={`${props.description}`} />
          </a>
        )
      }
    };

    function Share(props) {
      if(props.shared === 1){
        return (
          <button className="icon" style={{marginLeft: 15}} onClick={props.handler} type="button" >
            <FiEye size={24} color= "#04D361"  title="Tornar projeto privado" />
          </button>
        )
      }else{
        return (
          <button className="icon" type="button" style={{marginLeft: 15}} onClick={props.handler}>
            <FiEyeOff size={24} color= "#04D361" title="Tornar projeto público" />
          </button>
        )
      }
    }


    return (
      <div>
      <div className="projectBody">
       
       <div className="projectBodyHeader">
        <h2>Dados</h2>
        
        <span>
          <button type="button" className="icon" onClick={() => this.handleToggleView()} style={{marginRight : 15}}>
            <FiMonitor className="spanButton" size="24px" color= "#04D361" ></FiMonitor>
          </button>
          {this.state.project.likesMedia}
          <FiStar className="spanButton" size="24px" style={{marginLeft : 5}}></FiStar>
          <FiStar className="spanButton" size="24px"></FiStar>
          <FiStar className="spanButton" size="24px"></FiStar>
          <FiStar className="spanButton" size="24px"></FiStar>
          <FiStar className="spanButton" size="24px"></FiStar>
          
          
          <Share shared={this.state.project.public} handler={this.handleShared}></Share>
          <button className="icon" type="button" style={{marginLeft: 15}} onClick={() => this.setState({editModal : true})}>
            <FiEdit className="spanButton" size={24} color= "#04D361" ></FiEdit>
          </button>
          <button className="icon" type="button" style={{marginLeft: 15}} onClick={() => {
            this.handleDelete();
          }}>
            <FiTrash2 className="spanButton" size={24} color= "#04D361" ></FiTrash2>
          </button>
        </span>
       </div>
       <ul className={this.state.showButton}>
         <li>
          <strong>Projeto</strong>
          <p>{this.state.project.name}</p>
         </li>
         <li>
          <strong>Descrição</strong>
          <p>{this.state.project.description}</p>
         </li>
         <li>
          <strong>O que aprendi</strong>
          <p>{this.state.project.what_learned}</p>
         </li>
         <li>
          <strong>URL do Git</strong>
          <p>{this.state.project.git_url}</p>
         </li>
         <li>
          <strong>Data de criação</strong>
          <p>{this.state.project.submmit_date}</p>
         </li>
         <li>
           <strong>Tecnologias utilizadas</strong>
           <ul className="ulTech">
            {this.state.project.technologies.map(tech => (
              
                
              <li key={tech.id}>
                <button title="Deletar mídia" className="botaoDelete" onClick={() => this.handleDeleteTech(tech.id)}  type="button">
                  <FiTrash2 size={20} color= "#04D361"/>
                </button>
                <div className="center">
                <p>{tech.title}</p>
                </div>
              </li>
              
              
            ))}
            <li>
              <div className="ulButton">
              <button  onClick={() => this.setState({addTechModal : true})}><FiPlus color="#04D361" size="50px"></FiPlus></button>
              </div>
            </li>
           </ul>
           
         </li>
         <li>
         <strong>Midia do projeto</strong>
         <ul className="ulMidia">
          {this.state.project.midia.map( midia => (
            <li key={midia.id}>
              <button title="Deletar mídia" className="botaoDelete2" onClick={() => this.handleDeleteMidia(midia.id)}  type="button">
                <FiTrash2 size={20} color= "#04D361"/>
              </button>
              <Midia mimetype={midia.mimetype} filename={midia.filename} description={midia.description}></Midia>

            </li>
          ))}
          <li>
            <div className="ulButton">
              <button onClick={() => this.setState({midiaModal : true})}><FiPlus color="#04D361" size="50px"></FiPlus></button>
            </div>
          </li>
          </ul>
         </li>
       </ul>

       <div>
         <Modal EditarProjeto
            className="my-modal"
            size="md"
            show={this.state.editModal}
            scrollable = "true"
            onHide={() => {
              this.setState({editModal : false})
              this.atualizaProject()
            }}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Editar projeto
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <form>
              <input type="text" placeholder = "Título do projeto*"
                value={this.state.project.name}
                onChange={ (e) =>{
                  this.setState({
                    project: {
                      ...this.state.project,
                      name : e.target.value,
                    }
                  })}} />

                <textarea placeholder = "Descrição*"
                value={this.state.project.description}
                style = {{marginTop : "16px"}} 
                onChange={ (e) =>{
                  this.setState({
                    project: {
                      ...this.state.project,
                      description : e.target.value,
                    }
                  })}}/>

                <textarea placeholder = "O que aprendeu*"
                value={this.state.project.what_learned}
                style = {{marginTop : "16px"}}  
                onChange={ (e) =>{
                  this.setState({
                    project: {
                      ...this.state.project,
                      what_learned : e.target.value,
                    }
                  })}}/>  

                <input type="text" placeholder = "Url do git"
                value={this.state.project.git_url} 
                onChange={ (e) =>{
                  this.setState({
                    project: {
                      ...this.state.project,
                      git_url : e.target.value,
                    }
                  })}}/>  
              </form>

            </Modal.Body>
            <Modal.Footer>
              <button className = "button" type = "button" onClick={(e) => this.handleEditProject(e)}>Atualizar</button>
            </Modal.Footer>
          </Modal>
       
         <Modal AdicionarTecnologia
          className="my-modal"
          size="md"
          show={this.state.addTechModal}
          onEnter={() => {
            this.setState({
              tech : {
                title : '',
                description : ''
              }
            })
          }}
          onHide={() => this.setState({addTechModal : false})}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>

            <Modal.Title id="example-modal-sizes-title-sm">
              Adicionar tecnologia ao projeto
            </Modal.Title>

          </Modal.Header>

          <Modal.Body>
          <form>
            <input type="text" placeholder = "Nome da tecnologia*"
            value={this.state.tech.title}
            onChange={e => this.setState({
              tech : {
                ...this.state.tech,
                title : e.target.value
              }
            })}
            style = {{marginBottom : "16px"}} />

            <textarea placeholder = "Descrição*"
            value={this.state.tech.description}
            onChange={e => this.setState({
              tech : {
                ...this.state.tech,
                description : e.target.value
              }
            })}  />

            <button className = "button" type = "button" onClick={() => this.handleAddTech() }>Adicionar</button>
          </form>
          </Modal.Body>
        </Modal>
        
         <Modal
            className="my-modal"
            size="md"
            show={this.state.midiaModal}
            scrollable = "true"
            onEnter={() => {
              this.setState({
                file : {
                  file : {},
                  description : ''
                }
              })
            }}
            onHide={() => this.setState({midiaModal : false})}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>

              <Modal.Title id="example-modal-sizes-title-sm">
                Adicionar mídia
              </Modal.Title>

            </Modal.Header>

            <Modal.Body>
            <form>
            <input type="file" placeholder = "Título do projeto*" onChange={e => this.setState({
            file : {
              ...this.state.file,
              file: (e.target.files[0])
            }})
            } />

              <textarea placeholder = "Descrição*"
              value={this.state.file.description}
              onChange={e => this.setState({
                file : {
                  ...this.state.file,
                  description : e.target.value
                }})}
              style = {{marginTop : "16px"}}  />
              <button className = "button" type = "button" onClick={() => this.handleAddMidia()}>Fazer upload</button>
            </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      
      <div className="projectBody">
        <div className="projectBodyHeader">
        <h2>Comentários</h2>
        
        <span>
          {this.state.project.comments}
          <FiMessageSquare className="spanButton" size="24px"  style={{marginLeft : 5}} ></FiMessageSquare>
        </span>
       </div>
        <ul >
        {this.state.project.ratings.map( rating => (
            <li key={rating.id}>
              <strong>{`${rating.user_name} (${rating.user_email})`}</strong>
              <p>{rating.comment}</p>
              <br></br>
            </li>
          ))}
        </ul>
      </div>

      </div>
    );
  }
}

export default withRouter(BodyProfile);