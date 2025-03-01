import React, { useState, useEffect} from 'react';
import { FiTrash2, FiEdit, FiPlus, FiEye, FiEyeOff} from 'react-icons/fi';
import './style.css';
import api from '../../services/api';
import {Modal} from 'react-bootstrap';
import { HeaderProfile } from '../../components/Profile'

export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [uploadShow, setUploadShow] = useState(false);
  const [title, setTittle] = useState('');
  const [projetoSelecionado, setProjetoSelecionado] = useState('')
  const [description, setDescription] = useState('');

  const userID = localStorage.getItem('userID');
  
  
  //Edit project consts
  const[name, setName] = useState('');
  const[descriptionProject, setDescriptionProject] = useState('');
  const[what_learned, setWhatlearned] = useState('');
  const[git_url, setGitUrl] = useState('');

  //Upload Files
  const [projetoSelecionadoUpload, setProjetoSelecionadoUpload] = useState('')
  const [file, setFile] = useState();
  const [fileDescription, setFileDescription] = useState('');

  useEffect(() => {
    atualizaProjeto();
  }, [userID]);

  useEffect(() =>{
    projects.find(x => {
      if(x.id === projetoSelecionado){
        setName(x.name)
        setDescriptionProject(x.description)
        setWhatlearned(x.what_learned)
        setGitUrl(x.git_url)
      }
    })
  }, [projetoSelecionado])

  
  async function handleDeleteProject(id){
    try{
      await api.delete(`/projects/${id}`)
    }catch(err){
      alert('Erro ao deletar projeto, tente novamente mais tarde');
    }

    setProjects(projects.filter(project => project.id !== id));
  }
  
  async function atualizaProjeto(){
    api.get('profile').then(response => {
      setProjects(response.data);
    })
     
    setEditShow(false)
  }

  async function handleUpdateProject(e){
    e.preventDefault()
    console.log(`%c PROJECTID = ${projetoSelecionado}` , 'background: #222; color: #bada55');
    const data = {
      name,
      description : descriptionProject,
      what_learned,
      git_url
    };
    try{
      await api.put(`projects/${projetoSelecionado}`, data)
    }catch(err){
    alert('Erro ao cadastrar projeto');
    }
    atualizaProjeto();
     
    setEditShow(false);

  }

  async function handleNewTech(e){
    e.preventDefault();
    console.log(`%c PROJECTID = ${projetoSelecionado}` , 'background: #222; color: #bada55');
    const data = {
      title,
      description
    };
    try{
      await api.post('tech', data, {
        headers: {
          project_id : projetoSelecionado,
        }
      })
    }catch(err){
      alert('Erro ao cadastrar projeto');
    }


    atualizaProjeto();
     
    setSmShow(false)
    setTittle('')
    setDescription('')
  }
       
  async function handleDeleteTech(id){
    console.log(`%c ID = ${id}` , 'background: #222; color: #bada55');
    console.log(`%c USERID = ${userID}` , 'background: #222; color: green');
    try{
      await api.delete(`/tech/${id}`)
    }catch(err){
      alert('Erro ao deletar tecnologia, tente novamente mais tarde');
    }
    atualizaProjeto();
  }
  
  async function handleAddMidia(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", fileDescription);
    try{
      await api.post(`postImageVideo/`, formData, {
        headers: {
          project_id : projetoSelecionadoUpload
        }
      })
    }catch(err){
    alert('Erro ao fazer upload');
    }
    atualizaProjeto();
    setUploadShow(false);
    setFileDescription('');

  }

  async function handleDeleteMidia(id){
    console.log(`USERID ${userID}    PROJECTID ${id}`)
    try{
      await api.delete(`/postImageVideo/${id}`)
    }catch(err){
      alert('Erro ao deletar midia, tente novamente mais tarde');
    }
    atualizaProjeto();
  }

  async function handleShareProject(id){
    try{
      await api.get(`/projectsToggle/${id}`)
    }catch(err){
      alert('Erro ao tornar público, tente novamente mais tarde');
    }
    atualizaProjeto();
  }

function Midia(props) {
    if(props.mimetype[0] === "i"){
      return (
        <a href = {`${process.env.REACT_APP_STATIC_URL}/${props.filename}`}>
          <img src={`${process.env.REACT_APP_STATIC_URL}/${props.filename}`} title={`${props.description}`} />
        </a>
      )
    }else{
      return (
        <a href = {`${process.env.REACT_APP_STATIC_URL}/${props.filename}`}>
          <video src={`${process.env.REACT_APP_STATIC_URL}/${props.filename}`} title={`${props.description}`} />
        </a>
      )
    }
}

