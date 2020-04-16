import React, { useState, useEffect} from 'react';
import logo from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Progress } from 'semantic-ui-react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import socket from '../../services/socket';


import './style.css';
import api from '../../services/api';
// import { Container } from './styles';

export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [state, setState] = useState('');
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState([]);
  var [novoArray, setnovoArray] = useState([]);
  const [classGoal, setclassGoal] = useState('');
  const userID = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');
  const history = useHistory();

  useEffect(() => {
    
    api.get('profile', {
      headers: {
        Authorization : userID,
      }
    }).then(response => {
      setProjects(response.data);
    })
  }, [userID]);

  useEffect(() => {
    api.get('goals').then(response => {
      setGoals(response.data);
    })
  }, [userID]);




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

  async function handleLogout(){
    localStorage.clear();
    history.push('/');
  }


  

    async function handleNewGoal(projectID, e){
      e.preventDefault();
      const data = {
        title : goal,

      };
      try{
        await api.post('goals', data, {
          headers: {
            Authorization : projectID,
            Authorization2 : userID
          }
        })
      }catch(err){
        alert('Erro ao cadastrar projeto');
      }

      
      api.get('goals').then(response => {
        setGoals(response.data);
      })

      api.get('profile', {
        headers: {
          Authorization : userID,
        }
      }).then(response => {
        setProjects(response.data);
      })
      
    }

    function Objetivos(props) {
      novoArray = goals.filter(goals => goals.project_id === ""+props.id);
      return(
        novoArray.map(goal => ( 
          <div className="goalCheck">
            <p >{goal.title}</p>
            
        <button type="button" className={goal.status +"button "+classGoal} onClick={() => hangleStatusGoal(goal.id, goal.status)}>{goal.status}</button>
          </div>
         ))
      )

       async function hangleStatusGoal(id, status){
         console.log(userID);
        try{
          await api.put(`/goals/${id}`, {
            headers: {
              Authorization : 12345
            }
          })
          
          api.get('goals').then(response => {
            setGoals(response.data);
          })

          api.get('profile', {
            headers: {
              Authorization : userID,
            }
          }).then(response => {
            setProjects(response.data);
          })
          

        }catch(err){
          alert('Erro ao mudar status do objetivo, tente novamente mais tarde');
        }
        //history.go("/projects");
       }  
        
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

          <strong>Objetivos: </strong>

          <Objetivos id={project.id} />

          <form className="goal" onSubmit={ (e) => handleNewGoal(project.id, e)}>
            <input className="goalInput" type="text"  key={project.id}
            onChange={e => {
              setGoal(e.target.value)

            }}
            ></input>
            <button className="buttonGoal" type="submit">criar</button>
          </form>



          <strong>Progresso:</strong>
          <p>{project.progress}%</p>
          <ProgressBar now={60} />

          <button className="trash" onClick={ () => handleDeleteProject(project.id)} type="button">
            <FiTrash2 size={20} color= "#04D361"/>
          </button>

        </li> 
        ))}     
      </ul>
    </div>
  );
}
