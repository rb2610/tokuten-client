import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    this.callApi()
      .then(response => this.setState({ 'message': response.message }))
      .catch(error => console.log(error));
  }

  callApi = async () => {
    const response = await fetch('api/hello');
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { this.state.message }
        </p>
      </div>
    );
  }
}

export default App;