function Share(props) {
  if(props.shared === 1){
    return (
      <button className="share" onClick={ () => handleShareProject(props.project_id)} type="button">
        <FiEye size={20} color= "#04D361" title="Tornar projeto privado" />
      </button>
    )
  }else{
    return (
      <button className="share" onClick={ () => handleShareProject(props.project_id)} type="button">
        <FiEyeOff size={20} color= "#04D361" title="Tornar projeto público" />
      </button>
    )
  }
}


  return (
    
    <div className="profile-container">
      <HeaderProfile></HeaderProfile>
      
      <h1>Projetos cadastrados</h1>
      
      <ul>
        {projects.map(project => (
          <li key={project.id}>
          <strong>Projeto: </strong>
          <p>{project.name}</p>

          <strong>Descrição: </strong>
          <p>{project.description}</p>

          <strong>O que aprendi: </strong>
          <p>{project.what_learned}</p>

          <strong>Tecnologias utilizadas: </strong>

          {project.technologies.map(project =>(
            <div className="deleteTech">
              <p title={project.description} style={{marginBottom : 15}}>{project.title}</p>
              <button title="Deletar tecnologia" onClick={ () => handleDeleteTech(project.id)} type="button">
              <FiTrash2 size={20} color= "#04D361"/>
              </button>
            </div>
          ))}
          
          <button className="buttonGoal" onClick={() => {
            setSmShow(true)
            setProjetoSelecionado(project.id)
            }}>adicionar</button>

          <Modal
            className="my-modal"
            size="md"
            show={smShow}
            onEnter={() => {
              setTittle('')
              setDescription('')
            }}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>

              <Modal.Title id="example-modal-sizes-title-sm">
                Adicionar tecnologia ao projeto
              </Modal.Title>

            </Modal.Header>

            <Modal.Body>
            <form onSubmit={handleNewTech}>
              <input type="text" placeholder = "Nome da tecnologia*"
              value={title}
              onChange={e => setTittle(e.target.value)}
              style = {{marginBottom : "16px"}} />

              <textarea placeholder = "Descrição*"
              value={description}
              onChange={e => setDescription(e.target.value)}  />

              <button className = "button" type = "submit">Adicionar</button>
            </form>
            </Modal.Body>
          </Modal>
          
          <Modal
            className="my-modal"
            size="md"
            show={editShow}
            onEnter={() => {
              setTittle('')
              setDescription('')
            }}
            scrollable = "true"
            onHide={() => setEditShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>

              <Modal.Title id="example-modal-sizes-title-sm">
                Editar projeto
              </Modal.Title>

            </Modal.Header>

            <Modal.Body>
            <form onSubmit={handleUpdateProject}>
            <input type="text" placeholder = "Título do projeto*"
              value={name}
              onChange={e => setName(e.target.value)} />

              <textarea placeholder = "Descrição*"
              value={descriptionProject}
              onChange={e => setDescriptionProject(e.target.value)}
              style = {{marginTop : "16px"}}  />

              <textarea placeholder = "O que aprendeu*"
              value={what_learned}
              onChange={e => setWhatlearned(e.target.value)} 
              style = {{marginTop : "16px"}}  />  

              <input type="text" placeholder = "Url do git"
              value={git_url}
              onChange={e => setGitUrl(e.target.value)} />  
              <button className = "button" type = "submit">Atualizar</button>
            </form>
            </Modal.Body>
          </Modal>

          <Modal
            className="my-modal"
            size="md"
            show={uploadShow}
            scrollable = "true"
            onEnter={() => {
              setFileDescription('')
              setFile('');
            }}
            onHide={() => setUploadShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>

              <Modal.Title id="example-modal-sizes-title-sm">
                Adicionar mídia
              </Modal.Title>

            </Modal.Header>

            <Modal.Body>
            <form onSubmit={handleAddMidia}>
            <input type="file" placeholder = "Título do projeto*" onChange={e => setFile(e.target.files[0])} />

              <textarea placeholder = "Descrição*"
              value={fileDescription}
              onChange={e => setFileDescription(e.target.value)}
              style = {{marginTop : "16px"}}  />
              <button className = "button" type = "submit">Fazer upload</button>
            </form>
            </Modal.Body>
          </Modal>

          <strong>Url do git:</strong>
          <a href={project.git_url}>{project.git_url}</a>

          <button className="trash" title="Deletar projeto" onClick={ () => handleDeleteProject(project.id)} type="button">
            <FiTrash2 size={20} color= "#04D361"/>
          </button>

          <button className="edit" title="Editar projeto" onClick={ () => {
            setEditShow(true)
            setProjetoSelecionado(project.id);
            
          }} type="button">
            <FiEdit size={20} color= "#04D361"/>
          </button>

          <Share shared={project.public} project_id={project.id}></Share>

          <strong style={{marginTop : 16}}>Mídia do projeto</strong>
          
        
            <div className="imagensProjeto">
              <ul>
              {project.midia.map(midia =>(

                <li key={midia.id}>
                  <button title="Deletar mídia" className="botaoMidia" onClick={ () => handleDeleteMidia(midia.id)} type="button">
                      <FiTrash2 size={20} color= "#04D361"/>
                  </button>
                  <Midia mimetype={midia.mimetype} filename={midia.filename} description={midia.description}></Midia>
                  
                </li>
               ))}

               <li className="add">
                <button title="Adicionar Mídia" onClick={() => {
                setProjetoSelecionadoUpload(project.id)
                setUploadShow(true)
                }} type="button">
                 <FiPlus size={100} color= "#04D361"/>
                </button>
                
               </li>
               </ul>
            </div>

        </li> 
        ))}     
      </ul>
    </div>
  );
}
