import React, { useState, useEffect} from 'react';
import api from '../../../services/api';
import { HeaderProfile } from '../../../components/Profile'
import { useHistory} from 'react-router-dom';
import './style.css';
import {
  FaFingerprint, FaLightbulb, FaLink,
  FaThumbsUp, FaComments
}from 'react-icons/fa'

export default function Profile() {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    atualizaProjeto();
  }, [userID]);


  
  async function atualizaProjeto(){
    api.get('profile').then(response => {
      setProjects(response.data);
    })
  }

  async function handleRedirectViewProject(id){
    localStorage.setItem('projectID', id);
    history.push(`/admin/project/${id}`);
    

  }


  return (
    
    <div className="profile-container">
      <HeaderProfile></HeaderProfile>


    </div>
  );
}
