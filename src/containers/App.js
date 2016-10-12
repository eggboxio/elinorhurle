import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App__header">
          <h2><Link to="/">Welcome to React</Link></h2>
        </div>
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