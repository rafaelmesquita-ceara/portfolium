import React from 'react'
import './style.css'

class DefaultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test : ''
    }
  }

  componentDidMount(prevProps, prevState, snapshot) {
  }
  render() {
    return (
      <div>
       
      </div>
    );
  }
}

export default DefaultComponent;