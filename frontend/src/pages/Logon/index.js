import React, {useState} from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';
import heroesImg from '../../assets/bordon.png';
import logo from '../../assets/logo.png'

// import { Container } from './styles';

export default function Logon() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword]= useState('');

  async function handleLogin(e){
    e.preventDefault();
    try{
      const response = await api.post('sessions', { username, password });
      console.log(response.data.id)
      localStorage.setItem('userID', response.data.id);
      localStorage.setItem('userName', response.data.nome);
      history.push('/profile');
    }catch(err){
      alert('Falha no login, tente novamente');
    }
  }


  return (
    <div className="logon-container">
      <section className="form">
        <img className="logoIMG"  src = {logo} alt="Heroes"></img>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input type="text" placeholder= "Seu nome de usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          />

          <input type="password" placeholder= "Sua senha" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" className="button">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size= {16} color = "#04D361"></FiLogIn>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src = {heroesImg} className="fadeIn pcIMG" alt="Heroes"></img>
    </div>
  );
}
