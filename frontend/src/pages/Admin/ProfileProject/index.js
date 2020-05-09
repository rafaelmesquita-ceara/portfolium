import React from 'react'
import './style.css'
import HeaderProfile from '../../../components/HeaderProfile/index'
import BodyProfile from '../../../components/BodyProfile/index'

class AdminProfileProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test : 'Rafael'
    }
  }

  componentDidMount(prevProps, prevState, snapshot) {
  }

  render() {
    return (
      <div className="ProfileProject">
      <HeaderProfile></HeaderProfile>
      <BodyProfile></BodyProfile>
      </div>
    );
  }
}

export default AdminProfileProject;