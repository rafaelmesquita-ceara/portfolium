import React from 'react'
import logo from '../assets/logo.png';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

export function HeaderProfile(){

  const userName = localStorage.getItem('userName');
  const history = useHistory();

  async function handleLogout(){
    localStorage.clear();
    history.push('/');
  }

  return(
    <header>
      <img src={logo} alt="Be the hero" />
      <span>Bem vindo, {userName}</span>
      <Link  className="button" to="/projects/new">Cadastrar novo projeto</Link>
      <button onClick={handleLogout} type="button" >
        <FiPower size = {18} color = "#04D361" />
      </button>
    </header>
  )
}