import React, {useState} from 'react';
import logo from '../../assets/logo.png'
import { FiArrowLeft } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './style.css'; 
import api from '../../services/api';

// import { Container } from './styles';

export default function NewProject() {
  const history = useHistory();
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');
  const userID = localStorage.getItem('userID');
  async function handleNewProject(e){
    e.preventDefault();
    
    const data = {
      name,
      description
    };

    try{
      await api.post('projects', data, {
        headers: {
          Authorization : userID
        }
      })
      history.push('/profile');
    }catch(err){
      alert('Erro ao cadastrar projeto');
    }
  }

  return (
    <div className="new-project">
      <div className="content">
        <section>
          <img src={logo} className="logoIMG" alt = "Be the Hero"/>
          <h1>Cadastrar novo projeto</h1>
          <p>Descreva as informações do seu projeto</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size= {16} color = "#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewProject}>
          <input type="text" placeholder = "Título do projeto"
          value={name}
          onChange={e => setName(e.target.value)} />

          <textarea placeholder = "Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}  />


          <button className = "button" type = "submit">Cadastrar</button>
        </form>


      </div>
    </div>
  );
}
