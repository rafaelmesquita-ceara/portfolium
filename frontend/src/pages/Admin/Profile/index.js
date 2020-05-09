import React, { useState, useEffect} from 'react';
import api from '../../../services/api';
import HeaderProfile from '../../../components/HeaderProfile/index'
import { Container } from './styles';
import { useHistory} from 'react-router-dom';
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
    
    <div className="profileContainer">
      <HeaderProfile></HeaderProfile>

      <Container>
          <thead>
            <tr>    
              <th>
               ID
              </th>
              <th>
                <FaLightbulb />
                <span>Projeto</span>
              </th>
              <th>
                <FaLink />
                <span>Data de cadastro</span>
              </th>
              <th>
                <FaThumbsUp />
                <span>Nota</span>
              </th>
              <th>
                <FaComments />
                <span>Comentários</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              projects.map(project => (
                <tr onClick={() => handleRedirectViewProject(project.id)}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{String(project.submmit_date)}</td>
                  <td>{`${project.likesMedia} (${project.ratings}  Avaliações)`}</td>
                  <td>{project.comments}</td>
                </tr>
              ))
            }
          </tbody>
    </Container>

    </div>
  );
}
