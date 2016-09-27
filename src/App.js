import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'whatwg-fetch';

class App extends Component {
  test() {
    fetch('https://picasaweb.google.com/data/feed/base/user/112447402726197626187?alt=json&kind=album&hl=en_GB')
      .then(function (response) {
        return response.json()
      })
      .then(function (response) {
        console.log(response.feed)
      });
  }

  componentWillMount() {
    this.test();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
