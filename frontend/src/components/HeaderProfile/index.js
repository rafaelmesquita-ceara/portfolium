import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'
import logo from '../../assets/logo.png'
import { withRouter } from 'react-router-dom';

class HeaderProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boasVindas : 'Bem vindo, ',
      nome : 'Rafael Mesquita Brito',
      nomeApresentacao : '',
    }
  }
  componentDidMount(prevProps, prevState, snapshot) {
    this.Timer()
  }
  Timer(){
    const Cont = this.state.nome.length + this.state.boasVindas.length
    this.setState({nome : this.state.boasVindas + this.state.nome})
    
    for (let i = 0; i < Cont; i++) {
      setTimeout(() => { 
        this.setState({nomeApresentacao : (this.state.nomeApresentacao )+= this.state.nome[i]} )
      }, 60 * i);
    }
  }
  render() {
    

    return (
      <div className="profileContainer">
        <header>
          <Link className="linkImg" to="/admin/profile">
            <img src={logo} alt="Portifolium"  />
          </Link>
          <span>{this.state.nomeApresentacao}.</span>
          <Link  className="button" to="/projects/new">Cadastrar novo projeto</Link>
          <button type="button" onClick={ () => this.props.history.push("/") } >
            <FiPower size = {18} color = "#04D361" />
          </button>
        </header>
      </div>
    );
  }
}

export default withRouter(HeaderProfile);