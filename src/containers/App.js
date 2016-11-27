import React, { Component } from 'react';
// import { Link } from 'react-router';

import './../css/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">

        {/*
        <div className="App__header">
          <h1 className="App__brand"><Link to="/">Elinor Hurle</Link></h1>
        </div>
        */}

        <div className="App__content">
          {
            this.props.children
          }
        </div>
      </div>
    );
  }

}

export default App;