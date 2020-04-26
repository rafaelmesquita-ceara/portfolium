import React, {useState} from 'react';
import logo from '../../assets/logo.png'
import { FiArrowLeft } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './style.css'; 
import api from '../../services/api';



export default function Register() {

  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[git_url, setGitUrl] = useState('');
  
  const history = useHistory();

  async function  handleRegister(e){
    e.preventDefault();
    const data={
      nome,
      email,
      username,
      password,
      git_url
    };

    try{
      const response = await api.post('users' , data);
      alert(`Protocolo de acesso: ${response.data.id} `);
      history.push('/');
    } catch(err){
      alert('Erro no cadastro, tente novamente');
    }
  }


  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} className="logoIMG" alt = "Be the Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e submeta seus projetos. Campos com * são obrigatórios</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size= {16} color = "#E02041" />
            Voltar para login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder = "Nome completo*" 
          value={nome} 
          onChange={ e => setNome(e.target.value)}
          />

          <input type="email" placeholder = "E-mail*"  
          value={email} 
          onChange={ e => setEmail(e.target.value)}
          />

          <input type="text" placeholder = "Nome de usuário*" 
          value={username} 
          onChange={ e => setUsername(e.target.value)}
          />

          <input type="password" placeholder = "Senha*" 
          value={password} 
          onChange={ e => setPassword(e.target.value)}
          />

          <input type="text" placeholder = "URL do git" 
          value={git_url} 
          onChange={ e => setGitUrl(e.target.value)}
          />

          <button className = "button" type = "submit">Cadastrar</button>
        </form>


      </div>
    </div>
  );
}
