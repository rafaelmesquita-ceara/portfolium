import React, { useState, useEffect} from 'react';
import logo from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';
import {Modal, Button} from 'react-bootstrap';




export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [title, setTittle] = useState('');
  const [projetoSelecionado, setProjetoSelecionado] = useState('')
  const [description, setDescription] = useState('');
  const userID = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');
  const history = useHistory();

  //Edit project consts
  const[name, setName] = useState('');
  const[descriptionProject, setDescriptionProject] = useState('');
  const[what_learned, setWhatlearned] = useState('');
  const[git_url, setGitUrl] = useState('');

  useEffect(() => {
    
    api.get('profile', {
      headers: {
        Authorization : userID,
      }
    }).then(response => {
      setProjects(response.data);
    })
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
      await api.delete(`/projects/${id}`, {
        headers: {
          Authorization : userID
        }
      })
    }catch(err){
      alert('Erro ao deletar projeto, tente novamente mais tarde');
    }

    setProjects(projects.filter(project => project.id !== id));
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
      await api.put(`projects/${projetoSelecionado}`, data, {
        headers: {
          Authorization : userID
        }
      })
    }catch(err){
    alert('Erro ao cadastrar projeto');
    }
    api.get('profile', {
      headers: {
        Authorization : userID,
      }
    }).then(response => {
      setProjects(response.data);
    })
     
    setEditShow(false)

}

  async function handleLogout(){
    localStorage.clear();
    history.push('/');
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
          Authorization : projetoSelecionado,
          Authorization2 : userID
        }
      })
    }catch(err){
      alert('Erro ao cadastrar projeto');
    }


    api.get('profile', {
      headers: {
        Authorization : userID,
      }
    }).then(response => {
      setProjects(response.data);
    })
     
    setSmShow(false)
    setTittle('')
    setDescription('')
  }
       

  return (
    
    <div className="profile-container">
      <header>
          <img src={logo} alt="Be the hero" />
          <span>Bem vindo, {userName}</span>
          <Link  className="button" to="/projects/new">Cadastrar novo projeto</Link>
          <button onClick={handleLogout} type="button" >
            <FiPower size = {18} color = "#04D361" />
          </button>
      </header>
      
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

            <p style={{marginBottom : 15}}>{project.title}</p>

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

          <strong>Url do git:</strong>
          <a href={project.git_url}>{project.git_url}</a>

          <button className="trash" onClick={ () => handleDeleteProject(project.id)} type="button">
            <FiTrash2 size={20} color= "#04D361"/>
          </button>

          <button className="edit" onClick={ () => {
            setEditShow(true)
            setProjetoSelecionado(project.id);
            
          }} type="button">
            <FiEdit size={20} color= "#04D361"/>
          </button>

        </li> 
        ))}     
      </ul>
    </div>
  );
}
